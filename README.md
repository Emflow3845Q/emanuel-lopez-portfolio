# Portfolio Premium — Emanuel López
### Full Stack Developer · 2026

Un portfolio digital premium diseñado con estética dark mode sofisticada, animaciones cinematográficas y experiencia visual de nivel agencia creativa.

---

## 🚀 Cómo usar

### Opción A — Abrir directo (recomendado para preview rápido)
```
Simplemente abre index.html en cualquier navegador moderno.
```

> ⚠️ Algunas fuentes de Google Fonts requieren conexión a internet. Si ves fuentes genéricas sin internet, es normal.

### Opción B — Servidor local (recomendado para producción)
```bash
# Con Python
python3 -m http.server 3000

# Con Node.js
npx serve .

# Con VS Code
Instala "Live Server" y haz clic en "Go Live"
```
Luego abre: `http://localhost:3000`

---

## 📁 Estructura del proyecto

```
portfolio-premium/
├── index.html              # Página principal
├── css/
│   └── main.css            # Sistema de diseño completo
├── js/
│   └── main.js             # Lógica, animaciones e interacciones
├── assets/
│   ├── img/
│   │   ├── projects/       # Imágenes de proyectos
│   │   ├── skills/         # Íconos de habilidades
│   │   └── company/        # Logos de empresas
│   └── fonts/              # Fuentes locales (Cooper Hewitt)
└── README.md
```

---

## ✨ Características

| Feature | Detalle |
|---|---|
| **Dark Mode** | Paleta oscura sofisticada (#080808) con acento verde lima |
| **Cursor personalizado** | Cursor seguidor con efecto blend-mode |
| **Loader cinematográfico** | Animación de carga con barra de progreso |
| **Hero animado** | Texto animado con stagger reveal |
| **Marquee** | Banda de tecnologías con animación continua |
| **Filtro de proyectos** | Full Stack / Frontend / CMS con transición |
| **Reveal on scroll** | IntersectionObserver para revelar elementos |
| **Barra de progreso** | Indicador de scroll en la parte superior |
| **Formulario de contacto** | Con validación y feedback visual |
| **Responsive premium** | Mobile-first con menú hamburger animado |
| **Performance** | Lazy loading de imágenes, sin dependencias pesadas |

---

## 🎨 Sistema de diseño

### Paleta de colores
```css
--c-bg:      #080808  /* Fondo principal */
--c-accent:  #c8ff6e  /* Verde lima — color principal */
--c-text:    #f0ede8  /* Texto principal */
--c-text-2:  #888580  /* Texto secundario */
```

### Tipografía
- **Display**: Syne (Google Fonts) — Headings, bold
- **Body**: DM Sans (Google Fonts) — Texto, UI

---

## 🛠 Personalización

### Cambiar información personal
Edita las constantes en `js/main.js`:

```javascript
const PROJECTS = [ ... ]   // Tus proyectos
const SKILLS   = [ ... ]   // Tus habilidades
const EXPERIENCE = [ ... ] // Tu experiencia laboral
```

### Cambiar colores
Edita las CSS variables en `css/main.css`:
```css
:root {
  --c-accent: #c8ff6e;  /* Cambia el color de acento */
}
```

### Agregar tu foto
Reemplaza el bloque `.about-avatar-inner` en `index.html` con:
```html
<img src="./assets/img/tu-foto.jpg" alt="Emanuel López" style="width:100%;height:100%;object-fit:cover;">
```

---

## 📬 Contacto configurado

El formulario está configurado para abrir el cliente de email. Para formulario funcional sin backend, considera:
- **Formspree** (gratuito): `action="https://formspree.io/f/TU_ID"`
- **EmailJS**: Integración JavaScript directa
- **Netlify Forms**: Si despliegas en Netlify

---

## 🌐 Deploy

### Vercel (recomendado)
```bash
npx vercel --prod
```

### Netlify
Arrastra la carpeta a netlify.com/drop

### GitHub Pages
Sube el repositorio y activa Pages desde Settings

---

Diseñado y desarrollado con 💚 | Medellín, Colombia · 2026
