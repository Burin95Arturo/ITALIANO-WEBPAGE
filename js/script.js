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


contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    /*
        Deshabilitamos el botón mientras se envía
        para evitar múltiples envíos.
    */

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;


    /*
        Mensaje temporal mientras se procesa
        la consulta.
    */

    if (currentLanguage === "es") {

        formMessage.textContent =
            "Enviando tu consulta...";

    } else {

        formMessage.textContent =
            "Invio della richiesta...";

    }


    try {

        /*
            Tomamos todos los datos del formulario.
        */

        const formData = new FormData(contactForm);


        /*
            Enviamos los datos a nuestra
            Cloudflare Function.
        */

        const response = await fetch("/api/submit", {

            method: "POST",

            body: formData

        });


        /*
            Convertimos la respuesta a JSON.
        */

        const result = await response.json();


        /*
            Si Cloudflare + Resend respondieron
            correctamente.
        */

        if (response.ok && result.success) {

            if (currentLanguage === "es") {

                formMessage.textContent =
                    "¡Gracias por tu consulta! Te responderemos pronto.";

            } else {

                formMessage.textContent =
                    "Grazie per la tua richiesta! Ti risponderemo presto.";

            }

            contactForm.reset();


        } else {

            /*
                El servidor respondió pero
                hubo un problema con el envío.
            */

            if (currentLanguage === "es") {

                formMessage.textContent =
                    "No pudimos enviar tu consulta. Intentá nuevamente.";

            } else {

                formMessage.textContent =
                    "Non è stato possibile inviare la richiesta. Riprova.";

            }

        }


    } catch (error) {

        /*
            Error de conexión o de la Function.
        */

        console.error("Error enviando formulario:", error);


        if (currentLanguage === "es") {

            formMessage.textContent =
                "Ocurrió un error. Intentá nuevamente.";

        } else {

            formMessage.textContent =
                "Si è verificato un errore. Riprova.";

        }

    }


    /*
        Volvemos a habilitar el botón.
    */

    submitButton.disabled = false;

});


/* =====================================================
   YEAR
===================================================== */

document.querySelector("#year").textContent =
    new Date().getFullYear();
