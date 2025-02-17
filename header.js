document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;

      const links = document.querySelectorAll(".nav-link");
      links.forEach(link => {
        if (link.href === window.location.href) {
          link.classList.add("active");
        }
      });
    })
    .catch(error => console.error("Error loading header:", error));
});
