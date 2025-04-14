document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];
    const navbar = document.querySelector(".navbar");
    const popup = document.querySelector(".pawn-popup");
    const steps = [...popup.querySelectorAll(".pawn-popup__step")];
    const ctaButton = document.querySelector(".pawn__cta-button");
    const closeButtons = [...popup.querySelectorAll(".pawn-popup__close")];
    const backButtons = [...popup.querySelectorAll(".pawn-popup__back")];
    const nextButtons = [...popup.querySelectorAll(".pawn-popup__next")];

    let currentStep = 1;

    // [ Functions ]
    const closeBurgerMenu = () => {
        burgerItems.forEach((item) => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
    };

    const showStep = (step) => {
        steps.forEach((el) => el.classList.remove("pawn-popup__step_active"));
        const stepEl = popup.querySelector(`.pawn-popup__step[data-step="${step}"]`);
        stepEl?.classList.add("pawn-popup__step_active");
        currentStep = step;
    };

    const openPopup = () => {
        popup.classList.add("pawn-popup_active");
        navbar?.classList.add("navbar_hidden");
        showStep(1);
    };

    const closePopup = () => {
        popup.classList.remove("pawn-popup_active");
        navbar?.classList.remove("navbar_hidden");
    };

    // [ Event-handlers ]
    // Burger
    burgerButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        burgerButton.classList.toggle("header__burger_active");
        burgerMenu?.classList.toggle("header__burger_active");
    });

    burgerBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            btn.closest(".header__burger-item_list")?.classList.toggle("header__burger-item_active");
        });
    });

    burgerLinks.forEach((link) => link.addEventListener("click", closeBurgerMenu));

    document.addEventListener("click", (event) => {
        if (
            !event.target.closest(".header__burger-item_list") &&
            !event.target.closest(".header__burger-menu") &&
            !event.target.closest(".header__burger")
        ) {
            closeBurgerMenu();
        }
    });

    // Pawn
    ctaButton?.addEventListener("click", openPopup);

    closeButtons.forEach((btn) => {
        btn?.addEventListener("click", closePopup);
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    nextButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            if (currentStep < 4) {
                showStep(currentStep + 1);
            } else {
                closePopup();
            }
        });
    });    

    backButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
});
