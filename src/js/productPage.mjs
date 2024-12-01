import { findProductById } from "./utils.mjs";
let product = {};
export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.model;
  document.querySelector("#productNameWithoutBrand").innerText = product.type;
  document.querySelector("#productImage").src = product.img;
  document.querySelector("#productFinalPrice").innerText =
    product.price["full_day"];
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.description;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
