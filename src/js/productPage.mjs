import { findProductById } from "./utils.mjs";
let product = {};
export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("bookNow").addEventListener("click", bookNow);
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
  document.querySelector("#bookNow").dataset.id = product.Id;
}
