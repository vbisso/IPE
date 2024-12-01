import { getParam, loadHeaderFooter } from "./utils.mjs";
import productList, { productTemplate } from "./productList.mjs";

loadHeaderFooter();
const category = getParam("category");
console.log(category);
productList(".products-list", category);
