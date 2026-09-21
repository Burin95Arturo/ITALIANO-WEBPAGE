```javascript
/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage = "es";

const languageButtons = document.querySelectorAll(".language-button");


function updateLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    /*
        Cambiar todos los elementos que tengan
        data-es y data-it
    */

    document.querySelectorAll("[data-es][data-it]").forEach(element => {

        element.textContent = element.dataset[language];

    });


    /*
        Actualizar botones de idioma
    */

    languageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });


    /*
        Actualizar options del select
    */

    document.querySelectorAll("option[data-es][data-it]").forEach(option => {

        option.textContent = option.dataset[language];

    });

}


languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        updateLanguage(button.dataset.lang);

    });

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");


menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/*
    Cerrar menú cuando hacemos click
    en un enlace
*/

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =====================================================
   COURSE BUTTONS
===================================================== */

const courseButtons = document.querySelectorAll(".course-button");
const courseSelect = document.querySelector("#course");


courseButtons.forEach(button => {

    button.addEventListener("click", () => {

        const course = button.dataset.course;

        courseSelect.value = course;

        document.querySelector("#contacto").scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =====================================================
   FORM
===================================================== */

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    /*
        Por ahora solamente mostramos
        un mensaje.

        Más adelante reemplazaremos esto
        por el envío mediante Resend.
    */

    if (currentLanguage === "es") {

        formMessage.textContent =
            "Gracias por tu consulta. Te responderemos pronto.";

    } else {

        formMessage.textContent =
            "Grazie per la tua richiesta. Ti risponderemo presto.";

    }

    contactForm.reset();

});


/* =====================================================
   YEAR
===================================================== */

document.querySelector("#year").textContent =
    new Date().getFullYear();
```
