// Interface texts in the languages of the supported editions. Works in the page and in the worker (no DOM here).
// Static texts in index.html name their key with data-i18n (plain text) or data-i18n-html (text with markup).

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'uk' },
  { code: 'es', name: 'Español', flag: 'spain' },
  // Poland goes here, not next to Japan: both flags are white and red and are easy to confuse side by side.
  { code: 'pl', name: 'Polski', flag: 'poland' },
  { code: 'fr', name: 'Français', flag: 'france' },
  { code: 'de', name: 'Deutsch', flag: 'germany' },
  { code: 'it', name: 'Italiano', flag: 'italy' },
  { code: 'ru', name: 'Русский', flag: 'russia' },
  { code: 'pt-BR', name: 'Português (Brasil)', flag: 'brazil' },
  { code: 'ko', name: '한국어', flag: 'korea' },
  { code: 'zh-Hant', name: '繁體中文', flag: 'china' },
  { code: 'ja', name: '日本語', flag: 'japan' },
];

const SPHAIRA = '<a href="https://github.com/NaGaa95/sphaira/releases" target="_blank" rel="noopener">Sphaira</a>';

const TEXTS = {
  en: {
    legal:
      'Need for Speed™ and Need for Speed™: Most Wanted are trademarks of Electronic Arts Inc. The background artwork is © Electronic Arts Inc. All rights reserved. nfsmw-nx is an unofficial fan project and is not affiliated with, endorsed or sponsored by Electronic Arts Inc., Nintendo or Microsoft. Nintendo Switch is a trademark of Nintendo; Xbox 360 is a trademark of Microsoft. This site does not host or distribute disc images, game data or the original game executable: your ISO or game folder is read only inside your browser, is never uploaded, and its files are copied straight into the nfsmw-nx.zip saved on your computer. You need your own legally obtained copy of the game. Title font: Most Wasted by Magique Fonts.',
    sourceCode: 'Source Code',
    signature: 'a StevensND project',
    lead:
      'Builds the <strong>Nintendo Switch</strong> package of <strong>Need for Speed: Most Wanted (2005)</strong> from ' +
      'your own <strong>Xbox 360</strong> copy. Everything runs in <strong>this browser</strong>.',
    languageBar: 'Language',
    step1: '1. Choose your format',
    formatIso: 'Disc image (.iso)',
    formatXex: 'XEX format',
    formatHint:
      'For the <strong>XEX format</strong>, select the folder that contains <code>default.xex</code>, the <code>Movies</code> folder ' +
      'and the <code>NFS</code> folder.',
    nothingChosen: 'Nothing chosen yet.',
    step2: '2. Create the package',
    create: 'Create nfsmw-nx.zip',
    createUpdate: 'Create nfsmw-nx-update.zip',
    step3: '3. Copy it to the Switch',
    step2First: 'If you are installing the game for the first time, use:',
    step2Update:
      'If the game is already installed and you only want to update it (<code>.nro</code>, <code>.toml</code> and <code>shaders.nfsp</code>), use:',
    step3Extract:
      'Extract the <code>downloaded .zip file</code> and place it into <code>sdmc:/switch/</code>.',
    step3Start:
      'Start <code>nfsmw-nx.nro</code> from the Homebrew Menu in title takeover mode (<strong>launch</strong> an original native ' +
      `Switch game <strong>while holding R</strong> to open the <strong>Homebrew Menu</strong>) or create a <strong>39-bit forwarder</strong> using ${SPHAIRA}`,
    checking: 'Checking your game…',
    supported: '{edition} edition · supported',
    discUntested: 'This disc of the {edition} edition has not been tested yet. Executable fingerprint:',
    unsupported: 'This edition is not supported yet. Executable fingerprint:',
    reportIntro: 'To help us support it, create this report and send it to us with the name of your edition:',
    createReport: 'Create nfsmw-nx-report.txt',
    logReport: 'Creating the report of your edition',
    reportSaved: 'Report saved as nfsmw-nx-report.txt. Send it to us with the name of your edition.',
    reportIntroExecutable:
      'To help us support it, create this report and send it to us with the name of your edition (with only default.xex it is partial):',
    executableOnly: '{edition} edition · the Movies and NFS folders are missing: choose the whole game to create the package.',
    notComplete: 'Not a complete game',
    incomplete: 'default.xex, Movies and NFS were not found: choose the whole game (ISO or XEX folder).',
    notIso: 'Not an Xbox 360 disc image',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} files ({size})',
    chosenFolderOne: '{name}: 1 file ({size})',
    noStreaming: 'this browser window cannot stream downloads. Use a normal (not private) window.',
    downloadStarted: 'Download started ({size}). Keep this page open until it finishes.',
    finished: 'Finished in {seconds} s.',
    error: 'Error: {message}',
    cancelled: 'the download was cancelled',
    unknown: 'Unknown',
    fanTranslation: '{language} (fan translation)',
    'region.usa': 'USA',
    'region.japan': 'Japan',
    'region.korea': 'Korea',
    'region.asia': 'Asia',
    'language.english': 'English',
    'language.spanish': 'Spanish',
    'language.german': 'German',
    'language.italian': 'Italian',
    'language.russian': 'Russian',
    'language.japanese': 'Japanese',
    'language.korean': 'Korean',
    'language.tchinese': 'Traditional Chinese',
    'language.french': 'French',
    'language.brazilian': 'Brazilian Portuguese',
    'language.polish': 'Polish',
    readingFiles: 'Reading the game files',
    downloadingBuild: 'Downloading the Switch build for the {edition} edition',
    logEdition: 'Supported edition: {edition}',
    logLanguage: 'Language on the disc: {language}',
    copied: 'Copied {path}',
    read: 'Read {path}',
    logUpdate: 'Update package: only nfsmw-nx.nro, nfsmw.toml and the shaders',
    foundShaders: 'Found {count} shaders; building the shader library',
    translatedShaders: 'Translated {count} shaders',
    rewroteShadows: 'Rewrote {count} shadow map reads',
    compiled: 'Compiled {done} of {total}',
    done: 'Done: extract the zip into sdmc:/switch/',
    notSupportedYet: 'this edition is not supported yet. Executable fingerprint: {hash}',
    discNotTested: 'this disc of the {edition} edition has not been tested yet. Executable fingerprint: {hash}',
    buildMismatch: 'the downloaded Switch build is not the published one ({hash}); try again later',
    libraryMismatch: 'the shader library does not match the tested one ({hash}); nothing was changed',
    compositionMissing: 'the composition shader was not found on this disc',
    downloadFailed: 'could not download {url} ({status})',
  },
  es: {
    legal:
      'Need for Speed™ y Need for Speed™: Most Wanted son marcas comerciales de Electronic Arts Inc. La imagen de fondo es © Electronic Arts Inc. Todos los derechos reservados. nfsmw-nx es un proyecto de aficionados no oficial, sin relación con Electronic Arts Inc., Nintendo ni Microsoft, que no lo respaldan ni lo patrocinan. Nintendo Switch es una marca comercial de Nintendo, y Xbox 360, de Microsoft. Este sitio no aloja ni distribuye imágenes de disco, datos del juego ni el ejecutable original: tu ISO o la carpeta del juego se leen solo dentro de tu navegador, nunca se suben a ningún sitio y sus archivos se copian directamente al nfsmw-nx.zip que se guarda en tu ordenador. Necesitas tu propia copia legal del juego. Fuente del título: Most Wasted, de Magique Fonts.',
    sourceCode: 'Código fuente',
    signature: 'un proyecto de StevensND',
    lead:
      'Crea el paquete de <strong>Nintendo Switch</strong> de <strong>Need for Speed: Most Wanted (2005)</strong> a ' +
      'partir de tu propia copia de <strong>Xbox 360</strong>. Todo se hace en <strong>este navegador</strong>.',
    languageBar: 'Idioma',
    step1: '1. Elige el formato',
    formatIso: 'Imagen de disco (.iso)',
    formatXex: 'Formato XEX',
    formatHint:
      'Para el <strong>formato XEX</strong>, selecciona la carpeta que contiene <code>default.xex</code>, la carpeta ' +
      '<code>Movies</code> y la carpeta <code>NFS</code>.',
    nothingChosen: 'Todavía no has elegido nada.',
    step2: '2. Crea el paquete',
    create: 'Crear nfsmw-nx.zip',
    createUpdate: 'Crear nfsmw-nx-update.zip',
    step3: '3. Cópialo a la Switch',
    step2First: 'Si es la primera vez que instalas el juego, usa:',
    step2Update:
      'Si ya tienes el juego instalado y solo quieres actualizarlo (<code>.nro</code>, <code>.toml</code> y <code>shaders.nfsp</code>), usa:',
    step3Extract:
      'Extrae el <code>archivo .zip descargado</code> y colócalo en <code>sdmc:/switch/</code>.',
    step3Start:
      'Inicia <code>nfsmw-nx.nro</code> desde el Homebrew Menu en modo title takeover (<strong>abre</strong> un juego original de ' +
      `Switch <strong>manteniendo pulsado R</strong> para que se abra el <strong>Homebrew Menu</strong>) o crea un <strong>forwarder de 39 bits</strong> con ${SPHAIRA}`,
    checking: 'Comprobando tu juego…',
    supported: 'Edición {edition} · compatible',
    discUntested: 'Este disco de la edición {edition} aún no se ha probado. Huella del ejecutable:',
    unsupported: 'Esta edición aún no es compatible. Huella del ejecutable:',
    reportIntro: 'Para ayudarnos a darle soporte, crea este informe y envíanoslo con el nombre de tu edición:',
    createReport: 'Crear nfsmw-nx-report.txt',
    logReport: 'Creando el informe de tu edición',
    reportSaved: 'Informe guardado como nfsmw-nx-report.txt. Envíanoslo con el nombre de tu edición.',
    reportIntroExecutable:
      'Para ayudarnos a darle soporte, crea este informe y envíanoslo con el nombre de tu edición (solo con default.xex sale incompleto):',
    executableOnly: 'Edición {edition} · faltan las carpetas Movies y NFS: elige el juego completo para crear el paquete.',
    notComplete: 'No es un juego completo',
    incomplete: 'No se han encontrado default.xex, Movies y NFS: elige el juego completo (ISO o carpeta XEX).',
    notIso: 'No es una imagen de disco de Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} archivos ({size})',
    chosenFolderOne: '{name}: 1 archivo ({size})',
    noStreaming: 'esta ventana del navegador no puede hacer descargas por streaming. Usa una ventana normal (no privada).',
    downloadStarted: 'Descarga iniciada ({size}). Mantén esta página abierta hasta que termine.',
    finished: 'Terminado en {seconds} s.',
    error: 'Error: {message}',
    cancelled: 'se ha cancelado la descarga',
    unknown: 'Desconocido',
    fanTranslation: '{language} (traducción de aficionados)',
    'region.usa': 'americana',
    'region.japan': 'japonesa',
    'region.korea': 'coreana',
    'region.asia': 'asiática',
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    'language.german': 'Alemán',
    'language.italian': 'Italiano',
    'language.russian': 'Ruso',
    'language.japanese': 'Japonés',
    'language.korean': 'Coreano',
    'language.tchinese': 'Chino tradicional',
    'language.french': 'Francés',
    'language.brazilian': 'Portugués de Brasil',
    'language.polish': 'Polaco',
    readingFiles: 'Leyendo los archivos del juego',
    downloadingBuild: 'Descargando la versión de Switch de la edición {edition}',
    logEdition: 'Edición compatible: {edition}',
    logLanguage: 'Idioma del disco: {language}',
    copied: 'Copiado {path}',
    read: 'Leído {path}',
    logUpdate: 'Paquete de actualización: solo nfsmw-nx.nro, nfsmw.toml y los shaders',
    foundShaders: 'Encontrados {count} shaders; creando la biblioteca de shaders',
    translatedShaders: 'Traducidos {count} shaders',
    rewroteShadows: 'Reescritas {count} lecturas del mapa de sombras',
    compiled: 'Compilados {done} de {total}',
    done: 'Listo: extrae el zip en sdmc:/switch/',
    notSupportedYet: 'esta edición aún no es compatible. Huella del ejecutable: {hash}',
    discNotTested: 'este disco de la edición {edition} aún no se ha probado. Huella del ejecutable: {hash}',
    buildMismatch: 'la versión de Switch descargada no es la publicada ({hash}); inténtalo más tarde',
    libraryMismatch: 'la biblioteca de shaders no coincide con la probada ({hash}); no se ha cambiado nada',
    compositionMissing: 'no se ha encontrado el shader de composición en este disco',
    downloadFailed: 'no se ha podido descargar {url} ({status})',
  },
  de: {
    legal:
      'Need for Speed™ und Need for Speed™: Most Wanted sind Marken von Electronic Arts Inc. Das Hintergrundbild ist © Electronic Arts Inc. Alle Rechte vorbehalten. nfsmw-nx ist ein inoffizielles Fanprojekt und steht in keiner Verbindung zu Electronic Arts Inc., Nintendo oder Microsoft, die es weder unterstützen noch sponsern. Nintendo Switch ist eine Marke von Nintendo, Xbox 360 eine Marke von Microsoft. Diese Seite hostet und verbreitet weder Disc-Images noch Spieldaten oder die originale ausführbare Datei: Dein ISO oder Spielordner wird nur in deinem Browser gelesen, nie hochgeladen, und seine Dateien werden direkt in die auf deinem Computer gespeicherte nfsmw-nx.zip kopiert. Du brauchst deine eigene, legal erworbene Kopie des Spiels. Schriftart des Titels: Most Wasted von Magique Fonts.',
    sourceCode: 'Quellcode',
    signature: 'ein Projekt von StevensND',
    lead:
      'Erstellt das <strong>Nintendo Switch</strong>-Paket von <strong>Need for Speed: Most Wanted (2005)</strong> ' +
      'aus deiner eigenen <strong>Xbox 360</strong>-Kopie. Alles läuft in <strong>diesem Browser</strong>.',
    languageBar: 'Sprache',
    step1: '1. Format wählen',
    formatIso: 'Disc-Image (.iso)',
    formatXex: 'XEX-Format',
    formatHint:
      'Wähle für das <strong>XEX-Format</strong> den Ordner, der <code>default.xex</code>, den Ordner <code>Movies</code> und den ' +
      'Ordner <code>NFS</code> enthält.',
    nothingChosen: 'Noch nichts ausgewählt.',
    step2: '2. Paket erstellen',
    create: 'nfsmw-nx.zip erstellen',
    createUpdate: 'nfsmw-nx-update.zip erstellen',
    step3: '3. Auf die Switch kopieren',
    step2First: 'Wenn du das Spiel zum ersten Mal installierst, nutze:',
    step2Update:
      'Wenn das Spiel schon installiert ist und du es nur aktualisieren willst (<code>.nro</code>, <code>.toml</code> und <code>shaders.nfsp</code>), nutze:',
    step3Extract:
      'Entpacke die <code>heruntergeladene .zip-Datei</code> und lege sie in <code>sdmc:/switch/</code> ab.',
    step3Start:
      'Starte <code>nfsmw-nx.nro</code> über das Homebrew Menu im Title-Takeover-Modus (<strong>starte</strong> ein originales ' +
      `Switch-Spiel und <strong>halte dabei R gedrückt</strong>, um das <strong>Homebrew Menu</strong> zu öffnen) oder erstelle mit ${SPHAIRA} einen ` +
      '<strong>39-Bit-Forwarder</strong>',
    checking: 'Dein Spiel wird geprüft …',
    supported: 'Edition {edition} · unterstützt',
    discUntested:
      'Diese Disc der Edition {edition} wurde noch nicht getestet. Fingerabdruck der ausführbaren Datei:',
    unsupported: 'Diese Edition wird noch nicht unterstützt. Fingerabdruck der ausführbaren Datei:',
    reportIntro:
      'Hilf uns, sie zu unterstützen: Erstelle diesen Bericht und schick ihn uns mit dem Namen deiner Edition:',
    createReport: 'nfsmw-nx-report.txt erstellen',
    logReport: 'Der Bericht über deine Edition wird erstellt',
    reportSaved: 'Bericht als nfsmw-nx-report.txt gespeichert. Schick ihn uns mit dem Namen deiner Edition.',
    reportIntroExecutable:
      'Hilf uns, sie zu unterstützen: Erstelle diesen Bericht und schick ihn uns mit dem Namen deiner Edition ' +
      '(nur mit default.xex ist er unvollständig):',
    executableOnly: 'Edition {edition} · Die Ordner Movies und NFS fehlen: Wähle das ganze Spiel, um das Paket zu erstellen.',
    notComplete: 'Kein vollständiges Spiel',
    incomplete: 'default.xex, Movies und NFS wurden nicht gefunden: Wähle das ganze Spiel (ISO oder XEX-Ordner).',
    notIso: 'Kein Xbox-360-Disc-Image',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} Dateien ({size})',
    chosenFolderOne: '{name}: 1 Datei ({size})',
    noStreaming: 'Dieses Browserfenster kann keine Downloads streamen. Verwende ein normales (nicht privates) Fenster.',
    downloadStarted: 'Download gestartet ({size}). Lass diese Seite geöffnet, bis er fertig ist.',
    finished: 'Fertig nach {seconds} s.',
    error: 'Fehler: {message}',
    cancelled: 'Der Download wurde abgebrochen',
    unknown: 'Unbekannt',
    fanTranslation: '{language} (Fan-Übersetzung)',
    'region.usa': 'USA',
    'region.japan': 'Japan',
    'region.korea': 'Korea',
    'region.asia': 'Asien',
    'language.english': 'Englisch',
    'language.spanish': 'Spanisch',
    'language.german': 'Deutsch',
    'language.italian': 'Italienisch',
    'language.russian': 'Russisch',
    'language.japanese': 'Japanisch',
    'language.korean': 'Koreanisch',
    'language.tchinese': 'Traditionelles Chinesisch',
    'language.french': 'Französisch',
    'language.brazilian': 'Brasilianisches Portugiesisch',
    'language.polish': 'Polnisch',
    readingFiles: 'Spieldateien werden gelesen',
    downloadingBuild: 'Switch-Build für die Edition {edition} wird heruntergeladen',
    logEdition: 'Unterstützte Edition: {edition}',
    logLanguage: 'Sprache der Disc: {language}',
    copied: 'Kopiert: {path}',
    read: 'Gelesen: {path}',
    logUpdate: 'Update-Paket: nur nfsmw-nx.nro, nfsmw.toml und die Shader',
    foundShaders: '{count} Shader gefunden; die Shader-Bibliothek wird erstellt',
    translatedShaders: '{count} Shader übersetzt',
    rewroteShadows: '{count} Zugriffe auf die Schattenkarte umgeschrieben',
    compiled: '{done} von {total} kompiliert',
    done: 'Fertig: Entpacke die ZIP-Datei nach sdmc:/switch/',
    notSupportedYet: 'Diese Edition wird noch nicht unterstützt. Fingerabdruck der ausführbaren Datei: {hash}',
    discNotTested:
      'Diese Disc der Edition {edition} wurde noch nicht getestet. Fingerabdruck der ausführbaren Datei: {hash}',
    buildMismatch: 'Der heruntergeladene Switch-Build ist nicht der veröffentlichte ({hash}); versuch es später erneut',
    libraryMismatch: 'Die Shader-Bibliothek stimmt nicht mit der getesteten überein ({hash}); es wurde nichts geändert',
    compositionMissing: 'Der Kompositions-Shader wurde auf dieser Disc nicht gefunden',
    downloadFailed: '{url} konnte nicht heruntergeladen werden ({status})',
  },
  it: {
    legal:
      "Need for Speed™ e Need for Speed™: Most Wanted sono marchi di Electronic Arts Inc. L'immagine di sfondo è © Electronic Arts Inc. Tutti i diritti riservati. nfsmw-nx è un progetto amatoriale non ufficiale, non affiliato né approvato o sponsorizzato da Electronic Arts Inc., Nintendo o Microsoft. Nintendo Switch è un marchio di Nintendo e Xbox 360 è un marchio di Microsoft. Questo sito non ospita né distribuisce immagini disco, dati del gioco o l'eseguibile originale: la tua ISO o la cartella del gioco viene letta solo nel tuo browser, non viene mai caricata e i suoi file vengono copiati direttamente nel nfsmw-nx.zip salvato sul tuo computer. Serve una tua copia del gioco ottenuta legalmente. Carattere del titolo: Most Wasted di Magique Fonts.",
    sourceCode: 'Codice sorgente',
    signature: 'un progetto di StevensND',
    lead:
      'Crea il pacchetto per <strong>Nintendo Switch</strong> di <strong>Need for Speed: Most Wanted (2005)</strong> ' +
      'a partire dalla tua copia per <strong>Xbox 360</strong>. Tutto avviene in <strong>questo browser</strong>.',
    languageBar: 'Lingua',
    step1: '1. Scegli il formato',
    formatIso: 'Immagine disco (.iso)',
    formatXex: 'Formato XEX',
    formatHint:
      'Per il <strong>formato XEX</strong>, seleziona la cartella che contiene <code>default.xex</code>, la cartella ' +
      '<code>Movies</code> e la cartella <code>NFS</code>.',
    nothingChosen: 'Non hai ancora scelto nulla.',
    step2: '2. Crea il pacchetto',
    create: 'Crea nfsmw-nx.zip',
    createUpdate: 'Crea nfsmw-nx-update.zip',
    step3: '3. Copialo sulla Switch',
    step2First: 'Se è la prima volta che installi il gioco, usa:',
    step2Update:
      'Se il gioco è già installato e vuoi solo aggiornarlo (<code>.nro</code>, <code>.toml</code> e <code>shaders.nfsp</code>), usa:',
    step3Extract:
      'Estrai il <code>file .zip scaricato</code> e mettilo in <code>sdmc:/switch/</code>.',
    step3Start:
      "Avvia <code>nfsmw-nx.nro</code> dall'Homebrew Menu in modalità title takeover (<strong>avvia</strong> un gioco originale per " +
      `Switch <strong>tenendo premuto R</strong> per aprire l'<strong>Homebrew Menu</strong>) oppure crea un <strong>forwarder a 39 bit</strong> con ${SPHAIRA}`,
    checking: 'Controllo del gioco in corso…',
    supported: 'Edizione {edition} · supportata',
    discUntested: "Questo disco dell'edizione {edition} non è ancora stato provato. Impronta dell'eseguibile:",
    unsupported: "Questa edizione non è ancora supportata. Impronta dell'eseguibile:",
    reportIntro: 'Per aiutarci a supportarla, crea questo rapporto e inviacelo con il nome della tua edizione:',
    createReport: 'Crea nfsmw-nx-report.txt',
    logReport: 'Creazione del rapporto sulla tua edizione',
    reportSaved: 'Rapporto salvato come nfsmw-nx-report.txt. Inviacelo con il nome della tua edizione.',
    reportIntroExecutable:
      'Per aiutarci a supportarla, crea questo rapporto e inviacelo con il nome della tua edizione (con il solo default.xex è incompleto):',
    executableOnly: 'Edizione {edition} · mancano le cartelle Movies e NFS: scegli il gioco completo per creare il pacchetto.',
    notComplete: 'Non è un gioco completo',
    incomplete: 'default.xex, Movies e NFS non sono stati trovati: scegli il gioco completo (ISO o cartella XEX).',
    notIso: "Non è un'immagine disco di Xbox 360",
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} file ({size})',
    chosenFolderOne: '{name}: 1 file ({size})',
    noStreaming: 'questa finestra del browser non può scaricare in streaming. Usa una finestra normale (non privata).',
    downloadStarted: 'Download avviato ({size}). Tieni aperta questa pagina finché non termina.',
    finished: 'Completato in {seconds} s.',
    error: 'Errore: {message}',
    cancelled: 'il download è stato annullato',
    unknown: 'Sconosciuta',
    fanTranslation: '{language} (traduzione amatoriale)',
    'region.usa': 'americana',
    'region.japan': 'giapponese',
    'region.korea': 'coreana',
    'region.asia': 'asiatica',
    'language.english': 'Inglese',
    'language.spanish': 'Spagnolo',
    'language.german': 'Tedesco',
    'language.italian': 'Italiano',
    'language.russian': 'Russo',
    'language.japanese': 'Giapponese',
    'language.korean': 'Coreano',
    'language.tchinese': 'Cinese tradizionale',
    'language.french': 'Francese',
    'language.brazilian': 'Portoghese brasiliano',
    'language.polish': 'Polacco',
    readingFiles: 'Lettura dei file del gioco',
    downloadingBuild: "Download della build per Switch dell'edizione {edition}",
    logEdition: 'Edizione supportata: {edition}',
    logLanguage: 'Lingua del disco: {language}',
    copied: 'Copiato {path}',
    read: 'Letto {path}',
    logUpdate: 'Pacchetto di aggiornamento: solo nfsmw-nx.nro, nfsmw.toml e gli shader',
    foundShaders: 'Trovati {count} shader; creazione della libreria di shader',
    translatedShaders: 'Tradotti {count} shader',
    rewroteShadows: 'Riscritte {count} letture della mappa delle ombre',
    compiled: 'Compilati {done} di {total}',
    done: 'Fatto: estrai lo zip in sdmc:/switch/',
    notSupportedYet: "questa edizione non è ancora supportata. Impronta dell'eseguibile: {hash}",
    discNotTested: "questo disco dell'edizione {edition} non è ancora stato provato. Impronta dell'eseguibile: {hash}",
    buildMismatch: 'la build per Switch scaricata non è quella pubblicata ({hash}); riprova più tardi',
    libraryMismatch: 'la libreria di shader non corrisponde a quella provata ({hash}); non è stato modificato nulla',
    compositionMissing: 'lo shader di composizione non è stato trovato su questo disco',
    downloadFailed: 'impossibile scaricare {url} ({status})',
  },
  ru: {
    legal:
      'Need for Speed™ и Need for Speed™: Most Wanted — товарные знаки Electronic Arts Inc. Фоновое изображение © Electronic Arts Inc. Все права защищены. nfsmw-nx — неофициальный любительский проект, не связанный с Electronic Arts Inc., Nintendo или Microsoft и не одобренный и не спонсируемый ими. Nintendo Switch — товарный знак Nintendo, Xbox 360 — товарный знак Microsoft. Этот сайт не размещает и не распространяет образы дисков, данные игры или оригинальный исполняемый файл: ваш ISO или папка с игрой читаются только в вашем браузере, никуда не загружаются, а их файлы копируются прямо в nfsmw-nx.zip, сохранённый на вашем компьютере. Нужна ваша собственная легально приобретённая копия игры. Шрифт заголовка: Most Wasted от Magique Fonts.',
    sourceCode: 'Исходный код',
    signature: 'проект StevensND',
    lead:
      'Создаёт пакет <strong>Need for Speed: Most Wanted (2005)</strong> для <strong>Nintendo Switch</strong> из ' +
      'вашей собственной копии для <strong>Xbox 360</strong>. Всё происходит в <strong>этом браузере</strong>.',
    languageBar: 'Язык',
    step1: '1. Выберите формат',
    formatIso: 'Образ диска (.iso)',
    formatXex: 'Формат XEX',
    formatHint:
      'Для <strong>формата XEX</strong> выберите папку, в которой находятся <code>default.xex</code>, папка <code>Movies</code> и ' +
      'папка <code>NFS</code>.',
    nothingChosen: 'Пока ничего не выбрано.',
    step2: '2. Создайте пакет',
    create: 'Создать nfsmw-nx.zip',
    createUpdate: 'Создать nfsmw-nx-update.zip',
    step3: '3. Скопируйте на Switch',
    step2First: 'Если вы устанавливаете игру впервые, нажмите:',
    step2Update:
      'Если игра уже установлена и вы хотите только обновить её (<code>.nro</code>, <code>.toml</code> и <code>shaders.nfsp</code>), нажмите:',
    step3Extract:
      'Распакуйте <code>загруженный .zip-файл</code> и поместите его в <code>sdmc:/switch/</code>.',
    step3Start:
      'Запустите <code>nfsmw-nx.nro</code> из Homebrew Menu в режиме title takeover (<strong>запустите</strong> оригинальную игру для ' +
      `Switch, <strong>удерживая R</strong>, чтобы открыть <strong>Homebrew Menu</strong>) или создайте <strong>39-битный форвардер</strong> с помощью ${SPHAIRA}`,
    checking: 'Проверка игры…',
    supported: 'Издание {edition} · поддерживается',
    discUntested: 'Этот диск издания {edition} ещё не проверен. Отпечаток исполняемого файла:',
    unsupported: 'Это издание пока не поддерживается. Отпечаток исполняемого файла:',
    reportIntro:
      'Чтобы помочь нам добавить его, создайте этот отчёт и пришлите его нам вместе с названием вашего издания:',
    createReport: 'Создать nfsmw-nx-report.txt',
    logReport: 'Создаётся отчёт о вашем издании',
    reportSaved: 'Отчёт сохранён как nfsmw-nx-report.txt. Пришлите его нам вместе с названием вашего издания.',
    reportIntroExecutable:
      'Чтобы помочь нам добавить его, создайте этот отчёт и пришлите его нам вместе с названием вашего издания ' +
      '(только с default.xex он будет неполным):',
    executableOnly: 'Издание {edition} · нет папок Movies и NFS: выберите игру целиком, чтобы создать пакет.',
    notComplete: 'Игра неполная',
    incomplete: 'Не найдены default.xex, Movies и NFS: выберите игру целиком (ISO или папку XEX).',
    notIso: 'Это не образ диска Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: файлов — {count} ({size})',
    chosenFolderOne: '{name}: 1 файл ({size})',
    noStreaming: 'это окно браузера не поддерживает потоковую загрузку. Используйте обычное (не приватное) окно.',
    downloadStarted: 'Загрузка началась ({size}). Не закрывайте эту страницу до её завершения.',
    finished: 'Готово за {seconds} с.',
    error: 'Ошибка: {message}',
    cancelled: 'загрузка отменена',
    unknown: 'Неизвестно',
    fanTranslation: '{language} (любительский перевод)',
    'region.usa': 'для США',
    'region.japan': 'для Японии',
    'region.korea': 'для Кореи',
    'region.asia': 'для Азии',
    'language.english': 'Английский',
    'language.spanish': 'Испанский',
    'language.german': 'Немецкий',
    'language.italian': 'Итальянский',
    'language.russian': 'Русский',
    'language.japanese': 'Японский',
    'language.korean': 'Корейский',
    'language.tchinese': 'Традиционный китайский',
    'language.french': 'Французский',
    'language.brazilian': 'Бразильский португальский',
    'language.polish': 'Польский',
    readingFiles: 'Чтение файлов игры',
    downloadingBuild: 'Загрузка сборки для Switch (издание {edition})',
    logEdition: 'Поддерживаемое издание: {edition}',
    logLanguage: 'Язык диска: {language}',
    copied: 'Скопировано: {path}',
    read: 'Прочитано: {path}',
    logUpdate: 'Пакет обновления: только nfsmw-nx.nro, nfsmw.toml и шейдеры',
    foundShaders: 'Найдено шейдеров: {count}; создаётся библиотека шейдеров',
    translatedShaders: 'Переведено шейдеров: {count}',
    rewroteShadows: 'Переписано чтений карты теней: {count}',
    compiled: 'Скомпилировано {done} из {total}',
    done: 'Готово: распакуйте zip в sdmc:/switch/',
    notSupportedYet: 'это издание пока не поддерживается. Отпечаток исполняемого файла: {hash}',
    discNotTested: 'этот диск издания {edition} ещё не проверен. Отпечаток исполняемого файла: {hash}',
    buildMismatch: 'загруженная сборка для Switch не совпадает с опубликованной ({hash}); попробуйте позже',
    libraryMismatch: 'библиотека шейдеров не совпадает с проверенной ({hash}); ничего не изменено',
    compositionMissing: 'на этом диске не найден шейдер композиции',
    downloadFailed: 'не удалось загрузить {url} ({status})',
  },
  ja: {
    legal:
      'Need for Speed™およびNeed for Speed™: Most WantedはElectronic Arts Inc.の商標です。背景画像の著作権はElectronic Arts Inc.に帰属します（© Electronic Arts Inc.）。nfsmw-nxは非公式のファンプロジェクトであり、Electronic Arts Inc.、任天堂、Microsoftとは一切関係がなく、これらの企業による承認や後援を受けたものではありません。Nintendo Switchは任天堂の商標、Xbox 360はMicrosoftの商標です。このサイトはディスクイメージ、ゲームデータ、オリジナルの実行ファイルをホストも配布もしていません。ISOまたはゲームフォルダーはブラウザー内でのみ読み込まれ、どこにもアップロードされず、そのファイルはパソコンに保存されるnfsmw-nx.zipへ直接コピーされます。正規に入手したご自身のゲームが必要です。タイトルのフォント：Most Wasted（Magique Fonts）。',
    sourceCode: 'ソースコード',
    signature: 'StevensNDのプロジェクト',
    lead:
      'お持ちの<strong>Xbox 360</strong>版から、<strong>Need for Speed: Most Wanted (2005)</strong>の' +
      '<strong>Nintendo Switch</strong>用パッケージを作成します。処理はすべて<strong>このブラウザー内</strong>で行われます。',
    languageBar: '言語',
    step1: '1. 形式を選択',
    formatIso: 'ディスクイメージ (.iso)',
    formatXex: 'XEX形式',
    formatHint:
      '<strong>XEX形式</strong>の場合は、<code>default.xex</code>、<code>Movies</code>フォルダー、<code>NFS</code>フォルダーが' +
      '入っているフォルダーを選択してください。',
    nothingChosen: 'まだ何も選択されていません。',
    step2: '2. パッケージを作成',
    create: 'nfsmw-nx.zip を作成',
    createUpdate: 'nfsmw-nx-update.zip を作成',
    step3: '3. Switchにコピー',
    step2First: '初めてゲームをインストールする場合は、こちら：',
    step2Update:
      'ゲームをすでにインストール済みで、更新だけしたい場合（<code>.nro</code>、<code>.toml</code>、<code>shaders.nfsp</code>）は、こちら：',
    step3Extract:
      '<code>ダウンロードした.zipファイル</code>を展開し、<code>sdmc:/switch/</code>に置いてください。',
    step3Start:
      'タイトルテイクオーバーモードのHomebrew Menuから<code>nfsmw-nx.nro</code>を起動するか' +
      '（<strong>Rボタンを押しながら</strong>Switchの正規のゲームを<strong>起動</strong>すると<strong>Homebrew Menu</strong>が開きます）、' +
      `${SPHAIRA}で<strong>39ビットのフォワーダー</strong>を作成してください`,
    checking: 'ゲームを確認しています…',
    supported: '{edition}版 · 対応',
    discUntested: '{edition}版のこのディスクはまだテストされていません。実行ファイルのフィンガープリント：',
    unsupported: 'この版にはまだ対応していません。実行ファイルのフィンガープリント：',
    reportIntro: '対応のため、このレポートを作成し、版の名前と一緒にお送りください：',
    createReport: 'nfsmw-nx-report.txt を作成',
    logReport: 'お使いの版のレポートを作成しています',
    reportSaved: 'レポートをnfsmw-nx-report.txtとして保存しました。版の名前と一緒にお送りください。',
    reportIntroExecutable: '対応のため、このレポートを作成し、版の名前と一緒にお送りください（default.xexだけでは不完全なレポートになります）：',
    executableOnly: '{edition}版 · MoviesフォルダーとNFSフォルダーがありません。パッケージを作成するには、ゲーム全体を選択してください。',
    notComplete: 'ゲームが揃っていません',
    incomplete: 'default.xex、Movies、NFSが見つかりません。ゲーム全体（ISOまたはXEXフォルダー）を選択してください。',
    notIso: 'Xbox 360のディスクイメージではありません',
    chosenFile: '{name}（{size}）',
    chosenFolder: '{name}：{count}個のファイル（{size}）',
    chosenFolderOne: '{name}：1個のファイル（{size}）',
    noStreaming:
      'このブラウザーウィンドウではストリーミングダウンロードができません。通常の（プライベートではない）ウィンドウを使ってください。',
    downloadStarted: 'ダウンロードを開始しました（{size}）。完了するまでこのページを開いたままにしてください。',
    finished: '{seconds}秒で完了しました。',
    error: 'エラー：{message}',
    cancelled: 'ダウンロードがキャンセルされました',
    unknown: '不明',
    fanTranslation: '{language}（ファン翻訳）',
    'region.usa': '北米',
    'region.japan': '日本',
    'region.korea': '韓国',
    'region.asia': 'アジア',
    'language.english': '英語',
    'language.spanish': 'スペイン語',
    'language.german': 'ドイツ語',
    'language.italian': 'イタリア語',
    'language.russian': 'ロシア語',
    'language.japanese': '日本語',
    'language.korean': '韓国語',
    'language.tchinese': '繁体字中国語',
    'language.french': 'フランス語',
    'language.brazilian': 'ブラジルポルトガル語',
    'language.polish': 'ポーランド語',
    readingFiles: 'ゲームファイルを読み込んでいます',
    downloadingBuild: '{edition}版のSwitchビルドをダウンロードしています',
    logEdition: '対応している版：{edition}',
    logLanguage: 'ディスクの言語：{language}',
    copied: 'コピーしました：{path}',
    read: '読み込みました：{path}',
    logUpdate: '更新パッケージ：nfsmw-nx.nro、nfsmw.toml、シェーダーのみ',
    foundShaders: '{count}個のシェーダーが見つかりました。シェーダーライブラリを作成しています',
    translatedShaders: '{count}個のシェーダーを変換しました',
    rewroteShadows: 'シャドウマップの読み込みを{count}か所書き換えました',
    compiled: '{total}個中{done}個をコンパイルしました',
    done: '完了：zipをsdmc:/switch/に展開してください',
    notSupportedYet: 'この版にはまだ対応していません。実行ファイルのフィンガープリント：{hash}',
    discNotTested: '{edition}版のこのディスクはまだテストされていません。実行ファイルのフィンガープリント：{hash}',
    buildMismatch: 'ダウンロードしたSwitchビルドが公開版と一致しません（{hash}）。しばらくしてからもう一度お試しください',
    libraryMismatch: 'シェーダーライブラリがテスト済みのものと一致しません（{hash}）。何も変更されていません',
    compositionMissing: 'このディスクに合成シェーダーが見つかりません',
    downloadFailed: '{url}をダウンロードできませんでした（{status}）',
  },
  ko: {
    legal:
      'Need for Speed™ 및 Need for Speed™: Most Wanted는 Electronic Arts Inc.의 상표입니다. 배경 이미지의 저작권은 Electronic Arts Inc.에 있습니다(© Electronic Arts Inc.). All rights reserved. nfsmw-nx는 비공식 팬 프로젝트이며 Electronic Arts Inc., 닌텐도, Microsoft와 관련이 없고, 이들 회사의 승인이나 후원을 받지 않았습니다. Nintendo Switch는 닌텐도의 상표이며 Xbox 360은 Microsoft의 상표입니다. 이 사이트는 디스크 이미지, 게임 데이터, 원본 실행 파일을 호스팅하거나 배포하지 않습니다. ISO 또는 게임 폴더는 브라우저 안에서만 읽히고 어디에도 업로드되지 않으며, 그 파일은 컴퓨터에 저장되는 nfsmw-nx.zip으로 바로 복사됩니다. 합법적으로 구입한 본인의 게임이 필요합니다. 제목 글꼴: Most Wasted (Magique Fonts).',
    sourceCode: '소스 코드',
    signature: 'StevensND 프로젝트',
    lead:
      '가지고 있는 <strong>Xbox 360</strong>판으로 <strong>Need for Speed: Most Wanted (2005)</strong>의 ' +
      '<strong>Nintendo Switch</strong>용 패키지를 만듭니다. 모든 작업은 <strong>이 브라우저 안에서</strong> 이루어집니다.',
    languageBar: '언어',
    step1: '1. 형식 선택',
    formatIso: '디스크 이미지 (.iso)',
    formatXex: 'XEX 형식',
    formatHint:
      '<strong>XEX 형식</strong>은 <code>default.xex</code>, <code>Movies</code> 폴더, <code>NFS</code> 폴더가 ' +
      '들어 있는 폴더를 선택하세요.',
    nothingChosen: '아직 아무것도 선택하지 않았습니다.',
    step2: '2. 패키지 만들기',
    create: 'nfsmw-nx.zip 만들기',
    createUpdate: 'nfsmw-nx-update.zip 만들기',
    step3: '3. Switch에 복사하기',
    step2First: '게임을 처음 설치한다면 다음을 사용하세요:',
    step2Update:
      '게임이 이미 설치되어 있고 업데이트만 하려면(<code>.nro</code>, <code>.toml</code>, <code>shaders.nfsp</code>) 다음을 사용하세요:',
    step3Extract:
      '<code>다운로드한 .zip 파일</code>의 압축을 풀어 <code>sdmc:/switch/</code>에 넣으세요.',
    step3Start:
      '타이틀 테이크오버 모드의 Homebrew Menu에서 <code>nfsmw-nx.nro</code>를 실행하거나' +
      '(<strong>R 버튼을 누른 채</strong> Switch 정품 게임을 <strong>실행</strong>하면 <strong>Homebrew Menu</strong>가 열립니다), ' +
      `${SPHAIRA}로 <strong>39비트 포워더</strong>를 만드세요`,
    checking: '게임을 확인하는 중…',
    supported: '{edition}판 · 지원',
    discUntested: '{edition}판의 이 디스크는 아직 테스트되지 않았습니다. 실행 파일 지문:',
    unsupported: '이 판은 아직 지원하지 않습니다. 실행 파일 지문:',
    reportIntro: '지원할 수 있도록 이 보고서를 만들어 판 이름과 함께 보내 주세요:',
    createReport: 'nfsmw-nx-report.txt 만들기',
    logReport: '사용하시는 판의 보고서를 만드는 중',
    reportSaved: '보고서를 nfsmw-nx-report.txt로 저장했습니다. 판 이름과 함께 보내 주세요.',
    reportIntroExecutable: '지원할 수 있도록 이 보고서를 만들어 판 이름과 함께 보내 주세요(default.xex만 있으면 일부만 담깁니다):',
    executableOnly: '{edition}판 · Movies 폴더와 NFS 폴더가 없습니다. 패키지를 만들려면 게임 전체를 선택하세요.',
    notComplete: '게임이 완전하지 않습니다',
    incomplete: 'default.xex, Movies, NFS를 찾지 못했습니다. 게임 전체(ISO 또는 XEX 폴더)를 선택하세요.',
    notIso: 'Xbox 360 디스크 이미지가 아닙니다',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: 파일 {count}개 ({size})',
    chosenFolderOne: '{name}: 파일 1개 ({size})',
    noStreaming: '이 브라우저 창에서는 스트리밍 다운로드를 할 수 없습니다. 일반(비공개가 아닌) 창을 사용하세요.',
    downloadStarted: '다운로드를 시작했습니다({size}). 끝날 때까지 이 페이지를 열어 두세요.',
    finished: '{seconds}초 만에 완료했습니다.',
    error: '오류: {message}',
    cancelled: '다운로드가 취소되었습니다',
    unknown: '알 수 없음',
    fanTranslation: '{language} (팬 번역)',
    'region.usa': '북미',
    'region.japan': '일본',
    'region.korea': '한국',
    'region.asia': '아시아',
    'language.english': '영어',
    'language.spanish': '스페인어',
    'language.german': '독일어',
    'language.italian': '이탈리아어',
    'language.russian': '러시아어',
    'language.japanese': '일본어',
    'language.korean': '한국어',
    'language.tchinese': '중국어 번체',
    'language.french': '프랑스어',
    'language.brazilian': '브라질 포르투갈어',
    'language.polish': '폴란드어',
    readingFiles: '게임 파일을 읽는 중',
    downloadingBuild: '{edition}판용 Switch 빌드를 다운로드하는 중',
    logEdition: '지원하는 판: {edition}',
    logLanguage: '디스크 언어: {language}',
    copied: '복사함: {path}',
    read: '읽음: {path}',
    logUpdate: '업데이트 패키지: nfsmw-nx.nro, nfsmw.toml, 셰이더만',
    foundShaders: '셰이더 {count}개를 찾았습니다. 셰이더 라이브러리를 만드는 중',
    translatedShaders: '셰이더 {count}개를 변환했습니다',
    rewroteShadows: '섀도 맵 읽기 {count}곳을 고쳐 썼습니다',
    compiled: '{total}개 중 {done}개 컴파일함',
    done: '완료: zip을 sdmc:/switch/에 압축 해제하세요',
    notSupportedYet: '이 판은 아직 지원하지 않습니다. 실행 파일 지문: {hash}',
    discNotTested: '{edition}판의 이 디스크는 아직 테스트되지 않았습니다. 실행 파일 지문: {hash}',
    buildMismatch: '다운로드한 Switch 빌드가 공개된 빌드와 다릅니다({hash}). 잠시 후 다시 시도하세요',
    libraryMismatch: '셰이더 라이브러리가 테스트된 것과 다릅니다({hash}). 아무것도 바뀌지 않았습니다',
    compositionMissing: '이 디스크에서 합성 셰이더를 찾지 못했습니다',
    downloadFailed: '{url}을(를) 다운로드하지 못했습니다({status})',
  },
  'zh-Hant': {
    legal:
      'Need for Speed™ 及 Need for Speed™: Most Wanted 是 Electronic Arts Inc. 的商標。背景圖片版權屬於 Electronic Arts Inc.（© Electronic Arts Inc.），保留所有權利。nfsmw-nx 是非官方的玩家專案，與 Electronic Arts Inc.、任天堂及 Microsoft 均無關聯，亦未獲得其認可或贊助。Nintendo Switch 是任天堂的商標；Xbox 360 是 Microsoft 的商標。本網站不託管也不散布光碟映像檔、遊戲資料或原始執行檔：你的 ISO 或遊戲資料夾只會在瀏覽器內讀取，絕不會上傳，其檔案會直接複製到儲存在你電腦上的 nfsmw-nx.zip。你需要自己合法取得的遊戲。標題字型：Most Wasted（Magique Fonts）。',
    sourceCode: '原始碼',
    signature: 'StevensND 的專案',
    lead:
      '使用你自己的 <strong>Xbox 360</strong> 版本，製作 <strong>Need for Speed: Most Wanted (2005)</strong> 的 ' +
      '<strong>Nintendo Switch</strong> 套件。所有處理都在<strong>這個瀏覽器內</strong>完成。',
    languageBar: '語言',
    step1: '1. 選擇格式',
    formatIso: '光碟映像檔 (.iso)',
    formatXex: 'XEX 格式',
    formatHint:
      '<strong>XEX 格式</strong>請選擇包含 <code>default.xex</code>、<code>Movies</code> 資料夾及 <code>NFS</code> 資料夾的' +
      '資料夾。',
    nothingChosen: '尚未選擇任何項目。',
    step2: '2. 製作套件',
    create: '製作 nfsmw-nx.zip',
    createUpdate: '製作 nfsmw-nx-update.zip',
    step3: '3. 複製到 Switch',
    step2First: '如果是第一次安裝遊戲，請使用：',
    step2Update:
      '如果已經安裝遊戲，只想更新（<code>.nro</code>、<code>.toml</code> 及 <code>shaders.nfsp</code>），請使用：',
    step3Extract:
      '將<code>下載的 .zip 檔案</code>解壓縮，並放到 <code>sdmc:/switch/</code>。',
    step3Start:
      '以標題接管模式從 Homebrew Menu 啟動 <code>nfsmw-nx.nro</code>' +
      '（<strong>按住 R 鍵</strong>的同時<strong>啟動</strong>一款 Switch 正版遊戲，即可開啟 <strong>Homebrew Menu</strong>），' +
      `或使用 ${SPHAIRA} 製作 <strong>39 位元轉發器（forwarder）</strong>`,
    checking: '正在檢查你的遊戲…',
    supported: '{edition}版 · 支援',
    discUntested: '{edition}版的這張光碟尚未測試。執行檔指紋：',
    unsupported: '尚未支援這個版本。執行檔指紋：',
    reportIntro: '為了協助我們支援它，請製作這份報告，並連同你的版本名稱一起寄給我們：',
    createReport: '製作 nfsmw-nx-report.txt',
    logReport: '正在製作你的版本報告',
    reportSaved: '報告已儲存為 nfsmw-nx-report.txt。請連同你的版本名稱一起寄給我們。',
    reportIntroExecutable: '為了協助我們支援它，請製作這份報告，並連同你的版本名稱一起寄給我們（只有 default.xex 時報告不完整）：',
    executableOnly: '{edition}版 · 缺少 Movies 及 NFS 資料夾：請選擇完整的遊戲來製作套件。',
    notComplete: '遊戲不完整',
    incomplete: '找不到 default.xex、Movies 及 NFS：請選擇完整的遊戲（ISO 或 XEX 資料夾）。',
    notIso: '不是 Xbox 360 光碟映像檔',
    chosenFile: '{name}（{size}）',
    chosenFolder: '{name}：{count} 個檔案（{size}）',
    chosenFolderOne: '{name}：1 個檔案（{size}）',
    noStreaming: '這個瀏覽器視窗無法以串流方式下載。請使用一般（非私密）視窗。',
    downloadStarted: '已開始下載（{size}）。下載完成前請勿關閉此頁面。',
    finished: '在 {seconds} 秒內完成。',
    error: '錯誤：{message}',
    cancelled: '下載已取消',
    unknown: '未知',
    fanTranslation: '{language}（玩家翻譯）',
    'region.usa': '北美',
    'region.japan': '日本',
    'region.korea': '韓國',
    'region.asia': '亞洲',
    'language.english': '英文',
    'language.spanish': '西班牙文',
    'language.german': '德文',
    'language.italian': '義大利文',
    'language.russian': '俄文',
    'language.japanese': '日文',
    'language.korean': '韓文',
    'language.tchinese': '繁體中文',
    'language.french': '法文',
    'language.brazilian': '巴西葡萄牙文',
    'language.polish': '波蘭文',
    readingFiles: '正在讀取遊戲檔案',
    downloadingBuild: '正在下載{edition}版的 Switch 版本',
    logEdition: '支援的版本：{edition}',
    logLanguage: '光碟語言：{language}',
    copied: '已複製：{path}',
    read: '已讀取：{path}',
    logUpdate: '更新套件：只有 nfsmw-nx.nro、nfsmw.toml 及著色器',
    foundShaders: '找到 {count} 個著色器；正在建立著色器資料庫',
    translatedShaders: '已轉換 {count} 個著色器',
    rewroteShadows: '已改寫 {count} 處陰影貼圖讀取',
    compiled: '已編譯 {done} / {total}',
    done: '完成：請將 zip 解壓縮到 sdmc:/switch/',
    notSupportedYet: '尚未支援這個版本。執行檔指紋：{hash}',
    discNotTested: '{edition}版的這張光碟尚未測試。執行檔指紋：{hash}',
    buildMismatch: '下載的 Switch 版本與公開版本不符（{hash}）；請稍後再試',
    libraryMismatch: '著色器資料庫與已測試的不符（{hash}）；未做任何變更',
    compositionMissing: '在這張光碟上找不到合成著色器',
    downloadFailed: '無法下載 {url}（{status}）',
  },
  'pt-BR': {
    legal:
      'Need for Speed™ e Need for Speed™: Most Wanted são marcas comerciais da Electronic Arts Inc. A imagem de fundo é © Electronic Arts Inc. Todos os direitos reservados. O nfsmw-nx é um projeto de fãs não oficial e não tem vínculo com a Electronic Arts Inc., a Nintendo ou a Microsoft, nem é endossado ou patrocinado por elas. Nintendo Switch é uma marca comercial da Nintendo, e Xbox 360, da Microsoft. Este site não hospeda nem distribui imagens de disco, dados do jogo ou o executável original: sua ISO ou a pasta do jogo são lidas apenas dentro do seu navegador, nunca são enviadas para lugar nenhum, e os arquivos são copiados diretamente para o nfsmw-nx.zip salvo no seu computador. Você precisa da sua própria cópia do jogo, obtida legalmente. Fonte do título: Most Wasted, da Magique Fonts.',
    sourceCode: 'Código-fonte',
    signature: 'um projeto de StevensND',
    lead:
      'Cria o pacote de <strong>Nintendo Switch</strong> de <strong>Need for Speed: Most Wanted (2005)</strong> a ' +
      'partir da sua própria cópia de <strong>Xbox 360</strong>. Tudo acontece <strong>neste navegador</strong>.',
    languageBar: 'Idioma',
    step1: '1. Escolha o formato',
    formatIso: 'Imagem de disco (.iso)',
    formatXex: 'Formato XEX',
    formatHint:
      'No <strong>formato XEX</strong>, selecione a pasta que contém o <code>default.xex</code>, a pasta ' +
      '<code>Movies</code> e a pasta <code>NFS</code>.',
    nothingChosen: 'Nada escolhido ainda.',
    step2: '2. Crie o pacote',
    create: 'Criar nfsmw-nx.zip',
    createUpdate: 'Criar nfsmw-nx-update.zip',
    step3: '3. Copie para o Switch',
    step2First: 'Se é a primeira vez que você instala o jogo, use:',
    step2Update:
      'Se o jogo já está instalado e você só quer atualizá-lo (<code>.nro</code>, <code>.toml</code> e <code>shaders.nfsp</code>), use:',
    step3Extract:
      'Extraia o <code>arquivo .zip baixado</code> e coloque-o em <code>sdmc:/switch/</code>.',
    step3Start:
      'Inicie o <code>nfsmw-nx.nro</code> pelo Homebrew Menu no modo title takeover (<strong>abra</strong> um jogo original de ' +
      `Switch <strong>segurando o R</strong> para abrir o <strong>Homebrew Menu</strong>) ou crie um <strong>forwarder de 39 bits</strong> com o ${SPHAIRA}`,
    checking: 'Verificando o seu jogo…',
    supported: 'Edição {edition} · compatível',
    discUntested: 'Este disco da edição {edition} ainda não foi testado. Impressão digital do executável:',
    unsupported: 'Esta edição ainda não é compatível. Impressão digital do executável:',
    reportIntro: 'Para nos ajudar a torná-la compatível, crie este relatório e envie-o para nós com o nome da sua edição:',
    createReport: 'Criar nfsmw-nx-report.txt',
    logReport: 'Criando o relatório da sua edição',
    reportSaved: 'Relatório salvo como nfsmw-nx-report.txt. Envie-o para nós com o nome da sua edição.',
    reportIntroExecutable:
      'Para nos ajudar a torná-la compatível, crie este relatório e envie-o para nós com o nome da sua edição (só com o default.xex ele fica incompleto):',
    executableOnly: 'Edição {edition} · faltam as pastas Movies e NFS: escolha o jogo completo para criar o pacote.',
    notComplete: 'Não é um jogo completo',
    incomplete: 'Não foram encontrados default.xex, Movies e NFS: escolha o jogo completo (ISO ou pasta XEX).',
    notIso: 'Não é uma imagem de disco de Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} arquivos ({size})',
    chosenFolderOne: '{name}: 1 arquivo ({size})',
    noStreaming: 'esta janela do navegador não consegue fazer downloads por streaming. Use uma janela normal (não anônima).',
    downloadStarted: 'Download iniciado ({size}). Mantenha esta página aberta até ele terminar.',
    finished: 'Concluído em {seconds} s.',
    error: 'Erro: {message}',
    cancelled: 'o download foi cancelado',
    unknown: 'Desconhecido',
    fanTranslation: '{language} (tradução de fãs)',
    'region.usa': 'americana',
    'region.japan': 'japonesa',
    'region.korea': 'coreana',
    'region.asia': 'asiática',
    'language.english': 'Inglês',
    'language.spanish': 'Espanhol',
    'language.german': 'Alemão',
    'language.italian': 'Italiano',
    'language.russian': 'Russo',
    'language.japanese': 'Japonês',
    'language.korean': 'Coreano',
    'language.tchinese': 'Chinês tradicional',
    'language.french': 'Francês',
    'language.brazilian': 'Português do Brasil',
    'language.polish': 'Polonês',
    readingFiles: 'Lendo os arquivos do jogo',
    downloadingBuild: 'Baixando a versão de Switch da edição {edition}',
    logEdition: 'Edição compatível: {edition}',
    logLanguage: 'Idioma do disco: {language}',
    copied: 'Copiado {path}',
    read: 'Lido {path}',
    logUpdate: 'Pacote de atualização: só nfsmw-nx.nro, nfsmw.toml e os shaders',
    foundShaders: '{count} shaders encontrados; criando a biblioteca de shaders',
    translatedShaders: '{count} shaders traduzidos',
    rewroteShadows: '{count} leituras do mapa de sombras reescritas',
    compiled: '{done} de {total} compilados',
    done: 'Pronto: extraia o zip em sdmc:/switch/',
    notSupportedYet: 'esta edição ainda não é compatível. Impressão digital do executável: {hash}',
    discNotTested: 'este disco da edição {edition} ainda não foi testado. Impressão digital do executável: {hash}',
    buildMismatch: 'a versão de Switch baixada não é a publicada ({hash}); tente novamente mais tarde',
    libraryMismatch: 'a biblioteca de shaders não corresponde à testada ({hash}); nada foi alterado',
    compositionMissing: 'o shader de composição não foi encontrado neste disco',
    downloadFailed: 'não foi possível baixar {url} ({status})',
  },
  // French puts a space before ":" and ";": a no-break one ( ), so the sign never starts a line on its own.
  fr: {
    legal:
      'Need for Speed™ et Need for Speed™: Most Wanted sont des marques commerciales d’Electronic Arts Inc. L’image de fond est © Electronic Arts Inc. Tous droits réservés. nfsmw-nx est un projet de fans non officiel, sans lien avec Electronic Arts Inc., Nintendo ou Microsoft, qui ne l’approuvent ni ne le parrainent. Nintendo Switch est une marque commerciale de Nintendo, et Xbox 360, de Microsoft. Ce site n’héberge ni ne distribue d’images disque, de données du jeu ou l’exécutable original : votre ISO ou le dossier du jeu est lu uniquement dans votre navigateur, n’est jamais envoyé nulle part, et ses fichiers sont copiés directement dans le nfsmw-nx.zip enregistré sur votre ordinateur. Vous devez posséder votre propre copie du jeu, obtenue légalement. Police du titre : Most Wasted, de Magique Fonts.',
    sourceCode: 'Code source',
    signature: 'un projet de StevensND',
    lead:
      'Crée le paquet <strong>Nintendo Switch</strong> de <strong>Need for Speed: Most Wanted (2005)</strong> à ' +
      'partir de votre propre copie <strong>Xbox 360</strong>. Tout se fait dans <strong>ce navigateur</strong>.',
    languageBar: 'Langue',
    step1: '1. Choisissez le format',
    formatIso: 'Image disque (.iso)',
    formatXex: 'Format XEX',
    formatHint:
      'Pour le <strong>format XEX</strong>, sélectionnez le dossier qui contient <code>default.xex</code>, le dossier ' +
      '<code>Movies</code> et le dossier <code>NFS</code>.',
    nothingChosen: 'Aucune sélection pour l’instant.',
    step2: '2. Créez le paquet',
    create: 'Créer nfsmw-nx.zip',
    createUpdate: 'Créer nfsmw-nx-update.zip',
    step3: '3. Copiez-le sur la Switch',
    step2First: 'Si vous installez le jeu pour la première fois, utilisez :',
    step2Update:
      'Si le jeu est déjà installé et que vous voulez seulement le mettre à jour (<code>.nro</code>, <code>.toml</code> et <code>shaders.nfsp</code>), utilisez :',
    step3Extract:
      'Extrayez le <code>fichier .zip téléchargé</code> et placez-le dans <code>sdmc:/switch/</code>.',
    step3Start:
      'Lancez <code>nfsmw-nx.nro</code> depuis le Homebrew Menu en mode title takeover (<strong>lancez</strong> un jeu Switch original ' +
      `<strong>en maintenant R</strong> pour ouvrir le <strong>Homebrew Menu</strong>) ou créez un <strong>forwarder 39 bits</strong> avec ${SPHAIRA}`,
    checking: 'Vérification de votre jeu…',
    supported: 'Édition {edition} · compatible',
    discUntested: 'Ce disque de l’édition {edition} n’a pas encore été testé. Empreinte de l’exécutable :',
    unsupported: 'Cette édition n’est pas encore prise en charge. Empreinte de l’exécutable :',
    reportIntro: 'Pour nous aider à la prendre en charge, créez ce rapport et envoyez-le-nous avec le nom de votre édition :',
    createReport: 'Créer nfsmw-nx-report.txt',
    logReport: 'Création du rapport de votre édition',
    reportSaved: 'Rapport enregistré sous nfsmw-nx-report.txt. Envoyez-le-nous avec le nom de votre édition.',
    reportIntroExecutable:
      'Pour nous aider à la prendre en charge, créez ce rapport et envoyez-le-nous avec le nom de votre édition (avec seulement default.xex, il est incomplet) :',
    executableOnly: 'Édition {edition} · les dossiers Movies et NFS manquent : choisissez le jeu complet pour créer le paquet.',
    notComplete: 'Ce n’est pas un jeu complet',
    incomplete: 'default.xex, Movies et NFS sont introuvables : choisissez le jeu complet (ISO ou dossier XEX).',
    notIso: 'Ce n’est pas une image disque Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name} : {count} fichiers ({size})',
    chosenFolderOne: '{name} : 1 fichier ({size})',
    noStreaming:
      'cette fenêtre du navigateur ne peut pas faire de téléchargements en streaming. Utilisez une fenêtre normale (pas de navigation privée).',
    downloadStarted: 'Téléchargement lancé ({size}). Gardez cette page ouverte jusqu’à la fin.',
    finished: 'Terminé en {seconds} s.',
    error: 'Erreur : {message}',
    cancelled: 'le téléchargement a été annulé',
    unknown: 'Inconnu',
    fanTranslation: '{language} (traduction de fans)',
    'region.usa': 'américaine',
    'region.japan': 'japonaise',
    'region.korea': 'coréenne',
    'region.asia': 'asiatique',
    'language.english': 'Anglais',
    'language.spanish': 'Espagnol',
    'language.german': 'Allemand',
    'language.italian': 'Italien',
    'language.russian': 'Russe',
    'language.japanese': 'Japonais',
    'language.korean': 'Coréen',
    'language.tchinese': 'Chinois traditionnel',
    'language.french': 'Français',
    'language.brazilian': 'Portugais du Brésil',
    'language.polish': 'Polonais',
    readingFiles: 'Lecture des fichiers du jeu',
    downloadingBuild: 'Téléchargement de la version Switch de l’édition {edition}',
    logEdition: 'Édition compatible : {edition}',
    logLanguage: 'Langue du disque : {language}',
    copied: 'Copié : {path}',
    read: 'Lu : {path}',
    logUpdate: 'Paquet de mise à jour : uniquement nfsmw-nx.nro, nfsmw.toml et les shaders',
    foundShaders: '{count} shaders trouvés ; création de la bibliothèque de shaders',
    translatedShaders: '{count} shaders traduits',
    rewroteShadows: '{count} lectures de la carte des ombres réécrites',
    compiled: '{done} sur {total} compilés',
    done: 'Terminé : extrayez le zip dans sdmc:/switch/',
    notSupportedYet: 'cette édition n’est pas encore prise en charge. Empreinte de l’exécutable : {hash}',
    discNotTested: 'ce disque de l’édition {edition} n’a pas encore été testé. Empreinte de l’exécutable : {hash}',
    buildMismatch: 'la version Switch téléchargée n’est pas celle qui a été publiée ({hash}) ; réessayez plus tard',
    libraryMismatch: 'la bibliothèque de shaders ne correspond pas à celle qui a été testée ({hash}) ; rien n’a été modifié',
    compositionMissing: 'le shader de composition est introuvable sur ce disque',
    downloadFailed: 'impossible de télécharger {url} ({status})',
  },
  // Polish declines nouns, so {edition} always goes after "wydanie:" (edition), where it keeps its basic form.
  pl: {
    legal:
      'Need for Speed™ i Need for Speed™: Most Wanted są znakami towarowymi Electronic Arts Inc. Grafika w tle © Electronic Arts Inc. Wszelkie prawa zastrzeżone. nfsmw-nx to nieoficjalny projekt fanowski, niezwiązany z Electronic Arts Inc., Nintendo ani Microsoft, które go nie popierają ani nie sponsorują. Nintendo Switch jest znakiem towarowym Nintendo, a Xbox 360 — znakiem towarowym Microsoft. Ta strona nie przechowuje ani nie rozpowszechnia obrazów płyt, danych gry ani oryginalnego pliku wykonywalnego: Twój plik ISO lub folder z grą jest odczytywany wyłącznie w przeglądarce, nigdy nie jest nigdzie wysyłany, a jego pliki są kopiowane bezpośrednio do pliku nfsmw-nx.zip zapisywanego na Twoim komputerze. Potrzebujesz własnej, legalnie nabytej kopii gry. Czcionka tytułu: Most Wasted od Magique Fonts.',
    sourceCode: 'Kod źródłowy',
    signature: 'projekt StevensND',
    lead:
      'Tworzy pakiet <strong>Need for Speed: Most Wanted (2005)</strong> na <strong>Nintendo Switch</strong> z Twojej ' +
      'własnej kopii na <strong>Xbox 360</strong>. Wszystko dzieje się w <strong>tej przeglądarce</strong>.',
    languageBar: 'Język',
    step1: '1. Wybierz format',
    formatIso: 'Obraz płyty (.iso)',
    formatXex: 'Format XEX',
    formatHint:
      'W przypadku <strong>formatu XEX</strong> wybierz folder zawierający <code>default.xex</code>, folder ' +
      '<code>Movies</code> i folder <code>NFS</code>.',
    nothingChosen: 'Nic jeszcze nie wybrano.',
    step2: '2. Utwórz pakiet',
    create: 'Utwórz nfsmw-nx.zip',
    createUpdate: 'Utwórz nfsmw-nx-update.zip',
    step3: '3. Skopiuj go na Switcha',
    step2First: 'Jeśli instalujesz grę po raz pierwszy, użyj:',
    step2Update:
      'Jeśli gra jest już zainstalowana i chcesz ją tylko zaktualizować (<code>.nro</code>, <code>.toml</code> i <code>shaders.nfsp</code>), użyj:',
    step3Extract:
      'Rozpakuj <code>pobrany plik .zip</code> i umieść go w <code>sdmc:/switch/</code>.',
    step3Start:
      'Uruchom <code>nfsmw-nx.nro</code> z Homebrew Menu w trybie title takeover (<strong>uruchom</strong> oryginalną grę na ' +
      `Switcha, <strong>przytrzymując R</strong>, aby otworzyć <strong>Homebrew Menu</strong>) lub utwórz <strong>39-bitowy forwarder</strong> za pomocą ${SPHAIRA}`,
    checking: 'Sprawdzanie gry…',
    supported: 'Wydanie: {edition} · obsługiwane',
    discUntested: 'Ta płyta (wydanie: {edition}) nie była jeszcze testowana. Suma kontrolna pliku wykonywalnego:',
    unsupported: 'To wydanie nie jest jeszcze obsługiwane. Suma kontrolna pliku wykonywalnego:',
    reportIntro: 'Aby pomóc nam dodać jego obsługę, utwórz ten raport i wyślij go nam razem z nazwą swojego wydania:',
    createReport: 'Utwórz nfsmw-nx-report.txt',
    logReport: 'Tworzenie raportu o Twoim wydaniu',
    reportSaved: 'Raport zapisano jako nfsmw-nx-report.txt. Wyślij go nam razem z nazwą swojego wydania.',
    reportIntroExecutable:
      'Aby pomóc nam dodać jego obsługę, utwórz ten raport i wyślij go nam razem z nazwą swojego wydania (z samym default.xex będzie niepełny):',
    executableOnly: 'Wydanie: {edition} · brakuje folderów Movies i NFS: wybierz całą grę, aby utworzyć pakiet.',
    notComplete: 'To nie jest kompletna gra',
    incomplete: 'Nie znaleziono default.xex, Movies i NFS: wybierz całą grę (ISO lub folder XEX).',
    notIso: 'To nie jest obraz płyty Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name} — liczba plików: {count} ({size})',
    chosenFolderOne: '{name}: 1 plik ({size})',
    noStreaming: 'to okno przeglądarki nie obsługuje pobierania strumieniowego. Użyj zwykłego okna (nie prywatnego).',
    downloadStarted: 'Rozpoczęto pobieranie ({size}). Nie zamykaj tej strony, dopóki się nie zakończy.',
    finished: 'Gotowe w {seconds} s.',
    error: 'Błąd: {message}',
    cancelled: 'pobieranie zostało anulowane',
    unknown: 'Nieznany',
    fanTranslation: '{language} (tłumaczenie fanowskie)',
    'region.usa': 'USA',
    'region.japan': 'Japonia',
    'region.korea': 'Korea',
    'region.asia': 'Azja',
    'language.english': 'Angielski',
    'language.spanish': 'Hiszpański',
    'language.german': 'Niemiecki',
    'language.italian': 'Włoski',
    'language.russian': 'Rosyjski',
    'language.japanese': 'Japoński',
    'language.korean': 'Koreański',
    'language.tchinese': 'Chiński tradycyjny',
    'language.french': 'Francuski',
    'language.brazilian': 'Brazylijski portugalski',
    'language.polish': 'Polski',
    readingFiles: 'Odczytywanie plików gry',
    downloadingBuild: 'Pobieranie wersji na Switcha (wydanie: {edition})',
    logEdition: 'Obsługiwane wydanie: {edition}',
    logLanguage: 'Język płyty: {language}',
    copied: 'Skopiowano: {path}',
    read: 'Odczytano: {path}',
    logUpdate: 'Pakiet aktualizacji: tylko nfsmw-nx.nro, nfsmw.toml i shadery',
    foundShaders: 'Znaleziono shaderów: {count}; tworzenie biblioteki shaderów',
    translatedShaders: 'Przekonwertowano shaderów: {count}',
    rewroteShadows: 'Przepisano odczytów mapy cieni: {count}',
    compiled: 'Skompilowano {done} z {total}',
    done: 'Gotowe: rozpakuj zip do sdmc:/switch/',
    notSupportedYet: 'to wydanie nie jest jeszcze obsługiwane. Suma kontrolna pliku wykonywalnego: {hash}',
    discNotTested: 'ta płyta (wydanie: {edition}) nie była jeszcze testowana. Suma kontrolna pliku wykonywalnego: {hash}',
    buildMismatch: 'pobrana wersja na Switcha nie jest wersją opublikowaną ({hash}); spróbuj ponownie później',
    libraryMismatch: 'biblioteka shaderów nie odpowiada przetestowanej ({hash}); nic nie zostało zmienione',
    compositionMissing: 'na tej płycie nie znaleziono shadera kompozycji',
    downloadFailed: 'nie udało się pobrać {url} ({status})',
  },
};

