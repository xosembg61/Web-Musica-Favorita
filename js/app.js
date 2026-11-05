const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  contactForm.classList.add("was-validated");

  if (contactForm.checkValidity()) {
    formMessage.textContent = "Formulario validado. Esta página de ejemplo no envía datos.";
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  }
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
