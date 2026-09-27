// Builds nfsmw_shaders.nfsp from the original shader containers, entirely in the browser (or Node).
// Same steps and checks as the reference build script: translate to HLSL, apply the three source
// rewrites, compile to SPIR-V with DXC, check the shadow marker and pack.

import { t } from './i18n.js';

const utf8 = new TextDecoder('utf-8');
const encoder = new TextEncoder();

const SHADOW_OLD = 'tfetch2D(SHADOWMAP_SAMPLER_';
const SHADOW_NEW = 'tfetch2DSombra(SHADOWMAP_SAMPLER_';
const MIN_OLD =
  'tfetch2DSombra(SHADOWMAP_SAMPLER_Texture2DDescriptorIndex, SHADOWMAP_SAMPLER_SamplerDescriptorIndex,';
const MIN_NEW =
  'tfetch2DSombraMin(SHADOWMAP_SAMPLER_Texture2DDescriptorIndex, SHADOWMAP_SAMPLER_Texture3DDescriptorIndex, ' +
  'SHADOWMAP_SAMPLER_SamplerDescriptorIndex,';
const DEFINE_3D = '#define SHADOWMAP_SAMPLER_Texture3DDescriptorIndex';
const BLUR_OLD = 'r5.xyz = r5.xyz * r0.xxx + r3.xyz;';
const BLUR_NEW =
  'r5.xyz = (g_SpecConstants() & SPEC_CONSTANT_SIN_DESENFOQUE) ? r3.xyz : (r5.xyz * r0.xxx + r3.xyz);';
const SHADOW_MARKER = 0x5e3b1a84;

function count(text, needle) {
  let n = 0;
  for (let i = text.indexOf(needle); i >= 0; i = text.indexOf(needle, i + needle.length)) {
    n++;
  }
  return n;
}

function hasShadowMarker(spirv) {
  if (spirv.length < 20) {
    return false;
  }
  const words = new Uint32Array(spirv.buffer, spirv.byteOffset, Math.floor(spirv.length / 4));
  if (words[0] !== 0x07230203) {
    return false;
  }
  for (let i = 5; i < words.length; ) {
    const n = words[i] >>> 16;
    if (!n || i + n > words.length) {
      return false;
    }
    if ((words[i] & 0xffff) === 43 && n === 4 && words[i + 3] === SHADOW_MARKER) {
      return true;
    }
    i += n;
  }
  return false;
}

// containers: [{ name, bytes }]; modules: { hlsl, dxc, pack } already instantiated Emscripten modules;
// shaderCommon: Uint8Array with shader_common.h; log(text) receives progress lines.
// blurShader: stem of the container that gets the composition blur switch (it changes name between editions).
export async function buildShaderLibrary(containers, modules, shaderCommon, log = () => {}, blurShader = 'p_000139') {
  const { hlsl, dxc, pack } = modules;

  hlsl.FS.mkdirTree('/in');
  for (const c of containers) {
    hlsl.FS.writeFile(`/in/${c.name}`, c.bytes);
  }
  hlsl.FS.writeFile('/shader_common.h', shaderCommon);
  const translated = hlsl.callMain(['/in', '/out', '/shader_common.h']);
  if (translated !== 0 && translated !== undefined) {
    throw new Error(`shader translation failed (${translated})`);
  }
  const sources = new Map();
  for (const c of containers) {
    const stem = c.name.slice(0, -4);
    sources.set(stem, utf8.decode(hlsl.FS.readFile(`/out/${stem}.hlsl`)));
  }
  log(t('translatedShaders', { count: sources.size }));

  let shadowCalls = 0;
  for (const [stem, text] of sources) {
    const n = count(text, SHADOW_OLD);
    if (n) {
      shadowCalls += n;
      sources.set(stem, text.split(SHADOW_OLD).join(SHADOW_NEW));
    }
  }
  if (!shadowCalls) {
    throw new Error('no shadow map fetch was rewritten');
  }
  let minCalls = 0;
  for (const [stem, text] of sources) {
    const n = count(text, SHADOW_NEW);
    if (!n) {
      continue;
    }
    if (count(text, MIN_OLD) !== n || !text.includes(DEFINE_3D)) {
      throw new Error(`${stem}: unexpected shadow fetch form`);
    }
    sources.set(stem, text.split(MIN_OLD).join(MIN_NEW));
    minCalls += n;
  }
  if (!minCalls) {
    throw new Error('no shadow minimum fetch was rewritten');
  }
  if (sources.has(blurShader)) {
    const text = sources.get(blurShader);
    if (count(text, BLUR_OLD) !== 1) {
      throw new Error('the composition blur mix was not found exactly once');
    }
    sources.set(blurShader, text.replace(BLUR_OLD, BLUR_NEW));
  }
  log(t('rewroteShadows', { count: shadowCalls }));

  dxc.FS.mkdirTree('/work');
  pack.FS.mkdirTree('/in');
  pack.FS.mkdirTree('/spirv');
  let done = 0;
  for (const c of containers) {
    const stem = c.name.slice(0, -4);
    const input = `/work/${stem}.hlsl`;
    const output = `/work/${stem}.spv`;
    dxc.FS.writeFile(input, encoder.encode(sources.get(stem)));
    const rc = dxc.ccall('compile', 'number', ['string', 'string', 'number'], [input, output, stem.startsWith('v_') ? 1 : 0]);
    if (rc !== 0) {
      throw new Error(`DXC rejected ${stem} (${rc})`);
    }
    const spirv = dxc.FS.readFile(output);
    if (sources.get(stem).includes('tfetch2DSombraMin(SHADOWMAP_SAMPLER_') && !hasShadowMarker(spirv)) {
      throw new Error(`${stem}: SPIR-V without the shadow minimum marker`);
    }
    pack.FS.writeFile(`/spirv/${stem}.spv`, spirv);
    pack.FS.writeFile(`/in/${c.name}`, c.bytes);
    dxc.FS.unlink(input);
    dxc.FS.unlink(output);
    if (++done % 25 === 0) {
      log(t('compiled', { done, total: containers.length }));
    }
  }
  const packed = pack.callMain(['/in', '/spirv', '/nfsmw_shaders.nfsp']);
  if (packed !== 0 && packed !== undefined) {
    throw new Error(`packing failed (${packed})`);
  }
  return pack.FS.readFile('/nfsmw_shaders.nfsp');
}
