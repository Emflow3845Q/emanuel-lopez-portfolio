# Web Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-Structure-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Design-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![JSON](https://img.shields.io/badge/JSON-Dynamic%20Data-000000?logo=json&logoColor=white)](https://www.json.org/)
[![License](https://img.shields.io/badge/License-Attribution-green.svg)]()

> Professional single-page application (SPA) for a modern online presence, developed with **maintainability**, **modularity**, and **scalability** in mind.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [File Reference](#file-reference)
- [Execution Flow](#execution-flow)
- [Maintenance](#maintenance)
- [Author](#author)
- [License](#license)

---

## Overview

**Web Portfolio** is a modular SPA designed as a professional digital portfolio.  
It offers dynamic and internationalized content management with a responsive interface for desktop, tablet, and mobile devices.

---

## Features

- Modular and organized file structure  
- Multi-language support (Spanish & English)  
- Responsive design for all device sizes  
- Dynamic content loading from JSON files  
- Performance optimized (WebP images, local fonts)

---

## Architecture

```
HTML (Base structure)
 ├── CSS (Design and presentation)
 │    ├── index.css
 │    ├── desktop.css
 │    ├── tablet.css
 │    └── loader.css
 ├── JS (Logic and behavior)
 │    ├── main.js
 │    └── projects.js
 ├── DATA (Dynamic content)
 │    ├── es.json
 │    ├── en.json
 │    └── projects.json
 └── ASSETS (Fonts and images)
```

- **main.js**: Initialization, language loading, animations, and global events  
- **projects.js**: Dynamic rendering of projects from `projects.json`

---

## Technology Stack

| Technology          | Purpose                                            |
|---------------------|----------------------------------------------------|
| **HTML5**           | Structure and semantics                            |
| **CSS3**            | Visual and responsive design                       |
| **JavaScript (ES6+)** | Logic and dynamic loading                        |
| **JSON**            | Structured storage for texts and projects          |
| **WebP / SVG**      | Optimized images and graphics                      |
| **VS Code**         | Development environment                            |

---

## Project Structure

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

## File Reference

### index.html
Defines main site structure and includes all core sections, stylesheets, and scripts.

### main.js
Handles initial loading, language configuration, dynamic text loading, animations, and global application events.

### projects.js
Dynamically loads and renders project cards using data from `projects.json`.

### CSS Files
- **index.css:** Base styles and variables  
- **desktop.css:** Styles for wide screens  
- **tablet.css:** Styles for tablets & medium devices  
- **loader.css:** Loading animations  

### JSON Files
- **es.json / en.json:** Translated user interface texts  
- **projects.json:** List of portfolio projects (name, description, image, URL)

---

## Execution Flow

1. **Initialization:**  
   Loads `index.html` and main CSS, then runs `main.js` after the DOMContentLoaded event.

2. **Language Setup:**  
   Default language is Spanish. Loads the appropriate localization file (`es.json` or `en.json`) and updates interface texts.

3. **Content Rendering:**  
   `projects.js` loads and displays portfolio projects dynamically as cards.

4. **User Interaction:**  
   Handles language switching, navigation, and section display.

5. **Responsiveness:**  
   Viewport-adaptive CSS for full compatibility.

---

## Maintenance

### Add a New Project

1. Add the corresponding project image to `assets/img/projects/`
2. Edit `data/projects.json` and insert a new project object:

```
{
  "name": "New Project",
  "description": "Short project description",
  "image": "assets/img/projects/new.webp",
  "url": "https://myproject.com"
}
```
New projects are detected and shown automatically.

### Add a New Language

1. Create a corresponding JSON translation file (e.g., `fr.json`) in `/data`.  
2. Add logic/option in `main.js` for language selection.

---

## Author

**Emanuel López**  
Full Stack Developer  
[Professional Portfolio](https://emadev.neuradevsoftware.com)  
[contacto@neuradevsoftware.com](mailto:contacto@neuradevsoftware.com)

---

## License

© 2025. This document is part of the Web Portfolio technical documentation.  
Reproduction is permitted with author attribution.
