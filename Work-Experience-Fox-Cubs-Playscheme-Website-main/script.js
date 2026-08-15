/* =========================================
   FOX CUBS PLAYSHEME CIC
   WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");

        hamburger.classList.toggle("active", isOpen);

        hamburger.setAttribute(
            "aria-expanded",
            isOpen
        );

        hamburger.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });


    /* CLOSE MENU AFTER CLICKING A LINK */

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                hamburger.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });


    /* CLOSE MENU WITH ESCAPE */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove("active");

            hamburger.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

}


/* =========================================
   DARK MODE
========================================= */

const darkToggle =
    document.getElementById("darkToggle");


function updateDarkButton() {

    if (!darkToggle) return;

    const isDark =
        document.body.classList.contains("dark");

    darkToggle.textContent =
        isDark ? "☀️" : "🌙";

    darkToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    darkToggle.setAttribute(
        "title",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}


/* LOAD SAVED THEME */

const savedTheme =
    localStorage.getItem("foxCubsTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


/* SYSTEM THEME */

if (!savedTheme) {

    const prefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    if (prefersDark) {

        document.body.classList.add("dark");

    }

}


updateDarkButton();


/* TOGGLE */

if (darkToggle) {

    darkToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "foxCubsTheme",
            isDark ? "dark" : "light"
        );

        updateDarkButton();

    });

}


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (formMessage) {

                formMessage.textContent =
                    "Thank you! Your message has been prepared. Please connect this form to your preferred email service or backend before going live.";

            }

            contactForm.reset();

        }
    );

}