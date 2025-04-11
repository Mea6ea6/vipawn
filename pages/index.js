document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const navbar = document.querySelector(".navbar");
    const signContainer = document.querySelector(".sign");
    const logInForm = document.querySelector(".sign-in");
    const signUpForm = document.querySelector(".sign-up");
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const promoVideo = document.querySelector(".promo__video");
    const promoButton = document.querySelector(".promo__button");
    const promoButtonText = document.querySelector(".promo__button-text-span");
    const logInBtn = document.querySelector(".navbar__sign-btn_log-in");
    const signUpBtn = document.querySelector(".navbar__sign-btn_reg-in");
    const hintBtn = document.querySelector(".sign__hint-btn");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];
    const novelties = [...document.querySelectorAll(".novelties__card")];
    const likeButtons = [...document.querySelectorAll(".featured__card-like")];
    const faqItems = [...document.querySelectorAll(".faq__item")];

    // [ Functions ]
    const togglePopup = (form) => {
        signContainer.classList.toggle("sign_active", !!form);
        logInForm.classList.remove("sign_active");
        signUpForm.classList.remove("sign_active");
        navbar.classList.toggle("navbar_hidden", !!form);
        form?.classList.add("sign_active");
    };

    const closeBurgerMenu = () => {
        burgerItems.forEach((item) => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
    };

    // [ Event-handlers ]
    logInBtn?.addEventListener("click", () => togglePopup(logInForm));
    signUpBtn?.addEventListener("click", () => togglePopup(signUpForm));
    hintBtn?.addEventListener("click", () => togglePopup(signUpForm));
    signContainer?.addEventListener("click", (event) => {
        if (event.target === signContainer) togglePopup(null);
    });

    // Burger
    burgerButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        burgerButton.classList.toggle("header__burger_active");
        burgerMenu?.classList.toggle("header__burger_active");
    });

    burgerBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            const parentItem = btn.closest(".header__burger-item_list");
            parentItem.classList.toggle("header__burger-item_active");
        });
    });

    burgerLinks.forEach((link) =>
        link.addEventListener("click", () => {
            closeBurgerMenu();
        })
    );

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".header__burger-item_list") && !event.target.closest(".header__burger-menu") && !event.target.closest(".header__burger")) {
            closeBurgerMenu();
        }
    });

    // Promo
    promoButton?.addEventListener("click", () => {
        if (promoVideo.paused) {
            promoVideo.play();
            promoButtonText.innerHTML = "Pause the video";
        } else {
            promoVideo.pause();
            promoButtonText.innerHTML = "Play the video";
        }
    });

    // Novelties
    const handleNovelties = () => {
        if (window.innerWidth < 1440) {
            novelties.forEach((novelty) => novelty.classList.remove("novelties__card_active"));
            return;
        }

        novelties.forEach((novelty) => {
            novelty.addEventListener("click", () => {
                if (!novelty.classList.contains("novelties__card_active")) {
                    document.querySelector(".novelties__card_active")?.classList.remove("novelties__card_active");
                    novelty.classList.add("novelties__card_active");
                }
            });
        });
    };

    handleNovelties();
    window.addEventListener("resize", handleNovelties);

    // Like
    likeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            button.classList.toggle("featured__card-like_active");
        });
    });

    // FAQ
    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");
        question?.addEventListener("click", () => {
            item.classList.toggle("faq__item_active");
        });
    });
});
