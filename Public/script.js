const menuIcon = document.querySelector('.fa-bars');
const navLinks = document.querySelector('.nav-links');

// Toggle Mobile Menu
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Theme Toggle Logic
const themeBtn = document.createElement('button');
themeBtn.innerText = "dark";
themeBtn.classList.add('theme-toggle');
document.body.appendChild(themeBtn);

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.innerText = document.body.classList.contains('dark-mode') ? "light" : "dark";
});

// Contact Form Logic
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation
  if (!name || !email || !message) {
    alert("⚠️ Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("⚠️ Enter a valid email");
    return;
  }

  try {
    // UPDATED: Changed Port from 5000 to 3000 to match your server.js
    const res = await fetch("http://localhost:3000/submit-message", {
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
      alert("❌ Failed to send message: " + (data.error || "Unknown error"));
    }

  } catch (error) {
    console.error("Connection Error:", error);
    alert("🚫 Cannot connect to server. Make sure you ran 'node server.js'");
  }
});
// Old line:
// const res = await fetch("http://localhost:3000/submit-message", ...

// New line:
const res = await fetch("https://portfolio-6-tlpg.onrender.com/submit-message", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message })
});