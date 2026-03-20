const menuIcon = document.querySelector('.fa-bars');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const themeBtn = document.createElement('button');
themeBtn.innerText = "dark";
themeBtn.classList.add('theme-toggle');
document.body.appendChild(themeBtn);

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.innerText = document.body.classList.contains('dark-mode') ? "light" : "dark";
});
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email");
    return;
  }

  alert("Message sent successfully!");
});
