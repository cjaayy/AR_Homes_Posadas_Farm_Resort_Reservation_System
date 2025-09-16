// DOM Elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.querySelector(".login-btn");
const toggleIcon = document.getElementById("toggleIcon");

// Slideshow Elements
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;
let slideInterval;

// Initialize slideshow
function initSlideshow() {
  // Start automatic slideshow
  startSlideshow();

  // Add click handlers to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });
}

// Start automatic slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 4000); // Change slide every 4 seconds
}

// Stop slideshow
function stopSlideshow() {
  clearInterval(slideInterval);
}

// Go to specific slide
function goToSlide(index) {
  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active");
  indicators[currentSlide].classList.remove("active");

  // Add flash transition effect
  slides[currentSlide].classList.add("flash-transition");

  // Remove flash transition after animation
  setTimeout(() => {
    slides[currentSlide].classList.remove("flash-transition");
  }, 1000);

  // Update current slide
  currentSlide = index;

  // Add active class to new slide and indicator
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");

  // Restart slideshow timer
  stopSlideshow();
  startSlideshow();
}

// Go to next slide
function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  goToSlide(nextIndex);
}

// Go to previous slide
function prevSlide() {
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prevIndex);
}

// Add keyboard navigation for slideshow
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Pause slideshow on hover
const imageSection = document.querySelector(".image-section");
if (imageSection) {
  imageSection.addEventListener("mouseenter", stopSlideshow);
  imageSection.addEventListener("mouseleave", startSlideshow);
}

// Initialize slideshow when page loads
document.addEventListener("DOMContentLoaded", initSlideshow);

// Form validation and submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset error states
  clearErrors();

  // Validation
  let isValid = true;

  if (!email) {
    showError(emailInput, "Please enter your username or email");
    isValid = false;
  } else if (!isValidEmail(email) && !isValidUsername(email)) {
    showError(emailInput, "Please enter a valid email or username");
    isValid = false;
  }

  if (!password) {
    showError(passwordInput, "Please enter your password");
    isValid = false;
  } else if (password.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  }

  if (!isValid) {
    // Show alert for empty fields as requested
    alert("Please fill in all required fields correctly!");
    return;
  }

  // If validation passes, simulate login
  handleLogin(email, password);
});

// Handle login simulation
function handleLogin(email, password) {
  // Add loading state
  loginBtn.classList.add("loading");
  loginBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    // Remove loading state
    loginBtn.classList.remove("loading");
    loginBtn.disabled = false;

    // Debug: Log the credentials being checked
    console.log("Checking credentials:", { email, password });
    console.log(
      "Email length:",
      email.length,
      "Password length:",
      password.length
    );

    // Check for admin credentials - accept both username and email
    const cleanEmail = email.trim().toLowerCase();
    const isAdminLogin =
      cleanEmail === "admin@resort.com" || cleanEmail === "admin";
    const isAdminPassword = password.trim() === "admin123";

    console.log("Login check:", cleanEmail, "is admin:", isAdminLogin);
    console.log(
      "Password check:",
      password.trim(),
      "===",
      "admin123",
      "Result:",
      isAdminPassword
    );

    if (isAdminLogin && isAdminPassword) {
      console.log("✅ Admin login successful - redirecting to dashboard");
      // Add success animation
      loginBtn.classList.add("success");
      loginBtn.innerHTML = '<i class="fas fa-check"></i> Admin Access Granted!';

      // Direct redirect to admin dashboard without popup
      setTimeout(() => {
        console.log("Redirecting to admin dashboard...");
        window.location.href = "admin-dashboard.html";
      }, 1000);
    } else {
      console.log("❌ Not admin credentials - showing demo message");
      // Add success animation for demo
      loginBtn.classList.add("success");

      // Show success message for non-admin users
      alert(
        `Welcome! Login successful for: ${email}\n\nNote: This is a frontend-only demo. In a real application, this would connect to a backend server.\n\nTip: Use 'admin' (username) or 'admin@resort.com' (email) with password 'admin123' to access the admin dashboard.`
      );

      // Reset form after success
      setTimeout(() => {
        loginForm.reset();
        loginBtn.classList.remove("success");
      }, 2000);
    }
  }, 1500);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Username validation (alphanumeric and underscore)
function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

// Show error state
function showError(input, message) {
  const wrapper = input.closest(".input-wrapper");
  wrapper.classList.add("error");

  // Create error message element if it doesn't exist
  let errorMsg = wrapper.nextElementSibling;
  if (!errorMsg || !errorMsg.classList.contains("error-message")) {
    errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.style.color = "#ff6b6b";
    errorMsg.style.fontSize = "0.8rem";
    errorMsg.style.marginTop = "5px";
    errorMsg.style.marginLeft = "5px";
    wrapper.parentNode.insertBefore(errorMsg, wrapper.nextSibling);
  }
  errorMsg.textContent = message;

  // Remove error state when user starts typing
  input.addEventListener(
    "input",
    function () {
      wrapper.classList.remove("error");
      if (errorMsg) {
        errorMsg.remove();
      }
    },
    { once: true }
  );
}

// Clear all error states
function clearErrors() {
  const errorWrappers = document.querySelectorAll(".input-wrapper.error");
  errorWrappers.forEach((wrapper) => {
    wrapper.classList.remove("error");
  });

  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());
}

// Password toggle functionality
function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

// Input focus effects
document.querySelectorAll(".input-wrapper input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.closest(".input-wrapper").style.transform = "translateY(-1px)";
    this.closest(".input-wrapper").style.boxShadow =
      "0 4px 12px rgba(0,0,0,0.1)";
  });

  input.addEventListener("blur", function () {
    this.closest(".input-wrapper").style.transform = "translateY(0)";
    this.closest(".input-wrapper").style.boxShadow = "none";
  });
});

// Remember me functionality
const rememberCheckbox = document.getElementById("remember");
rememberCheckbox.addEventListener("change", function () {
  if (this.checked) {
    console.log("Remember me enabled");
    // In a real application, you would set localStorage or cookie preferences here
  } else {
    console.log("Remember me disabled");
  }
});

// Handle "Forgot Password" link
document.querySelector(".forgot-link").addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "Forgot Password feature would be implemented here.\n\nIn a real application, this would redirect to a password reset page or open a modal."
  );
});

// Handle "Register" link
document
  .querySelector(".signup-link a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert(
      "Registration page would be implemented here.\n\nIn a real application, this would redirect to a registration form."
    );
  });

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
    loginForm.dispatchEvent(new Event("submit"));
  }
});

// Auto-focus first input on page load
window.addEventListener("load", function () {
  emailInput.focus();
});

// Add smooth scrolling for mobile keyboards
window.addEventListener("resize", function () {
  if (window.innerWidth <= 768) {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.tagName === "INPUT") {
      setTimeout(() => {
        activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }
});

// Demo credentials hint (development only)
console.log(`
🏖️ AR Homes Posadas Farm Resort - Login Demo
=============================================
This is a frontend-only demonstration.

Demo credentials (for testing):
📧 Email: demo@arhomes.com
🔑 Password: demo123

You can also use any valid email format or username.
The form includes validation for empty fields and basic format checking.
`);

// Add a subtle animation to the logo
const logo = document.querySelector(".logo");
if (logo) {
  logo.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(5deg)";
    this.style.transition = "all 0.3s ease";
  });

  logo.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
}

// Prevent form submission with Enter key on password toggle button
document
  .querySelector(".password-toggle")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      togglePassword();
    }
  });
