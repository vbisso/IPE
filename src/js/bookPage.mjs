import { getLocalStorage, formatDate, setLocalStorage } from "./utils.mjs";

function rederBookDetails(item) {
  document.querySelector("#book-details-img").src = item[0].img;
  document.querySelector("#book-details-img").alt = item[0].model;
  document.querySelector("#book-details-model").innerText = item[0].model;
  document.querySelector("#book-details-option").innerText =
    item[0].selectedOption + " " + item[0].type + " Rental";
  document.querySelector("#quantity-label").innerText = item[0].model;
  document.querySelector("#selected-price").innerText =
    "$" + item[0].selectedPrice;
}

function setBookDate() {
  const date = getLocalStorage("so-date");
  const formattedDate = formatDate(date);
  document.querySelector("#book-details-date").innerHTML = formattedDate;
}
function setQuantity() {
  const selectedQuantity = document.querySelector("#quantity").value;
  setLocalStorage("so-quantity", selectedQuantity);
  updateQuantity();
  displayTotal();
}

function updateQuantity() {
  const quantity = getLocalStorage("so-quantity");
  //console.log(quantity);
  if (quantity >= "1") {
    document.querySelector(".book-confirmation").classList.remove("hide");
  } else {
    document.querySelector(".book-confirmation").classList.add("hide");
  }
}

function displayTotal() {
  const bookItems = getLocalStorage("so-book");

  if (bookItems) {
    const subtotal = calculateSubtotal(bookItems[0]);
    document.querySelector("#sub-total").innerText =
      "Subtotal: " + "$" + subtotal;

    const tax = subtotal * 0.06; //6% tax
    document.querySelector("#taxes").innerText = "Tax: " + "$" + tax;

    const total = tax + subtotal;
    document.querySelector("#total").innerText = "Total: " + "$" + total;
  }
}

function calculateSubtotal(bookItem) {
  const quantity = getLocalStorage("so-quantity");
  const subtotal = quantity * bookItem.selectedPrice;
  return subtotal;
}

export default function bookPage() {
  const bookItems = getLocalStorage("so-book");

  if (!bookItems) {
    window.location.href = "../product-list/index.html";
  }

  if (bookItems[0].selectedOption === "Half Day") {
    document.querySelector(".half-day-options-form").classList.remove("hide");
  }

  setBookDate();
  rederBookDetails(bookItems);

  document.querySelector("#quantity").addEventListener("change", setQuantity);

  //const total = calculateTotal(cartItems);

  //displayCartTotal(total);
}
