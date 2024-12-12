import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import bookPage from "./bookPage.mjs";

loadHeaderFooter();
bookPage();
/*
window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.clear();
});
*/
