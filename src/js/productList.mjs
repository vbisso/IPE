import { fetchProducts, renderListWithTemplate } from "./utils.mjs";
export function productTemplate(product) {
  return `<li class="product-container">
      <a href="../product-pages/?product=${product.id}">
      <img
        src="${product.img}"
        alt="Image of ${product.name}"
      />
      <h4 class="card_type">${product.type}</h4>
      <h3 class="card__name">${product.model}</h3>
      <div class="product_prices_container">
      <div class=product_prices_wrapper> 
        <p class="product_prices"> $${product.price["full_day"]}</p>
        <p>Full Day</p>
      </div>
      <div class="product_prices_wrapper"> 
        <p class="product_prices"> $${product.price["half_day"]}</p>
        <p>Half Day</p>
      </div>
      </div>
      

    </li>`;
}
export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const element = document.querySelector(selector);
  // get the list of products
  const products = await fetchProducts(category);
  console.log(products);
  // render out the product list to the element
  renderListWithTemplate(productTemplate, element, products);
  document.querySelector(".title").innerHTML = "Rentals for " + category;
}
