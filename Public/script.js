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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // ✅ Validation
  if (!name || !email || !message) {
    alert("⚠️ Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("⚠️ Enter a valid email");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/submit-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message");
    }

  } catch (error) {
    console.error(error);
    alert("🚫 Cannot connect to server");
  }
});
const name = form.querySelector('input[name="name"]').value.trim();
const email = form.querySelector('input[name="email"]').value.trim();
const message = form.querySelector('textarea[name="message"]').value.trim();