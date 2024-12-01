import { loadHeaderFooter, getParam } from "./utils.mjs";
import { productDetails } from "./productPage.mjs";

loadHeaderFooter();

const productId = getParam("product");
console.log(productId);

productDetails(productId);