let current = 'en';

export function getLanguage() {
  return current;
}

export function setLanguage(code) {
  current = TEXTS[code] ? code : 'en';
  return current;
}

// English unless the visitor chose another language with the flags (saved in their browser).
export function preferredLanguage(saved) {
  return saved && TEXTS[saved] ? saved : 'en';
}

export function t(key, params = {}) {
  const text = TEXTS[current][key] ?? TEXTS.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => (params[name] ?? `{${name}}`));
}

// Sizes as Windows Explorer shows them, so the page and the file's properties agree: units of 1024 bytes (which
// Windows calls KB, MB and GB) and three significant digits, truncated. 7,834,892,288 bytes is 7.29 GB, not 7.83.
const SIZE_UNITS = { ru: ['КБ', 'МБ', 'ГБ'], fr: ['Ko', 'Mo', 'Go'] };

export function formatSize(bytes) {
  const units = SIZE_UNITS[current] ?? ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  const decimals = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  const scale = 10 ** decimals;
  // The small epsilon keeps values such as 7.3 from becoming 7.29 through floating point.
  const shown = Math.floor(value * scale + 1e-9) / scale;
  const number = new Intl.NumberFormat(current, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${number.format(shown)} ${units[unit]}`;
}

// "PAL (Spanish)" -> "PAL (Español)", "USA" -> "EE. UU." in the current language.
export function editionName(edition) {
  const pal = /^PAL \((\w+)\)$/.exec(edition || '');
  if (pal) {
    return `PAL (${t('language.' + pal[1].toLowerCase())})`;
  }
  if (edition === 'USA') {
    return t('region.usa');
  }
  if (edition === 'Japan') {
    return t('region.japan');
  }
  if (edition === 'Korea') {
    return t('region.korea');
  }
  if (edition === 'Asia') {
    return t('region.asia');
  }
  return edition;
}

// The language of a disc as describeLanguage (flags.js) gives it, in the current language.
export function languageName(described) {
  if (!described || !described.key) {
    return described && described.name && described.name !== 'Unknown' ? described.name : t('unknown');
  }
  const key = 'language.' + described.key;
  const name = TEXTS.en[key] ? t(key) : described.name;
  return described.translation ? t('fanTranslation', { language: name }) : name;
}
