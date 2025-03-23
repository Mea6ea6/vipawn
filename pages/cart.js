document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];

    // [ Functions ]
    // Burger
    const closeBurgerMenu = () => {
        burgerItems.forEach((item) => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
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
});
