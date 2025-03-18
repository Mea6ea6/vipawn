document.addEventListener("DOMContentLoaded", () => {
    // [ Elements ]
    const likeButton = document.querySelector(".product__heading-btn_like");
    const shareButton = document.querySelector(".product__heading-btn_share");
    const likeButtons = [...document.querySelectorAll(".product-card__like")];
    
    // [ Functions ]
    const toggleLike = (event) => {
        event.preventDefault();
        event.target.classList.toggle("product-card__like_active");
    };

    // [ Event-handlers ]
    // Like Product
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("product__heading-btn_like_active");
    });

    // Share
    shareButton.addEventListener("click", () => {
        const url = "https://example.com/product";
        navigator.clipboard.writeText(url);
    });

    // Like Buttons
    likeButtons.forEach((button) => {
        button.addEventListener("click", toggleLike);
    });
});