import { findProductById, setLocalStorage, getLocalStorage } from "./utils.mjs";
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
    cart = []; //initializing it as an empty array if null
  }
  cart.push(product);
  setLocalStorage("so-book", cart);
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

  const bookNowPrices = document.querySelectorAll(".product_prices_wrapper");

  bookNowPrices.forEach((price) => {
    price.addEventListener("click", redirectToBookNow);
    price.addEventListener("click", addToBook);
  });
}
