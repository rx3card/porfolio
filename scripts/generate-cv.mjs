// // Genera public/cv/oscar-rojas-cv.pdf — ejecutar con: node scripts/generate-cv.mjs
// // Diseño editorial minimalista en dos columnas, con iconos de línea. Comparte el
// // ADN del sitio (nombre grande con punto de acento, oliva, tipografía limpia)
// // sin caer en el disfraz de terminal.
// import { createRequire } from 'node:module';
// import fs from 'node:fs';
// import path from 'node:path';

// const require = createRequire(import.meta.url);
// const pdfmake = require('pdfmake');
// const helvetica = require('pdfmake/build/standard-fonts/Helvetica.js');
// const courier = require('pdfmake/build/standard-fonts/Courier.js');

// for (const pack of [helvetica, courier]) {
//   for (const [name, file] of Object.entries(pack.vfs)) {
//     pdfmake.virtualfs.writeFileSync(name, file.data, file.encoding);
//   }
// }
// pdfmake.setFonts({ ...helvetica.fonts, ...courier.fonts });
// const standardFonts = new Set(
//   [...Object.values(helvetica.fonts), ...Object.values(courier.fonts)].flatMap(
//     (f) => Object.values(f)
//   )
// );
// pdfmake.setUrlAccessPolicy(() => false);
// pdfmake.setLocalAccessPolicy((p) => standardFonts.has(p));

// // Paleta calcada del sitio en modo claro
// const INK = '#0a0a09';
// const ACCENT = '#55700b'; // oliva — accent en tema claro
// const MUTED = '#5f5f5f';
// const LINE = '#e2e2df';
// const FAINT = '#9a9a9a';

// const PAGE_W = 612; // LETTER
// const MARGIN_X = 50;
// const CONTENT_W = PAGE_W - MARGIN_X * 2; // 512
// const GAP = 26;
// const COL_L = 168;
// const COL_R = CONTENT_W - COL_L - GAP; // 318

// // ---------- iconos de línea (monocromos, oliva) ----------
// const S = (body) =>
//   `<svg viewBox="0 0 24 24" fill="none" stroke="${ACCENT}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
// const ICON = {
//   pin: S('<path d="M12 21c4-4.5 7-8 7-11a7 7 0 1 0-14 0c0 3 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
//   mail: S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'),
//   phone: S('<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L17 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z"/>'),
//   globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>'),
//   code: S('<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="M13 6l-2 12"/>'),
//   window: S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>'),
//   database: S('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.6 3.1 3 7 3s7-1.4 7-3V6"/><path d="M5 12c0 1.6 3.1 3 7 3s7-1.4 7-3"/>'),
//   terminal: S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/>'),
//   cap: S('<path d="m12 4 10 5-10 5L2 9l10-5z"/><path d="M6 11v5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-5"/>'),
// };
// const icon = (name, size = 9) => ({ svg: ICON[name], width: size, height: size });

// // ---------- helpers ----------
// const rule = (w, lineWidth = 0.8, lineColor = LINE, margin = [0, 0, 0, 0]) => ({
//   canvas: [{ type: 'line', x1: 0, y1: 0, x2: w, y2: 0, lineWidth, lineColor }],
//   margin,
// });

// // encabezado de sección dentro de columna
// const head = (title, width, top = 13) => ({
//   stack: [
//     { text: title.toUpperCase(), bold: true, fontSize: 9, color: ACCENT, characterSpacing: 1.3 },
//     rule(width, 0.8, LINE, [0, 3, 0, 0]),
//   ],
//   margin: [0, top, 0, 7],
// });

// const contactRow = (name, text, color = INK) => ({
//   columns: [
//     { width: 13, ...icon(name, 9), margin: [0, 1.5, 0, 0] },
//     { width: '*', text, fontSize: 8.5, color, lineHeight: 1.25 },
//   ],
//   margin: [0, 0, 0, 5.5],
// });

