document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];
    const navbar = document.querySelector(".navbar");
    const likeButtons = [...document.querySelectorAll(".cart-item__like-btn")];
    const selectAllCheckbox = document.querySelector(".cart__check-box-input");
    const itemCheckboxes = [...document.querySelectorAll(".cart-item__check-box-input")];
    const copyButtons = [...document.querySelectorAll(".cart-item__code-copy")];
    const cartCards = [...document.querySelectorAll(".cart__card")];
    const cartSelect = document.querySelector(".cart__conditions-select");
    const cartSelectInput = document.querySelector(".cart__conditions-select-input");
    const cartSelectWrapper = document.querySelector(".cart__conditions-select-wrapper");
    const cartSelectOptions = [...document.querySelectorAll(".cart__conditions-select-option")];
    const addCardBtn = document.querySelector(".cart__card_add");
    const addCardPopup = document.querySelector(".add-card");
    const addCardClose = document.querySelector(".add-card__close-button");
    const dateInput = document.querySelector(".add-card__input_date");
    const otherCardBtn = document.querySelector(".cart__card_other");
    const paymentMethodsPopup = document.querySelector(".payment");
    const paymentMethodsClose = document.querySelector(".payment__close-button");
    const paymentMethodsSubmit = document.querySelector(".payment__submit");
    const recipientPopup = document.querySelector(".recipient");
    const recipientSelectBlock = recipientPopup?.querySelector(".recipient__select");
    const recipientNewBlock = recipientPopup?.querySelector(".recipient__new");
    const recipientOpenBtn = document.querySelector(".cart__delivery-btn_recipient");
    const recipientCloseBtns = recipientPopup?.querySelectorAll(".recipient__close");
    const recipientAddBtn = recipientPopup?.querySelector(".recipient__add-btn");
    const recipientSaveBtn = recipientPopup?.querySelector(".recipient__save-btn");
    const addressPopup = document.querySelector(".address");
    const addressSelectBlock = addressPopup?.querySelector(".address__select");
    const addressNewBlock = addressPopup?.querySelector(".address__new");
    const addressOpenBtn = document.querySelector(".cart__delivery-btn_address");
    const addressAddBtn = addressPopup?.querySelector(".address__add-btn");
    const addressCloseBtns = addressPopup?.querySelectorAll(".address__close");

    // [ Functions ]
    const closeBurgerMenu = () => {
        burgerItems.forEach(item => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
    };

    const toggleLike = (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle("cart-item__like-btn_active");
    };

    const toggleAllCheckboxes = (checked) => {
        itemCheckboxes.forEach(cb => cb.checked = checked);
    };

    const syncSelectAllCheckbox = () => {
        const allChecked = itemCheckboxes.every(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
    };

    const toggleCartDropdown = () => {
        cartSelectWrapper.classList.toggle("cart__conditions-select-wrapper_active");
    };

    const closeCartDropdown = () => {
        cartSelectWrapper.classList.remove("cart__conditions-select-wrapper_active");
    };

    const handleCopy = (e) => {
        const button = e.currentTarget;
        const codeContainer = button.closest(".cart-item__code");
        const codeValue = codeContainer?.querySelector(".cart-item__code-value")?.textContent;
        const tooltip = codeContainer?.querySelector(".cart-item__code-tooltip");

        if (codeValue && tooltip) {
            navigator.clipboard.writeText(codeValue.trim())
                .then(() => {
                    tooltip.classList.add("cart-item__code-tooltip_visible");
                    setTimeout(() => {
                        tooltip.classList.remove("cart-item__code-tooltip_visible");
                    }, 1500);
                })
                .catch(err => console.error("Copy failed:", err));
        }
    };

    const togglePopup = (popup, open = true) => {
        popup?.classList.toggle(`${popup.classList[0]}_active`, open);
        navbar?.classList.toggle("navbar_hidden", open);
    };

    const switchRecipientMode = (isNew) => {
        recipientSelectBlock?.classList.toggle("recipient__select_active", !isNew);
        recipientNewBlock?.classList.toggle("recipient__new_active", isNew);
    };

    const switchAddressMode = (isNew) => {
        addressSelectBlock?.classList.toggle("address__select_active", !isNew);
        addressNewBlock?.classList.toggle("address__new_active", isNew);
    };

    // [ Event Listeners ]
    // Burger Menu
    burgerButton?.addEventListener("click", (e) => {
        e.stopPropagation();
        burgerButton.classList.toggle("header__burger_active");
        burgerMenu?.classList.toggle("header__burger_active");
    });

    burgerBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.closest(".header__burger-item_list")?.classList.toggle("header__burger-item_active");
        });
    });

    burgerLinks.forEach(link => link.addEventListener("click", closeBurgerMenu));

    document.addEventListener("click", (e) => {
        if (
            !e.target.closest(".header__burger-item_list") &&
            !e.target.closest(".header__burger-menu") &&
            !e.target.closest(".header__burger")
        ) closeBurgerMenu();

        if (!e.target.closest(".cart__conditions-select")) closeCartDropdown();
    });

    // Like buttons
    likeButtons.forEach(btn => btn.addEventListener("click", toggleLike));

    // Copy code buttons
    copyButtons.forEach(btn => btn.addEventListener("click", handleCopy));

    // Select All
    selectAllCheckbox?.addEventListener("change", (e) => {
        toggleAllCheckboxes(e.target.checked);
    });

    itemCheckboxes.forEach(cb => cb.addEventListener("change", syncSelectAllCheckbox));

    // Cart cards
    cartCards.forEach(card => {
        card.addEventListener("click", () => {
            cartCards.forEach(c => c.classList.remove("cart__card_selected"));
            card.classList.add("cart__card_selected");
        });
    });

    // Cart select
    cartSelect?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCartDropdown();
    });

    cartSelectOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            e.stopPropagation();
            const value = option.getAttribute("data-value");
            cartSelectInput.value = value;
            cartSelectInput.placeholder = value;
            cartSelectInput.setAttribute("data-value", value);
            closeCartDropdown();
        });
    });

    // Add card
    addCardBtn?.addEventListener("click", () => togglePopup(addCardPopup, true));
    addCardClose?.addEventListener("click", () => togglePopup(addCardPopup, false));
    addCardPopup?.addEventListener("click", (e) => {
        if (e.target === addCardPopup) togglePopup(addCardPopup, false);
    });

    dateInput?.addEventListener("input", (e) => {
        let value = e.target.value.replace(/[^\d]/g, "");
        if (value.length === 1 && +value > 1) value = "0" + value;
        if (value.length > 2) value = value.slice(0, 2) + " / " + value.slice(2, 4);
        e.target.value = value;
    });

    dateInput?.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") return;
        if (e.target.value.replace(/[^\d]/g, "").length >= 4) e.preventDefault();
    });

    // Payment methods
    otherCardBtn?.addEventListener("click", () => togglePopup(paymentMethodsPopup, true));
    paymentMethodsClose?.addEventListener("click", () => togglePopup(paymentMethodsPopup, false));
    paymentMethodsSubmit?.addEventListener("click", () => togglePopup(paymentMethodsPopup, false));
    paymentMethodsPopup?.addEventListener("click", (e) => {
        if (e.target === paymentMethodsPopup) togglePopup(paymentMethodsPopup, false);
    });

    // Recipient
    recipientOpenBtn?.addEventListener("click", () => {
        togglePopup(recipientPopup, true);
        switchRecipientMode(false);
    });

    recipientAddBtn?.addEventListener("click", () => switchRecipientMode(true));

    recipientCloseBtns?.forEach(btn => {
        btn.addEventListener("click", () => {
            togglePopup(recipientPopup, false);
            switchRecipientMode(false);
        });
    });

    recipientPopup?.addEventListener("click", (e) => {
        if (e.target === recipientPopup) {
            togglePopup(recipientPopup, false);
            switchRecipientMode(false);
        }
    });

    recipientSaveBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        togglePopup(recipientPopup, false);
        switchRecipientMode(false);
    });

    // Address
    addressOpenBtn?.addEventListener("click", () => {
        togglePopup(addressPopup, true);
        switchAddressMode(false);
    });

    addressAddBtn?.addEventListener("click", () => switchAddressMode(true));

    addressCloseBtns?.forEach(btn => {
        btn.addEventListener("click", () => {
            togglePopup(addressPopup, false);
            switchAddressMode(false);
        });
    });

    addressPopup?.addEventListener("click", (e) => {
        if (e.target === addressPopup) {
            togglePopup(addressPopup, false);
            switchAddressMode(false);
        }
    });
});
