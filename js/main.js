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
let scrollPosition = 0;

btn.addEventListener('click', function () {
    toggleMenu();
});

// Función para abrir/cerrar menú
function toggleMenu() {
    const isMenuOpen = btn.classList.contains('active');

    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Función para abrir menú
function openMenu() {
    btn.classList.add('active');
    btn.classList.remove('not-active');
    document.querySelector('.nav_menu').classList.remove('not-active');
    document.querySelector('.nav_menu').classList.add('active');

    // Deshabilitar scroll y guardar posición
    scrollPosition = window.pageYOffset;
    document.body.classList.add('no-scroll');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

// Función para cerrar menú
function closeMenu() {
    btn.classList.remove('active');
    btn.classList.add('not-active');
    document.querySelector('.nav_menu').classList.remove('active');
    document.querySelector('.nav_menu').classList.add('not-active');

    // Habilitar scroll y restaurar posición
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

// Cerrar menú al hacer clic en enlaces del menú
document.querySelectorAll('.nav_menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Solo cerrar si el menú está abierto (en móvil)
        if (window.innerWidth <= 980 && btn.classList.contains('active')) {
            closeMenu();
        }

        // Scroll suave a la sección
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; 

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Cerrar menú al redimensionar la ventana (si se cambia a desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && btn.classList.contains('active')) {
        closeMenu();
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

    } catch (error) {
        console.error('Error cambiando idioma:', error);
    }
}

// Función para actualizar TODOS los textos
function updateAllTexts(texts) {
    for (const textToChange of textsToChange) {
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
window.onscroll = function () {
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

/*===== Manejo del Formulario Netlify =====*/
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const btnEnviar = document.getElementById('btn-enviar');
    
    if (form) {
        // Manejar el envío del formulario
        form.addEventListener('submit', function(e) {
            // Cambiar texto del botón durante el envío
            if (btnEnviar) {
                const originalText = btnEnviar.textContent;
                btnEnviar.textContent = 'Enviando...';
                btnEnviar.disabled = true;
                btnEnviar.style.opacity = '0.7';
                
                // Restaurar después de 10 segundos (por si hay error)
                setTimeout(() => {
                    btnEnviar.textContent = originalText;
                    btnEnviar.disabled = false;
                    btnEnviar.style.opacity = '1';
                }, 10000);
            }
        });
        
        // Manejar éxito del formulario (Netlify redirige automáticamente)
        form.addEventListener('netlifyFormsSuccess', function() {
            if (btnEnviar) {
                btnEnviar.textContent = '¡Mensaje Enviado!';
                btnEnviar.style.backgroundColor = '#4CAF50';
                btnEnviar.disabled = true;
                
                // Limpiar formulario
                form.reset();
                
                setTimeout(() => {
                    btnEnviar.textContent = 'Enviar mensaje';
                    btnEnviar.style.backgroundColor = '';
                    btnEnviar.disabled = false;
                }, 3000);
            }
        });
        
        // Manejar error del formulario
        form.addEventListener('netlifyFormsError', function() {
            if (btnEnviar) {
                btnEnviar.textContent = 'Error al enviar';
                btnEnviar.style.backgroundColor = '#f44336';
                
                setTimeout(() => {
                    btnEnviar.textContent = 'Enviar mensaje';
                    btnEnviar.style.backgroundColor = '';
                    btnEnviar.disabled = false;
                }, 3000);
            }
        });
    }
});

/*===== Clic derecho =====*/
document.addEventListener('contextmenu', function (e) {
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