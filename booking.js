document.addEventListener("DOMContentLoaded", function () {
  const datePicker = document.getElementById("datePicker");
  const morningSlot = document.getElementById("morning");
  const afternoonSlot = document.getElementById("afternoon");
  const completeBtn = document.querySelector(".complete-btn");

  // Hardcoded booked slots to showcase availability functionality
  const bookedSlots = {
      "2025-02-22": ["morning"],  
      "2025-02-23": ["afternoon"], 
      "2025-03-01": ["afternoon"], 
      "2025-03-02": ["afternoon"], 
      "2025-03-08": ["afternoon"],
      "2025-03-16": ["afternoon"], 
      "2025-03-22": ["afternoon"], 
      "2025-04-23": ["afternoon"],
  };

  datePicker.addEventListener("input", function () {
      const selectedDate = new Date(this.value);
      const day = selectedDate.getDay(); 

      if (day !== 5 && day !== 6) { // 5 is Sat and 6 is Sun
          alert("Please select a Saturday or Sunday.");
          this.value = "";
      } else {
          checkAvailability(this.value);
      }
  });

  function checkAvailability(date) {
      morningSlot.disabled = false;
      afternoonSlot.disabled = false;

      if (bookedSlots[date]?.includes("morning")) {
          morningSlot.disabled = true;
      }
      if (bookedSlots[date]?.includes("afternoon")) {
          afternoonSlot.disabled = true;
      }
  }

  completeBtn.addEventListener("click", function () {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const street = document.getElementById("street").value;
      const number = document.getElementById("number").value;
      const email = document.getElementById("email").value;
      const selectedDate = datePicker.value;
      const selectedTime = document.querySelector("input[name='timeSlot']:checked")?.value || "N/A";

      const selectedServices = Array.from(document.querySelectorAll(".services-checkboxes input:checked"))
          .map(el => el.nextElementSibling.innerText).join(", ");

      if (!firstName || !lastName || !email || !selectedDate || !selectedTime || !selectedServices) {
          alert("Please complete all required fields before booking.");
          return;
      }

      const queryParams = new URLSearchParams({
          firstName,
          lastName,
          services: selectedServices,
          date: selectedDate,
          times: selectedTime,
          streetNumber: number,
          streetName: street,
          email
      }).toString();

      window.location.href = `confirmation.html?${queryParams}`;
  });
});
