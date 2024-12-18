import { getLocalStorage, formatDate, setLocalStorage } from "./utils.mjs";
import emailjs from "emailjs-com";

function rederBookDetails(item) {
  document.querySelector("#book-details-img").src = item[0].img;
  document.querySelector("#book-details-img").alt = item[0].model;
  document.querySelector("#book-details-model").innerText = item[0].model;
  document.querySelector("#book-details-option").innerText =
    item[0].selectedOption + " " + item[0].type + " Rental";
  document.querySelector("#quantity-label").innerText = item[0].model;
  document.querySelector("#selected-price").innerText =
    "$" + parseFloat(item[0].selectedPrice).toFixed(2);
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
    document.querySelector("#taxes").innerText =
      "Tax:    " + "$" + parseFloat(tax).toFixed(2); //6% tax;

    const total = tax + subtotal;
    document.querySelector("#total").innerText =
      "Total:    " + "$" + parseFloat(total).toFixed(2); //total;
  }
}

function calculateSubtotal(bookItem) {
  const quantity = getLocalStorage("so-quantity");
  const subtotal = quantity * bookItem.selectedPrice;
  return subtotal;
}

export default function bookPage() {
  const bookItems = getLocalStorage("so-book");

  if (bookItems[0].selectedOption === "Half Day") {
    document.querySelector(".half-day-options-form").classList.remove("hide");
  }

  setBookDate();
  rederBookDetails(bookItems);

  document.querySelector("#quantity").addEventListener("change", setQuantity);
}

//PAYMENT FORM

emailjs.init("mU9r0dpr04A74A5fp");

function sendConfirmationEmail(event) {
  event.preventDefault();

  const name = document.querySelector("#full-name").value;
  const email = document.querySelector("#email").value;

  const bookItems = getLocalStorage("so-book");
  const quantity = getLocalStorage("so-quantity");
  const model = bookItems[0].model;
  const image = bookItems[0].img;
  const total = document.querySelector("#total").innerText;

  const emailParams = {
    name: name,
    email: email,
    model: model,
    quantity: quantity,
    total_paid: total,
    image: image,
  };

  emailjs
    .send("service_jma512d", "template_vbvb0wk", emailParams)
    .then((response) => {
      alert("Confirmation email sent successfully!");
      window.location.href = "../book-confirmation/index.html";
      localStorage.clear();
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    });
}
//Event listener for payment form
document
  .querySelector("#payment-form")
  .addEventListener("submit", sendConfirmationEmail);
//Booking Complete Handler
