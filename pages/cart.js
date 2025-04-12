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
        burgerItems.forEach((item) => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
    };

    const toggleLike = (event) => {
        event.preventDefault();
        event.currentTarget.classList.toggle("cart-item__like-btn_active");
    };

    const toggleAllCheckboxes = (checked) => {
        itemCheckboxes.forEach((checkbox) => {
            checkbox.checked = checked;
        });
    };

    const syncSelectAllCheckbox = () => {
        const allChecked = itemCheckboxes.every((checkbox) => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
    };

    const toggleCartDropdown = () => {
        cartSelectWrapper.classList.toggle("cart__conditions-select-wrapper_active");
    };
    
    const closeCartDropdown = () => {
        cartSelectWrapper.classList.remove("cart__conditions-select-wrapper_active");
    };    

    const handleCopy = (event) => {
        const button = event.currentTarget;
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
                .catch((err) => {
                    console.error("Copy failed:", err);
                });
        }
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

    // Like
    likeButtons.forEach((btn) => {
        btn.addEventListener("click", toggleLike);
    });

    // Copy
    copyButtons.forEach((btn) => {
        btn.addEventListener("click", handleCopy);
    });

    // Select All Checkbox
    selectAllCheckbox?.addEventListener("change", (event) => {
        toggleAllCheckboxes(event.target.checked);
    });

    // Individual Checkbox changes
    itemCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            syncSelectAllCheckbox();
        });
    });

    // Cart card selection
    cartCards.forEach((card) => {
        card.addEventListener("click", () => {
            cartCards.forEach((c) => c.classList.remove("cart__card_selected"));
            card.classList.add("cart__card_selected");
        });
    });

    // Cart Select Dropdown
    cartSelect?.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleCartDropdown();
    });

    cartSelectOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.stopPropagation();
            const value = option.getAttribute("data-value");
            cartSelectInput.value = value;
            cartSelectInput.placeholder = value;
            cartSelectInput.setAttribute("data-value", value);
            closeCartDropdown();
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".cart__conditions-select")) {
            closeCartDropdown();
        }
    });

    // Add Card
    addCardBtn?.addEventListener("click", () => {
        addCardPopup?.classList.add("add-card_active");
        navbar?.classList.add("navbar_hidden");
    });

    addCardClose?.addEventListener("click", () => {
        addCardPopup?.classList.remove("add-card_active");
        navbar?.classList.remove("navbar_hidden");
    });

    addCardPopup?.addEventListener("click", (event) => {
        if (event.target === addCardPopup) {
            addCardPopup.classList.remove("add-card_active");
            navbar?.classList.remove("navbar_hidden");
        }
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

    // Payment Methods
    otherCardBtn?.addEventListener("click", () => {
        paymentMethodsPopup?.classList.add("payment_active");
        navbar?.classList.add("navbar_hidden");
    });

    paymentMethodsPopup?.addEventListener("click", (event) => {
        if (event.target === paymentMethodsPopup) {
            paymentMethodsPopup.classList.remove("payment_active");
            navbar?.classList.remove("navbar_hidden");
        }
    });

    paymentMethodsClose?.addEventListener("click", () => {
        paymentMethodsPopup.classList.remove("payment_active");
        navbar?.classList.remove("navbar_hidden");
    });

    paymentMethodsSubmit?.addEventListener("click", () => {
        paymentMethodsPopup.classList.remove("payment_active");
        navbar?.classList.remove("navbar_hidden");
    });

    // Recipient
    recipientOpenBtn?.addEventListener("click", () => {
        recipientPopup?.classList.add("recipient_active");
        recipientSelectBlock?.classList.add("recipient__select_active");
        recipientNewBlock?.classList.remove("recipient__new_active");
        navbar?.classList.add("navbar_hidden");
    });
    
    recipientAddBtn?.addEventListener("click", () => {
        recipientSelectBlock?.classList.remove("recipient__select_active");
        recipientNewBlock?.classList.add("recipient__new_active");
    });
    
    recipientCloseBtns?.forEach((btn) => {
        btn.addEventListener("click", () => {
            recipientPopup?.classList.remove("recipient_active");
            recipientSelectBlock?.classList.remove("recipient__select_active");
            recipientNewBlock?.classList.remove("recipient__new_active");
            navbar?.classList.remove("navbar_hidden");
        });
    });
    
    recipientPopup?.addEventListener("click", (event) => {
        if (event.target === recipientPopup) {
            recipientPopup.classList.remove("recipient_active");
            recipientSelectBlock?.classList.remove("recipient__select_active");
            recipientNewBlock?.classList.remove("recipient__new_active");
            navbar?.classList.remove("navbar_hidden");
        }
    });
    
    recipientSaveBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        recipientPopup?.classList.remove("recipient_active");
        recipientSelectBlock?.classList.remove("recipient__select_active");
        recipientNewBlock?.classList.remove("recipient__new_active");
        navbar?.classList.remove("navbar_hidden");
    });

    // Address
    addressOpenBtn?.addEventListener("click", () => {
        addressPopup.classList.add("address_active");
        addressSelectBlock?.classList.add("address__select_active");
        addressNewBlock?.classList.remove("address__new_active");
        navbar?.classList.add("navbar_hidden");
    });

    addressAddBtn?.addEventListener("click", () => {
        addressSelectBlock?.classList.remove("address__select_active");
        addressNewBlock?.classList.add("address__new_active");
    });

    addressCloseBtns?.forEach((btn) => {
        btn.addEventListener("click", () => {
            addressPopup?.classList.remove("address_active");
            addressSelectBlock?.classList.remove("address__select_active");
            addressNewBlock?.classList.remove("address__new_active");
            navbar?.classList.remove("navbar_hidden");
        });
    });

    addressPopup?.addEventListener("click", (event) => {
        if (event.target === addressPopup) {
            addressPopup.classList.remove("address_active");
            addressSelectBlock?.classList.remove("address__select_active");
            addressNewBlock?.classList.remove("address__new_active");
            navbar?.classList.remove("navbar_hidden");
        }
    });
});
