const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

// Variable global para el idioma actual y textos
let currentLanguage = 'es';
let currentTexts = null;

/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

/*===== Header =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    }
    else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/*===== Cambio de idioma =====*/
const changeLanguage = async language => {
    try {
        const requestJson = await fetch(`./data/${language}.json`);
        const texts = await requestJson.json();
        currentTexts = texts;
        currentLanguage = language;

        // Actualizar todos los textos con data-section y data-value
        updateAllTexts(texts);
        
        console.log(`Idioma cambiado a: ${language}`);
        
    } catch (error) {
        console.error('Error cambiando idioma:', error);
    }
}

// Función para actualizar TODOS los textos
function updateAllTexts(texts) {
    for(const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        if (texts[section] && texts[section][value]) {
            textToChange.innerHTML = texts[section][value];
        }
    }

    // Actualizar textos de proyectos dinámicos
    updateProjectsTexts(texts);
}

// Función para actualizar textos de proyectos
function updateProjectsTexts(texts) {
    const projectTitles = document.querySelectorAll('[data-section="proyectos"][data-value^="title-proyecto"]');
    const projectDescriptions = document.querySelectorAll('[data-section="proyectos"][data-value^="info-proyecto"]');
    
    projectTitles.forEach(title => {
        const value = title.dataset.value;
        if (texts.proyectos && texts.proyectos[value]) {
            title.innerHTML = texts.proyectos[value];
        }
    });
    
    projectDescriptions.forEach(desc => {
        const value = desc.dataset.value;
        if (texts.proyectos && texts.proyectos[value]) {
            desc.innerHTML = texts.proyectos[value];
        }
    });
}

// Función para forzar actualización de textos después de que los proyectos se carguen
function refreshTexts() {
    if (currentTexts) {
        updateAllTexts(currentTexts);
    }
}

flagsElement.addEventListener('click', (e) => {
    const language = e.target.parentElement.dataset.language;
    if (language) {
        changeLanguage(language);
    }
})

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        }
        else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*===== Clic derecho =====*/
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Cargar idioma por defecto al iniciar y sincronizar con proyectos
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar idioma primero
    await changeLanguage('es');
    
    // Esperar a que los proyectos se rendericen y luego actualizar textos
    setTimeout(() => {
        refreshTexts();
    }, 100);
});

// Hacer la función refreshTexts disponible globalmente
window.refreshTexts = refreshTexts;