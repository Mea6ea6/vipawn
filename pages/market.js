document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const burgerButton = document.querySelector(".header__burger");
    const burgerMenu = document.querySelector(".header__burger-menu");
    const burgerBtns = [...document.querySelectorAll(".header__burger-page-btn_list")];
    const burgerItems = [...document.querySelectorAll(".header__burger-item_list")];
    const burgerLinks = [...document.querySelectorAll(".header__burger-list-link")];
    const filterTags = [...document.querySelectorAll(".catalog__filters-tag")];
    const filterLabels = [...document.querySelectorAll(".filters__item-label")];
    const likeButtons = [...document.querySelectorAll(".product-card__like")]; // Добавил лайки

    // [ Functions ]
    const closeBurgerMenu = () => {
        burgerItems.forEach((item) => item.classList.remove("header__burger-item_active"));
        burgerMenu?.classList.remove("header__burger_active");
        burgerButton?.classList.remove("header__burger_active");
    };

    const toggleFilterTag = (event) => {
        event.target.classList.toggle("catalog__filters-tag_active");
    };

    const toggleFilterItem = (event) => {
        const parentItem = event.target.closest(".filters__item");
        parentItem.classList.toggle("filters__item_active");
    };

    const toggleLike = (event) => {
        event.preventDefault(); // Предотвращает ненужное действие, например, если внутри есть ссылка
        event.target.classList.toggle("product-card__like_active");
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

    // Filter Tags
    filterTags.forEach((tag) => {
        tag.addEventListener("click", toggleFilterTag);
    });

    // Filter Items
    filterLabels.forEach((label) => {
        label.addEventListener("click", toggleFilterItem);
    });

    // Like Buttons
    likeButtons.forEach((button) => {
        button.addEventListener("click", toggleLike);
    });
});
