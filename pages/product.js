document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];
    const likeButton = document.querySelector(".product__heading-btn_like");
    const likeButtons = [...document.querySelectorAll(".rec-card__like")];
    const selectButton = document.querySelector(".conditions__select");
    const selectInput = document.querySelector(".conditions__select-input");
    const selectWrapper = document.querySelector(".conditions__select-wrapper");
    const selectOptions = [...document.querySelectorAll(".conditions__select-option")];
    const conditionsPopup = document.querySelector(".conditions");
    const conditionsBtn = document.querySelector(".conditions__btn");
    const installmentBtns = [...document.querySelectorAll(".product__installment-btn")];
    const detailCopyButtons = [...document.querySelectorAll(".product__details-copy-btn")];

    // [ Functions ]
    const closeBurgerMenu = () => {
        burgerItems.forEach((item) => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
    };

    const toggleLike = (event) => {
        event.preventDefault();
        event.target.classList.toggle("rec-card__like_active");
    };

    const toggleDropdown = () => {
        if (selectWrapper.classList.contains("conditions__select-wrapper_active")) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    const openDropdown = () => {
        selectWrapper.classList.add("conditions__select-wrapper_active");
    };

    const closeDropdown = () => {
        selectWrapper.classList.remove("conditions__select-wrapper_active");
    };

    const togglePopup = (popup, state) => {
        popup.classList.toggle("conditions_active", state);
    };

    const handleDetailCopy = (event) => {
        const button = event.currentTarget;
        const container = button.closest(".product__details-copy");
        const valueEl = container.querySelector(".product__details-value");
        const tooltip = container.querySelector(".product__details-tooltip");

        if (valueEl && tooltip) {
            navigator.clipboard.writeText(valueEl.textContent.trim())
                .then(() => {
                    tooltip.classList.add("product__details-tooltip_visible");
                    setTimeout(() => {
                        tooltip.classList.remove("product__details-tooltip_visible");
                    }, 1500);
                })
                .catch((err) => {
                    console.error("Copy failed:", err);
                });
        }
    };

    // [ Event-handlers ]
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

    installmentBtns.forEach((btn) => {
        btn.addEventListener("click", () => togglePopup(conditionsPopup, true));
    });

    conditionsBtn?.addEventListener("click", () => togglePopup(conditionsPopup, false));

    conditionsPopup?.addEventListener("click", (event) => {
        if (event.target === conditionsPopup) {
            togglePopup(conditionsPopup, false);
        }
    });

    likeButton?.addEventListener("click", () => {
        likeButton.classList.toggle("product__heading-btn_like_active");
    });

    likeButtons.forEach((button) => button.addEventListener("click", toggleLike));

    selectButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleDropdown();
    });

    selectOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.stopPropagation();
            selectInput.value = option.getAttribute("data-value");
            selectInput.placeholder = option.getAttribute("data-value");
            selectInput.setAttribute("data-value", option.getAttribute("data-value"));
            closeDropdown();
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".conditions__select")) {
            closeDropdown();
        }
    });

    detailCopyButtons.forEach((btn) => {
        btn.addEventListener("click", handleDetailCopy);
    });
});