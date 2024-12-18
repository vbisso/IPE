import dayjs from "dayjs";
const JSON_URL = `https://vbisso.github.io/IPE/src/public/json/products.json`;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data.Message };
  }
}

export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  if (headerEl) {
    await renderWithTemplate(headerTemplateFn, headerEl);
  }

  if (footerEl) {
    await renderWithTemplate(footerTemplateFn, footerEl);
  }

  loadResponsiveMenu();
}

export function loadResponsiveMenu() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const overlayMenu = document.querySelector(".overlay-menu");
  const closeBtn = document.querySelector(".close-btn");
  const menuLinks = document.querySelectorAll(".overlay-menu a");

  hamburgerMenu.addEventListener("click", () => {
    overlayMenu.style.transform = "translateX(0)";
  });

  closeBtn.addEventListener("click", () => {
    overlayMenu.style.transform = "translateX(-100%)";
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      overlayMenu.style.transform = "translateX(-100%)";
    });
  });

  window.addEventListener("click", (event) => {
    if (
      !overlayMenu.contains(event.target) &&
      !hamburgerMenu.contains(event.target)
    ) {
      overlayMenu.style.transform = "translateX(-100%)";
    }
  });
}

export async function fetchProducts(category) {
  const response = await fetch(JSON_URL);
  const products = await convertToJson(response);

  if (category) {
    return products.filter((product) => product.season === category);
  }

  return products;
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

export function getParam(param) {
  const queryString = window.location.search;
  //console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  //console.log(urlParams);
  const product = urlParams.get(param);
  return product;
}
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function findProductById(id) {
  const response = await fetch(JSON_URL);
  const products = await convertToJson(response);

  const product = products.find((product) => product.id === id);

  if (product) {
    return product;
  } else {
    throw { name: "ProductNotFoundError", message: "Product not found." };
  }
}
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getElementPriceID(element) {
  return element.firstElementChild.id;
}
export function formatDate(dateStr) {
  const date = dayjs(dateStr);
  return date.format("dddd, MMMM D, YYYY");
}