// const stackGroup = (name, label, value) => ({
//   stack: [
//     {
//       columns: [
//         { width: 13, ...icon(name, 9), margin: [0, 1, 0, 0] },
//         { width: '*', text: label, bold: true, fontSize: 8.5, color: INK },
//       ],
//     },
//     { text: value, fontSize: 8.5, color: MUTED, lineHeight: 1.32, margin: [13, 1.5, 0, 0] },
//   ],
//   margin: [0, 0, 0, 7],
// });

// const eduItem = (title, place, dates) => ({
//   stack: [
//     { text: title, bold: true, fontSize: 8.8, lineHeight: 1.2 },
//     { text: place, fontSize: 8, color: MUTED, margin: [0, 1, 0, 0], lineHeight: 1.2 },
//     { text: dates, fontSize: 7.5, color: ACCENT, margin: [0, 1.5, 0, 0] },
//   ],
//   margin: [0, 0, 0, 8],
// });

// const bullet = (text) => ({
//   columns: [
//     { width: 11, text: '—', color: ACCENT, fontSize: 9, margin: [0, 0.5, 0, 0] },
//     { width: '*', text, fontSize: 9, color: INK, lineHeight: 1.32 },
//   ],
//   margin: [0, 3, 0, 0],
// });

// const entry = (title, place, meta, tag) => ({
//   stack: [
//     {
//       columns: [
//         { width: '*', text: title, bold: true, fontSize: 10.5, characterSpacing: 0.2 },
//         tag
//           ? { text: tag, alignment: 'right', fontSize: 7, bold: true, color: ACCENT, characterSpacing: 0.6, margin: [0, 2, 0, 0] }
//           : { text: '' },
//       ],
//     },
//     {
//       columns: [
//         { width: '*', text: place, fontSize: 8.5, color: MUTED, margin: [0, 1.5, 0, 0] },
//         meta
//           ? { text: meta, alignment: 'right', fontSize: 8, color: FAINT, margin: [0, 1.5, 0, 0] }
//           : { text: '' },
//       ],
//     },
//   ],
//   margin: [0, 9, 0, 0],
// });

// // ---------- columnas ----------
// const leftColumn = {
//   width: COL_L,
//   stack: [
//     head('Contacto', COL_L, 0),
//     contactRow('pin', 'Ibagué, Tolima — Colombia'),
//     contactRow('mail', 'rx3card@gmail.com'),
//     contactRow('phone', '+57 300 386 4339'),
//     contactRow('globe', 'oscarroj.as'),
//     contactRow('code', 'github.com/rx3card'),

//     head('Stack', COL_L),
//     stackGroup('code', 'Lenguajes', 'C · Python · TypeScript · JavaScript · Bash'),
//     stackGroup('window', 'Frontend', 'React · Next.js · Astro · Tailwind · HTML5 · CSS3'),
//     stackGroup('database', 'Backend & datos', 'Node.js · SQLite · Supabase · Socket.IO · OpenAI · WhatsApp API'),
//     stackGroup('terminal', 'Sistema & tooling', 'Linux · Git · Vim · dwm · PM2 · Vercel · PowerShell'),

//     head('Formación', COL_L),
//     eduItem('Tecnólogo en Análisis y Desarrollo de Software', 'SENA — Regional Tolima', 'en curso'),
//     eduItem('Técnico en Programación de Software', 'SENA · F.T. Guzmán, Espinal', '2024 — 2025'),
//     eduItem('Bachiller Técnico en Sistemas', 'I.E. Técnica Félix Tiberio Guzmán', '2025'),

//     head('Idiomas', COL_L),
//     { text: 'Español — nativo', fontSize: 8.5, color: INK, margin: [0, 0, 0, 2] },
//     { text: 'Inglés — técnico / lectura', fontSize: 8.5, color: INK },
//   ],
// };

// const rightColumn = {
//   width: COL_R,
//   stack: [
//     head('Perfil', COL_R, 0),
//     {
//       text:
//         'Programador full stack con interés genuino en entender cómo funcionan las cosas por detrás. Me muevo entre desarrollo web, automatización y herramientas de sistema según lo que pida cada proyecto, con un enfoque práctico y foco en las personas que van a usar el software. Tecnólogo en Análisis y Desarrollo de Software (SENA) y autodidacta, con el aprendizaje constante como forma de trabajo.',
//       fontSize: 9,
//       color: INK,
//       lineHeight: 1.38,
//     },

