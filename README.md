# Documentación Técnica — Portafolio Web 

Este documento describe la estructura, arquitectura y funcionamiento técnico del proyecto **Portafolio Web**, desarrollado como una aplicación web de presentación profesional.  

El sistema está implementado con tecnologías web estándar (HTML5, CSS3 y JavaScript ES6+) y una arquitectura modular orientada a la mantenibilidad y escalabilidad.

---

## 1. Descripción General

El proyecto corresponde a un portafolio profesional diseñado como una aplicación de página única (SPA).  
El contenido se gestiona de forma dinámica mediante archivos JSON, permitiendo internacionalización, actualización ágil y separación clara entre contenido, lógica y presentación.

**Características principales:**  
- Estructura modular y organizada.  
- Soporte multilenguaje (Español e Inglés).  
- Diseño adaptable a escritorio, tablet y dispositivos móviles.  
- Carga de datos dinámica desde archivos JSON.  
- Rendimiento optimizado con recursos WebP y tipografía local.  

---

## 2. Estructura del Proyecto

```
|   index.html
|   README.md
|   
+---.vscode
|       settings.json
|       
+---assets
|   +---fonts
|   |       CooperHewitt-Light.woff
|   |       CooperHewitt-Thin.woff
|   |       
|   +---img
|   |   |   icon-demoProyecto.webp
|   |   |   icon-en.webp
|   |   |   icon-github.webp
|   |   |   icon-instagram.webp
|   |   |   icon-linkedin.webp
|   |   |   icon-spain.webp
|   |   |   logo.webp
|   |   |   programing-text.gif
|   |   |   programing.gif
|   |   +---company
|   |   +---projects
|   |   \---skills
|   \---stylesheet
|           desktop.css
|           index.css
|           loader.css
|           tablet.css
|
+---data
|       en.json
|       es.json
|       projects.json
|
\---js
        main.js
        projects.js
```

---

## 3. Tecnologías Utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| **HTML5** | Define la estructura y semántica del sitio. |
| **CSS3** | Implementa el diseño visual y las reglas de estilo responsivo. |
| **JavaScript (ES6+)** | Gestiona la lógica, la interacción y la carga dinámica del contenido. |
| **JSON** | Contenedor de datos estructurados para texto y proyectos. |
| **WebP / SVG** | Formatos optimizados para imágenes y gráficos. |
| **VS Code** | Entorno de desarrollo utilizado. |

---

## 4. Arquitectura del Sistema

La aplicación sigue una arquitectura modular basada en separación de responsabilidades:

```
HTML (Estructura base)
 ├── CSS (Diseño y presentación)
 │    ├── index.css
 │    ├── desktop.css
 │    ├── tablet.css
 │    └── loader.css
 ├── JS (Lógica y comportamiento)
 │    ├── main.js
 │    └── projects.js
 ├── DATA (Contenido dinámico)
 │    ├── es.json
 │    ├── en.json
 │    └── projects.json
 └── ASSETS (Recursos visuales y tipografía)
```

**main.js** controla la inicialización, la carga de idioma, las animaciones y los eventos globales.  
**projects.js** administra el renderizado dinámico de los proyectos utilizando los datos en `projects.json`.

---

## 5. Flujo de Ejecución

1. **Inicialización**
   - Se carga `index.html` junto con las hojas de estilo principales.
   - Al completarse el evento `DOMContentLoaded`, se ejecuta `main.js`.
2. **Configuración del idioma**
   - Se determina el idioma inicial (por defecto: español).
   - Se cargan los textos desde `es.json` o `en.json` según corresponda.
3. **Renderizado de contenido**
   - `projects.js` lee `projects.json` y construye los elementos visuales del portafolio.
4. **Interacción del usuario**
   - El sistema gestiona eventos como cambio de idioma, navegación y visualización de secciones.
5. **Adaptabilidad**
   - Los archivos CSS específicos definen estilos para distintos tamaños de pantalla, garantizando compatibilidad responsive.

---

## 6. Documentación Técnica por Archivo

### 6.1. index.html
Define la estructura principal del sitio.  
Incluye los contenedores de las secciones y las referencias a las hojas de estilo y scripts externos.

### 6.2. main.js
Archivo principal del sistema. Gestiona la carga inicial, la configuración de idioma, las animaciones y los eventos globales.  
Controla la interacción entre el contenido dinámico y los elementos del DOM.

### 6.3. projects.js
Encargado del renderizado dinámico de los proyectos.  
Obtiene los datos desde `projects.json` y genera los elementos HTML correspondientes.

### 6.4. Archivos CSS
- **index.css:** estilos base y variables globales.  
- **desktop.css:** reglas de diseño para pantallas grandes.  
- **tablet.css:** ajustes para pantallas medianas.  
- **loader.css:** estilos y animaciones de carga inicial.

### 6.5. Archivos JSON
- **es.json / en.json:** textos traducidos de la interfaz.  
- **projects.json:** lista de proyectos con sus propiedades (nombre, descripción, imagen y URL).

---

## 7. Mantenimiento y Extensibilidad

**Agregar un nuevo proyecto:**  
1. Incluir la imagen del proyecto en `assets/img/projects/`.  
2. Editar `data/projects.json` agregando una nueva entrada con el formato:

```json
{
  "name": "Nuevo Proyecto",
  "description": "Descripción breve del proyecto",
  "image": "assets/img/projects/nuevo.webp",
  "url": "https://miproyecto.com"
}
```

El sistema detectará automáticamente la nueva entrada y la mostrará en la interfaz.  

**Agregar un nuevo idioma:**  
1. Crear un archivo JSON con el nombre del idioma (por ejemplo, `fr.json`).  
2. Agregar el nuevo idioma en la lógica de carga de `main.js`.  

---

## 8. Autor

**Emanuel López**  
Desarrollador Web — Full Stack Developer
[Portafolio profesional](https://emadev.neuradevsoftware.com)  
[emanuel.arango1226@gmail.com](mailto:contacto@neuradevsoftware.com)

---

© 2025. Este documento forma parte de la documentación técnica del proyecto Portafolio Web.  
Su contenido puede ser reproducido con atribución al autor.
