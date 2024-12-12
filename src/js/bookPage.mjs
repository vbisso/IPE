import { getLocalStorage, formatDate } from "./utils.mjs";

function rederBookDetails(item) {
  document.querySelector("#book-details-img").src = item[0].img;
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

export default function bookPage() {
  const bookItems = getLocalStorage("so-book");

  if (!bookItems) {
    return;
  }

  setBookDate();
  rederBookDetails(bookItems);

  //const total = calculateTotal(cartItems);

  //displayCartTotal(total);
}

function displayHalfDayOptions() {}
