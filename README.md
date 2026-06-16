# Portfolio

Portfolio personal de Oscar Rojas (`rx3card`). Hecho a mano con [Astro](https://astro.build).

### Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera ./dist
npm run preview  # previsualiza el build
```

### Estructura

```
src/
├── layouts/Layout.astro      # head, nav, footer, scroll-reveal
├── pages/index.astro         # ensambla las secciones
├── styles/global.css         # tokens de diseño, grano, frame
└── components/
    ├── Hero.astro            # whoami + nombre gigante + reloj COT
    ├── Marquee.astro         # cinta infinita de tecnologías
    ├── Projects.astro        # destacados + experimentos
    ├── About.astro           # bio + tarjeta "cfetch"
    └── Contact.astro         # email gigante + enlaces
```

Los proyectos se editan en el array `featured` / `experiments` de `src/components/Projects.astro`.

### CV en PDF

El botón "descargar cv" sirve `public/cv/oscar-rojas-cv.pdf`. Para regenerarlo tras editar los datos en `scripts/generate-cv.mjs`:

```bash
node scripts/generate-cv.mjs
```

### Foto de perfil

La foto del `cfetch` es `public/profile.jpg` (placeholder temporal) — reemplaza ese archivo con una foto cuadrada para actualizarla.

### Deploy

**Vercel:** [rx3card.vercel.com](https://rx3card.vercel.com)

