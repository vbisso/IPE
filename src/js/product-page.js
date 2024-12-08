import { loadHeaderFooter, getParam, setLocalStorage } from "./utils.mjs";
import productDetails from "./productPage.mjs";

loadHeaderFooter();

$(document).ready(function () {
  $("#calendar").fullCalendar({
    selectable: true,
    selectHelper: true,
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay",
    },
    // Callback function when a date is selected
    select: function (startDate) {
      // Display the selected date
      const selectedDate = startDate.format("YYYY-MM-DD"); // format as needed
      $("#selectedDate").text("Selected Date: " + selectedDate);

      console.log("Selected Date: ", selectedDate);

      if (selectedDate) {
        document.querySelector(".product_prices_container").style.display =
          "flex";
        setLocalStorage("so-date", selectedDate);
      }
    },
  });
});

const productId = getParam("product");
console.log(productId);

productDetails(productId);
