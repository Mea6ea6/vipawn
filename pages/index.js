document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const logInBtn = document.querySelector('.navbar__sign-btn_log-in');
    const signUpBtn = document.querySelector('.navbar__sign-btn_reg-in');
    const signContainer = document.querySelector('.sign');
    const logInForm = document.querySelector('.sign-in');
    const signUpForm = document.querySelector('.sign-up');
    const hintBtn = document.querySelector('.sign__hint-btn');
    const promoVideo = document.querySelector('.promo__video');
    const promoButton = document.querySelector('.promo__button');
    const promoButtonText = document.querySelector('.promo__button-text-span');

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

    logInBtn.addEventListener('click', () => {
        hidePopups();
        showPopup(logInForm);
    });

    signUpBtn.addEventListener('click', () => {
        hidePopups();
        showPopup(signUpForm);
    });

    hintBtn.addEventListener('click', () => {
        logInForm.classList.remove('sign_active');
        showPopup(signUpForm);
    });

    signContainer.addEventListener('click', (event) => {
        if (event.target === signContainer) {
            hidePopups();
        }
    });

    promoButton.addEventListener("click", () => {
        if (promoVideo.paused) {
            promoVideo.play();
            promoButtonText.innerHTML = "Pause the video";
        } else {
            promoVideo.pause();
            promoButtonText.innerHTML = "Play the video";
        }
    });
});