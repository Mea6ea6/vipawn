document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];
    const likeButtons = [...document.querySelectorAll(".cart-item__like-btn")];
    const selectAllCheckbox = document.querySelector(".cart__check-box-input");
    const itemCheckboxes = [...document.querySelectorAll(".cart-item__check-box-input")];
    const copyButtons = [...document.querySelectorAll(".cart-item__code-copy")];

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
});
