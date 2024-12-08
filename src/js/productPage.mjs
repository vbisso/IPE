import {
  findProductById,
  setLocalStorage,
  getLocalStorage,
  getElementPriceID,
} from "./utils.mjs";
let product = {};
export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
}

function redirectToBookNow() {
  window.location.href = "../book-page/?product=" + product.id;
}

function addToBook() {
  let cart = getLocalStorage("so-book");
  if (!cart) {
    cart = []; // Initialize as an empty array if null
  }
  const bookNowPrices = document.querySelectorAll(".product_prices_wrapper");

  bookNowPrices.forEach((price) => {
    price.addEventListener("click", () => {
      const selectedOption =
        price.querySelector(".product_prices").id === "product_price_full"
          ? "Full Day"
          : "Half Day";

      const selectedPrice =
        price.querySelector(".product_prices").id === "product_price_full"
          ? product.price["full_day"]
          : product.price["half_day"];

      cart.push({
        ...product,
        selectedOption: selectedOption,
        selectedPrice: selectedPrice,
      });

      console.log(cart);
      setLocalStorage("so-book", cart);
      redirectToBookNow();
    });
  });
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.model;
  document.querySelector("#productImg").src = product.img;
  document.querySelector("#product_price_full").innerText =
    "$ " + product.price["full_day"];

  document.querySelector("#product_price_half").innerText =
    "$ " + product.price["half_day"];
  document.querySelector("#product_description").innerHTML =
    product.description;

  addToBook();
}
