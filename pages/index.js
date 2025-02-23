document.addEventListener('DOMContentLoaded', () => {
    // [ constants ]
    // navbar
    const navbar = document.querySelector('.navbar');
    // pop-up
    const logInBtn = document.querySelector('.navbar__sign-btn_log-in');
    const signUpBtn = document.querySelector('.navbar__sign-btn_reg-in');
    const signContainer = document.querySelector('.sign');
    const logInForm = document.querySelector('.sign-in');
    const signUpForm = document.querySelector('.sign-up');
    const hintBtn = document.querySelector('.sign__hint-btn');
    // promo
    const promoVideo = document.querySelector('.promo__video');
    const promoButton = document.querySelector('.promo__button');
    const promoButtonText = document.querySelector('.promo__button-text-span');
    // novelties
    const novelties = document.querySelectorAll(".novelties__card");
    // like
    const likeButtons = document.querySelectorAll(".featured__card-like");
    // faq
    const faqItems = document.querySelectorAll(".faq__item");

    // [ functions ]
    // pop-up
    const showPopup = (form) => {
        signContainer.classList.add('sign_active');
        form.classList.add('sign_active');
        navbar.classList.add('navbar_disactive');
    };
    const hidePopups = () => {
        signContainer.classList.remove('sign_active');
        logInForm.classList.remove('sign_active');
        signUpForm.classList.remove('sign_active');
        navbar.classList.remove('navbar_disactive');
    };
    logInBtn?.addEventListener('click', () => {
        hidePopups();
        showPopup(logInForm);
    });
    signUpBtn?.addEventListener('click', () => {
        hidePopups();
        showPopup(signUpForm);
    });
    hintBtn?.addEventListener('click', () => {
        logInForm.classList.remove('sign_active');
        showPopup(signUpForm);
    });
    signContainer?.addEventListener('click', (event) => {
        if (event.target === signContainer) {
            hidePopups();
        }
    });
    // promo
    promoButton?.addEventListener("click", () => {
        if (promoVideo.paused) {
            promoVideo.play();
            promoButtonText.innerHTML = "Pause the video";
        } else {
            promoVideo.pause();
            promoButtonText.innerHTML = "Play the video";
        }
    });
    // novelties
    function handleNovelties() {
        if (window.innerWidth < 1440) return;
        
        novelties.forEach((novelty) => {
            novelty.addEventListener("click", () => {
                if (novelty.classList.contains("novelties__card_active")) return;
                document.querySelector(".novelties__card_active")?.classList.remove("novelties__card_active");
                novelty.classList.add("novelties__card_active");
            });
        });
    }
    handleNovelties();
    window.addEventListener("resize", () => {
        if (window.innerWidth < 1440) {
            document.querySelectorAll(".novelties__card_active").forEach(el => el.classList.remove("novelties__card_active"));
        } else {
            handleNovelties();
        }
    });

    // like
    likeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            button.classList.toggle("featured__card-like-active");
        });
    });

    // faq
    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");
        question.addEventListener("click", () => {
            item.classList.toggle("faq__item-active");
        });
    });
});
