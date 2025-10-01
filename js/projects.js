// projects.js - Sistema sincronizado con idiomas
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.currentLanguage = 'es';
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderProjects();

        // Notificar que los proyectos están listos para actualizar textos
        this.notifyProjectsReady();

        console.log('✅ ProjectsManager inicializado');
    }

    async loadProjects() {
        try {
            const response = await fetch('./data/projects.json');
            const data = await response.json();
            this.projects = data.proyectos;
        } catch (error) {
            console.error('Error cargando proyectos:', error);
            this.showError();
        }
    }

    renderProjects() {
        const container = document.getElementById('projects-container');

        if (!container) {
            console.error('No se encontró el contenedor de proyectos');
            return;
        }

        if (this.projects.length === 0) {
            container.innerHTML = '<p>No hay proyectos para mostrar</p>';
            return;
        }

        container.innerHTML = this.projects.map(project =>
            this.createProjectCard(project)
        ).join('');

        console.log(`✅ ${this.projects.length} proyectos renderizados`);
    }

    createProjectCard(project) {
        const hasDemoUrl = project.demoUrl && project.demoUrl !== '#' && project.demoUrl !== 'null';

        // SVG del icono de enlace
        const linkIcon = `
        <div class="hover-icon">
            <svg viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
            </svg>
        </div>
    `;

        // Generar etiquetas de tecnologías
        const techTags = project.technologies ? project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('') : '';

        if (hasDemoUrl) {
            return `
            <a href="${project.demoUrl}" target="_blank" class="card-link">
                <div class="cards--proyectos" data-aos="fade-up">
                    <div class="container_imgCard--proyectos">
                        <img src="${project.imagen}" alt="${project.data_value_title}">
                        ${linkIcon}
                    </div>
                    
                    <div class="container_textCard--proyectos">
                        <h2 data-section="proyectos" data-value="${project.data_value_title}"></h2>
                        <p data-section="proyectos" data-value="${project.data_value_info}"></p>
                        ${techTags ? `<div class="tech-tags">${techTags}</div>` : ''}
                    </div>
                </div>
            </a>
        `;
        } else {
            return `
            <div class="cards--proyectos" data-aos="fade-up">
                <div class="container_imgCard--proyectos">
                    <img src="${project.imagen}" alt="${project.data_value_title}">
                </div>
                
                <div class="container_textCard--proyectos">
                    <h2 data-section="proyectos" data-value="${project.data_value_title}"></h2>
                    <p data-section="proyectos" data-value="${project.data_value_info}"></p>
                    ${techTags ? `<div class="tech-tags">${techTags}</div>` : ''}
                </div>
            </div>
        `;
        }
    }

    notifyProjectsReady() {
        // Disparar evento personalizado cuando los proyectos están listos
        const event = new CustomEvent('projectsReady');
        document.dispatchEvent(event);

        // También llamar a refreshTexts si está disponible
        if (typeof window.refreshTexts === 'function') {
            setTimeout(() => {
                window.refreshTexts();
            }, 50);
        }
    }

    showError() {
        const container = document.getElementById('projects-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <p>Error al cargar los proyectos.</p>
                </div>
            `;
        }
    }
}

// Inicialización con sincronización
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});

// Escuchar cuando los proyectos estén listos para actualizar textos
document.addEventListener('projectsReady', () => {
    if (typeof window.refreshTexts === 'function') {
        window.refreshTexts();
    }
});