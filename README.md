# Web Portfolio - Technical Documentation

This document describes the structure, modular architecture, and internal functioning of the **Web Portfolio** project, developed as a professional presentation single-page application (SPA).

The system is implemented with standard web technologies (HTML5, CSS3, JavaScript ES6+) and a modular structure oriented towards maintainability and scalability.

***

## 1. General Overview

This project is a professional portfolio structured as an SPA.  
Content is dynamically managed through JSON files, allowing for internationalization, rapid updating, and clear separation between content, logic, and presentation.

**Core Features:**  
- Modular, organized structure  
- Multi-language support (Spanish and English)  
- Responsive design for desktop, tablet, and mobile  
- Dynamic data loading from JSON files  
- Performance optimization using WebP resources and local fonts

***

## 2. Project Structure

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

***

## 3. Technologies Used

| Technology   | Description                                      |
|--------------|--------------------------------------------------|
| **HTML5**    | Defines the website structure and semantics       |
| **CSS3**     | Visual design and responsive style rules          |
| **JavaScript (ES6+)** | Logic, interaction, and dynamic loading  |
| **JSON**     | Structured content for texts and projects         |
| **WebP / SVG** | Optimized images and graphics                   |
| **VS Code**  | Development environment                           |

***

## 4. System Architecture

The application uses a modular architecture with clear separation of responsibilities:

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
 └── ASSETS (Visuals and typography)
```

- **main.js:** Manages initialization, language loading, animations, and global events
- **projects.js:** Handles dynamic rendering of projects using `projects.json`

***

## 5. Execution Flow

1. **Initialization**
   - Loads `index.html` and core stylesheets.
   - Upon `DOMContentLoaded`, runs `main.js`.
2. **Language Setup**
   - Determines initial language (default: Spanish).
   - Loads texts from `es.json` or `en.json` as needed.
3. **Content Rendering**
   - `projects.js` reads `projects.json` and generates visual portfolio elements.
4. **User Interaction**
   - Handles events such as language change, navigation, and section viewing.
5. **Responsiveness**
   - Device-specific CSS ensures responsive display on all screen sizes.

***

## 6. Technical Reference Per File

### 6.1. index.html
Defines the site's main structure and includes section containers as well as stylesheet and script references.

### 6.2. main.js
Main system file. Handles initial loading, language setup, animations, and global events.  
Connects dynamic content and DOM elements.

### 6.3. projects.js
Manages dynamic rendering of projects.  
Loads from `projects.json` and generates corresponding HTML elements.

### 6.4. CSS Files
- **index.css:** Base styles and global variables  
- **desktop.css:** Styles for large screens  
- **tablet.css:** Styles for mid-sized screens  
- **loader.css:** Loading styles and animations

### 6.5. JSON Files
- **es.json / en.json:** UI translated texts  
- **projects.json:** List of projects (name, description, image, URL)

***

## 7. Maintenance and Extensibility

**Add a new project:**  
1. Add project image in `assets/img/projects/`  
2. Edit `data/projects.json` and add a new entry:

```json
{
  "name": "New Project",
  "description": "Brief project description",
  "image": "assets/img/projects/new.webp",
  "url": "https://myproject.com"
}
```

System automatically displays it in the interface.

**Add a new language:**  
1. Create a JSON file (for example, `fr.json`)  
2. Add the new language in the `main.js` loading logic

***

## 8. Author

**Emanuel López**  
Web Developer — Full Stack Developer  
[Professional portfolio](https://emadev.neuradevsoftware.com)  
[emanuel.arango1226@gmail.com](mailto:emanuel.arango1226@gmail.com)

***

© 2025. This document is part of the Web Portfolio technical documentation.  
May be reproduced with attribution to the author.