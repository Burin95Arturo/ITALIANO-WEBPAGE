/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage = "es";

const languageButtons = document.querySelectorAll(".language-button");


function updateLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-es][data-it]").forEach(element => {

        element.textContent = element.dataset[language];

    });

    languageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.language === language
        );

    });

    document.querySelectorAll("option[data-es][data-it]").forEach(option => {

        option.textContent = option.dataset[language];

    });

}


languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        updateLanguage(button.dataset.language);

    });

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");


if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}


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

        if (courseSelect) {

            courseSelect.value = course;

        }

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


if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }


        if (currentLanguage === "es") {

            formMessage.textContent =
                "Enviando tu consulta...";

        } else {

            formMessage.textContent =
                "Invio della richiesta...";

        }


        try {

            const formData = new FormData(contactForm);

            const response = await fetch("/api/submit", {

                method: "POST",

                body: formData

            });


            const result = await response.json();


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

                if (currentLanguage === "es") {

                    formMessage.textContent =
                        "No pudimos enviar tu consulta. Intentá nuevamente.";

                } else {

                    formMessage.textContent =
                        "Non è stato possibile inviare la richiesta. Riprova.";

                }

                console.error("Server error:", result);

            }


        } catch (error) {

            console.error(
                "Error enviando formulario:",
                error
            );


            if (currentLanguage === "es") {

                formMessage.textContent =
                    "Ocurrió un error. Intentá nuevamente.";

            } else {

                formMessage.textContent =
                    "Si è verificato un errore. Riprova.";

            }

        }


        if (submitButton) {
            submitButton.disabled = false;
        }

    });

}


/* =====================================================
   YEAR
===================================================== */

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}