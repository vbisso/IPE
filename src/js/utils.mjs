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
}

export async function fetchProducts(category) {
  let jsonFile = "";

  if (category === "summer") {
    jsonFile = "summer.json"; // Summer category
  } else if (category === "winter") {
    jsonFile = "winter.json"; // Winter category
  }

  // Fetch the appropriate JSON file
  const response = await fetch(`/public/json/${jsonFile}`);
  const data = await convertToJson(response);
  return data;
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
