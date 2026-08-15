/* =========================================
   ELEMENTS
========================================= */

const sections =
    document.querySelectorAll(".section");

const navLinks =
    document.querySelectorAll(".nav-link");

const photos =
    document.querySelectorAll(".floating-photo");


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateNavigation() {

    const point =
        window.innerHeight * 0.45;

    let current =
        sections[0];


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();


        if (
            rect.top <= point &&
            rect.bottom >= point
        ) {

            current = section;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current.id
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
);


window.addEventListener(
    "load",
    updateNavigation
);


/* =========================================
   SMOOTH NAVIGATION
========================================= */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const target =
                document.querySelector(
                    link.getAttribute("href")
                );


            if (!target) return;


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================
   INTERACTIVE PHOTO MOVEMENT
========================================= */

photos.forEach((photo, index) => {

    let baseTransform =
        photo.style.transform;


    photo.addEventListener(
        "mousemove",
        event => {

            const rect =
                photo.getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left -
                rect.width / 2;


            const mouseY =
                event.clientY -
                rect.top -
                rect.height / 2;


            const moveX =
                mouseX / 8;


            const moveY =
                mouseY / 8;


            const rotate =
                mouseX / 35;


            photo.style.animationPlayState =
                "paused";


            photo.style.transform =
                `translate(${moveX}px, ${moveY}px)
                 rotate(${rotate}deg)
                 scale(1.08)`;

        }
    );


    photo.addEventListener(
        "mouseleave",
        () => {

            photo.style.animationPlayState =
                "running";


            photo.style.transform =
                "";

        }
    );

});


/* =========================================
   GLOBAL CURSOR PARALLAX
========================================= */

const birthday =
    document.querySelector(".birthday");


if (birthday) {

    birthday.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);


            photos.forEach((photo, index) => {

                /*
                    Setiap foto punya
                    intensitas gerakan berbeda.
                */

                const intensity =
                    4 + (index % 5) * 1.5;


                if (
                    !photo.matches(":hover")
                ) {

                    photo.style.marginLeft =
                        `${x * intensity}px`;

                    photo.style.marginTop =
                        `${y * intensity}px`;

                }

            });

        }
    );


    birthday.addEventListener(
        "mouseleave",
        () => {

            photos.forEach(photo => {

                photo.style.marginLeft = "";
                photo.style.marginTop = "";

            });

        }
    );

}


/* =========================================
   RANDOMIZE FLOATING ANIMATION
========================================= */

photos.forEach((photo, index) => {

    const duration =
        5 + Math.random() * 5;

    const delay =
        Math.random() * -6;


    photo.style.animationDuration =
        `${duration}s`;

    photo.style.animationDelay =
        `${delay}s`;

});


/* =========================================
   REVEAL SECTIONS
========================================= */

const revealElements =
    document.querySelectorAll(
        ".conversation-heading, .chat-card, .conversation-final, .little-heading, .little-list p, .letter-content, .ending-content"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
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
   ADD REVEAL CSS
========================================= */

const revealStyle =
    document.createElement("style");


revealStyle.textContent = `

    .conversation-heading,
    .chat-card,
    .conversation-final,
    .little-heading,
    .little-list p,
    .letter-content,
    .ending-content {

        opacity: 0;

        transform:
            translateY(30px);

        transition:
            opacity 0.9s ease,
            transform 0.9s ease;

    }


    .chat-card {

        transition:
            opacity 0.8s ease,
            transform 0.8s ease;

    }


    .conversation-heading.visible,
    .chat-card.visible,
    .conversation-final.visible,
    .little-heading.visible,
    .little-list p.visible,
    .letter-content.visible,
    .ending-content.visible {

        opacity: 1;

        transform:
            translateY(0);

    }

`;

document.head.appendChild(revealStyle);