//     head('Experiencia', COL_R),
//     entry(
//       'Desarrollador Full Stack',
//       'Ricardo Serrano y Cía Ltda · agencia de seguros',
//       '2025 — presente',
//       'EN PRODUCCIÓN'
//     ),
//     bullet('Diseñé y desarrollé la plataforma integral de la agencia —sitio público y panel administrativo—, en operación diaria desde hace más de seis meses.'),
//     bullet('CRM completo: asegurados, pólizas, vencimientos, comisiones, cartera e informes contables exportables.'),
//     bullet('Bot de WhatsApp Business API (Meta) y asistente BI conversacional con OpenAI que responde sobre datos reales del negocio en lenguaje natural.'),
//     bullet('Chat interno en tiempo (Socket.IO), correos programados y operación en producción. Next.js 16, React 19, TypeScript, SQLite, Node.js, PM2.'),

//     head('Proyectos', COL_R),
//     entry('cfetch', 'Herramienta de sistema en C puro', 'github.com/rx3card/cfetch'),
//     bullet('Alternativa a neofetch: ~3 ms de ejecución frente a ~220 ms, cero dependencias, multiplataforma (Linux, Windows, macOS) e instaladores propios.'),
//     entry('Test Daltonismo', 'Aplicación web de salud visual', 'test-daltonismo.vercel.app'),
//     bullet('Test de Ishihara interactivo: prueba diagnóstica, modo entrenamiento e información educativa sobre el test original.'),
//     entry('dwm — build personal', 'Window manager de suckless en C', 'github.com/rx3card/dwm'),
//     bullet('Configuración diaria parchada a mano: atajos personalizados y barra de estado propia.'),
//   ],
// };

// // ---------- documento ----------
// const docDefinition = {
//   pageSize: 'LETTER',
//   pageMargins: [MARGIN_X, 46, MARGIN_X, 42],
//   defaultStyle: { font: 'Helvetica', fontSize: 9, color: INK },

//   footer: () => ({
//     columns: [
//       {
//         text: 'oscarroj.as  ·  github.com/rx3card  ·  Ibagué, Colombia',
//         fontSize: 7.5,
//         color: FAINT,
//         margin: [MARGIN_X, 0, 0, 0],
//       },
//       {
//         text: 'Disponible para trabajar',
//         fontSize: 7.5,
//         color: ACCENT,
//         alignment: 'right',
//         margin: [0, 0, MARGIN_X, 0],
//       },
//     ],
//   }),

//   content: [
//     // ============ ENCABEZADO ============
//     {
//       text: [{ text: 'OSCAR ROJAS' }, { text: '.', color: ACCENT }],
//       fontSize: 36,
//       bold: true,
//       characterSpacing: -0.8,
//       lineHeight: 0.95,
//     },
//     {
//       columns: [
//         {
//           width: '*',
//           text: 'Programador Full Stack  ·  Tecnólogo en Análisis y Desarrollo de Software',
//           fontSize: 10.5,
//           color: MUTED,
//           margin: [0, 6, 0, 0],
//         },
//         {
//           width: 'auto',
//           text: 'Oscar Duván Rojas Rico',
//           fontSize: 8,
//           color: FAINT,
//           alignment: 'right',
//           margin: [0, 9, 0, 0],
//         },
//       ],
//     },
//     rule(CONTENT_W, 1, INK, [0, 12, 0, 16]),

//     // ============ DOS COLUMNAS ============
//     {
//       columns: [leftColumn, rightColumn],
//       columnGap: GAP,
//     },
//   ],
// };

// const outDir = path.resolve('public', 'cv');
// fs.mkdirSync(outDir, { recursive: true });
// const outPath = path.join(outDir, 'oscar-rojas-cv.pdf');
// await pdfmake.createPdf(docDefinition).write(outPath);
// console.log(`CV generado: ${outPath}`);
