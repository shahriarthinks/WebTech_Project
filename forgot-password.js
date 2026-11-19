/* =====================================================
   Blood Connect - forgot-password.js  (used by forgot-password.html)

   Team work (who did what):
   - Sadib        : Registration (Create Account), Admin pages, Forgot Password
   - Sadiha       : Login (Sign In) and Staff dashboard
   - Natasha      : Landing page and Medical Officer dashboard
   - Sadia Mourin : Donor and Receiver dashboards
   This file is done by Sadib.
   ===================================================== */

const resetForm = document.getElementById("resetForm");

resetForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stops page reload on submit

  let email = document.getElementById("resetEmail");
  let error = document.getElementById("resetEmailError");
  let result = document.getElementById("resetResult");

  // Clear old messages
  error.innerHTML = "";
  result.innerHTML = "";
  email.classList.remove("errorBorder");
  email.classList.remove("successBorder");

  if (email.value.trim() === "") {
    email.classList.add("errorBorder");
    error.innerHTML = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.classList.add("errorBorder");
    error.innerHTML = "Invalid email address.";
  } else {
    email.classList.add("successBorder");
    result.innerHTML = "A reset link has been sent to " + email.value.trim();
    resetForm.reset();
  }
});
