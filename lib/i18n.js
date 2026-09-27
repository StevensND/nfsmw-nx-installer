// Interface texts in the languages of the supported editions. Works in the page and in the worker (no DOM here).
// Static texts in index.html name their key with data-i18n (plain text) or data-i18n-html (text with markup).

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'uk' },
  { code: 'es', name: 'Español', flag: 'spain' },
  { code: 'de', name: 'Deutsch', flag: 'germany' },
  { code: 'it', name: 'Italiano', flag: 'italy' },
  { code: 'ru', name: 'Русский', flag: 'russia' },
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
    discUntested:
      'This disc of the {edition} edition has not been tested yet. Send us this fingerprint and the name of your disc:',
    unsupported: 'This edition is not supported yet. Send us this fingerprint and the name of your edition:',
    notComplete: 'Not a complete game',
    incomplete: 'default.xex, Movies and NFS were not found: choose the whole game (ISO or XEX folder).',
    notIso: 'Not an Xbox 360 disc image',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} files ({size})',
    noStreaming: 'this browser window cannot stream downloads. Use a normal (not private) window.',
    downloadStarted: 'Download started ({size}). Keep this page open until it finishes.',
    finished: 'Finished in {seconds} s.',
    error: 'Error: {message}',
    cancelled: 'the download was cancelled',
    unknown: 'Unknown',
    fanTranslation: '{language} (fan translation)',
    'region.usa': 'USA',
    'region.japan': 'Japan',
    'language.english': 'English',
    'language.spanish': 'Spanish',
    'language.german': 'German',
    'language.italian': 'Italian',
    'language.russian': 'Russian',
    'language.japanese': 'Japanese',
    'language.french': 'French',
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
    discUntested:
      'Este disco de la edición {edition} aún no se ha probado. Envíanos esta huella y el nombre de tu disco:',
    unsupported: 'Esta edición aún no es compatible. Envíanos esta huella y el nombre de tu edición:',
    notComplete: 'No es un juego completo',
    incomplete: 'No se han encontrado default.xex, Movies y NFS: elige el juego completo (ISO o carpeta XEX).',
    notIso: 'No es una imagen de disco de Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} archivos ({size})',
    noStreaming: 'esta ventana del navegador no puede hacer descargas por streaming. Usa una ventana normal (no privada).',
    downloadStarted: 'Descarga iniciada ({size}). Mantén esta página abierta hasta que termine.',
    finished: 'Terminado en {seconds} s.',
    error: 'Error: {message}',
    cancelled: 'se ha cancelado la descarga',
    unknown: 'Desconocido',
    fanTranslation: '{language} (traducción de aficionados)',
    'region.usa': 'americana',
    'region.japan': 'japonesa',
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    'language.german': 'Alemán',
    'language.italian': 'Italiano',
    'language.russian': 'Ruso',
    'language.japanese': 'Japonés',
    'language.french': 'Francés',
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
      'Diese Disc der Edition {edition} wurde noch nicht getestet. Schick uns diesen Fingerabdruck und den Namen ' +
      'deiner Disc:',
    unsupported:
      'Diese Edition wird noch nicht unterstützt. Schick uns diesen Fingerabdruck und den Namen deiner Edition:',
    notComplete: 'Kein vollständiges Spiel',
    incomplete: 'default.xex, Movies und NFS wurden nicht gefunden: Wähle das ganze Spiel (ISO oder XEX-Ordner).',
    notIso: 'Kein Xbox-360-Disc-Image',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} Dateien ({size})',
    noStreaming: 'Dieses Browserfenster kann keine Downloads streamen. Verwende ein normales (nicht privates) Fenster.',
    downloadStarted: 'Download gestartet ({size}). Lass diese Seite geöffnet, bis er fertig ist.',
    finished: 'Fertig nach {seconds} s.',
    error: 'Fehler: {message}',
    cancelled: 'Der Download wurde abgebrochen',
    unknown: 'Unbekannt',
    fanTranslation: '{language} (Fan-Übersetzung)',
    'region.usa': 'USA',
    'region.japan': 'Japan',
    'language.english': 'Englisch',
    'language.spanish': 'Spanisch',
    'language.german': 'Deutsch',
    'language.italian': 'Italienisch',
    'language.russian': 'Russisch',
    'language.japanese': 'Japanisch',
    'language.french': 'Französisch',
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
    discUntested:
      "Questo disco dell'edizione {edition} non è ancora stato provato. Inviaci questa impronta e il nome del tuo disco:",
    unsupported: 'Questa edizione non è ancora supportata. Inviaci questa impronta e il nome della tua edizione:',
    notComplete: 'Non è un gioco completo',
    incomplete: 'default.xex, Movies e NFS non sono stati trovati: scegli il gioco completo (ISO o cartella XEX).',
    notIso: "Non è un'immagine disco di Xbox 360",
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: {count} file ({size})',
    noStreaming: 'questa finestra del browser non può scaricare in streaming. Usa una finestra normale (non privata).',
    downloadStarted: 'Download avviato ({size}). Tieni aperta questa pagina finché non termina.',
    finished: 'Completato in {seconds} s.',
    error: 'Errore: {message}',
    cancelled: 'il download è stato annullato',
    unknown: 'Sconosciuta',
    fanTranslation: '{language} (traduzione amatoriale)',
    'region.usa': 'americana',
    'region.japan': 'giapponese',
    'language.english': 'Inglese',
    'language.spanish': 'Spagnolo',
    'language.german': 'Tedesco',
    'language.italian': 'Italiano',
    'language.russian': 'Russo',
    'language.japanese': 'Giapponese',
    'language.french': 'Francese',
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
    discUntested:
      'Этот диск издания {edition} ещё не проверен. Пришлите нам этот отпечаток и название вашего диска:',
    unsupported: 'Это издание пока не поддерживается. Пришлите нам этот отпечаток и название вашего издания:',
    notComplete: 'Игра неполная',
    incomplete: 'Не найдены default.xex, Movies и NFS: выберите игру целиком (ISO или папку XEX).',
    notIso: 'Это не образ диска Xbox 360',
    chosenFile: '{name} ({size})',
    chosenFolder: '{name}: файлов — {count} ({size})',
    noStreaming: 'это окно браузера не поддерживает потоковую загрузку. Используйте обычное (не приватное) окно.',
    downloadStarted: 'Загрузка началась ({size}). Не закрывайте эту страницу до её завершения.',
    finished: 'Готово за {seconds} с.',
    error: 'Ошибка: {message}',
    cancelled: 'загрузка отменена',
    unknown: 'Неизвестно',
    fanTranslation: '{language} (любительский перевод)',
    'region.usa': 'для США',
    'region.japan': 'для Японии',
    'language.english': 'Английский',
    'language.spanish': 'Испанский',
    'language.german': 'Немецкий',
    'language.italian': 'Итальянский',
    'language.russian': 'Русский',
    'language.japanese': 'Японский',
    'language.french': 'Французский',
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
    discUntested: '{edition}版のこのディスクはまだテストされていません。このフィンガープリントとディスク名をお送りください：',
    unsupported: 'この版にはまだ対応していません。このフィンガープリントと版の名前をお送りください：',
    notComplete: 'ゲームが揃っていません',
    incomplete: 'default.xex、Movies、NFSが見つかりません。ゲーム全体（ISOまたはXEXフォルダー）を選択してください。',
    notIso: 'Xbox 360のディスクイメージではありません',
    chosenFile: '{name}（{size}）',
    chosenFolder: '{name}：{count}個のファイル（{size}）',
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
    'language.english': '英語',
    'language.spanish': 'スペイン語',
    'language.german': 'ドイツ語',
    'language.italian': 'イタリア語',
    'language.russian': 'ロシア語',
    'language.japanese': '日本語',
    'language.french': 'フランス語',
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
const SIZE_UNITS = { ru: ['КБ', 'МБ', 'ГБ'] };

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
