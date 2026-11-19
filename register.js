/* =====================================================
   Blood Connect - register.js  (used by login.html)
   Create Account (Registration) part.

   Team work (who did what):
   - Sadib        : Registration (Create Account), Admin pages, Forgot Password
   - Sadiha       : Login (Sign In) and Staff dashboard
   - Natasha      : Landing page and Medical Officer dashboard
   - Sadia Mourin : Donor and Receiver dashboards
   This file is done by Sadib.
   showError(), showSuccess(), clearErrors() and showTab()
   come from login.js, which is loaded before this file.
   ===================================================== */

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stops page reload on submit
  clearErrors(registerForm);

  let username = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirm = document.getElementById("confirmPassword");
  let role = document.querySelector('input[name="registerRole"]:checked');

  let valid = true;

  // Role (radio)
  if (role === null) {
    document.getElementById("registerRoleError").innerHTML = "Please choose Donor, Receiver, Staff or Medical Officer.";
    valid = false;
  }

  // Username: 5-12 characters, starts with a letter, only letters, digits and _
  if (username.value.trim() === "") {
    showError(username, "usernameError", "Username is required.");
    valid = false;
  } else if (!/^[A-Za-z][A-Za-z0-9_]{4,11}$/.test(username.value.trim())) {
    showError(username, "usernameError", "5-12 characters, start with a letter, only letters, digits and _ allowed.");
    valid = false;
  } else {
    showSuccess(username);
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "emailError", "Email is required.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, "emailError", "Invalid email address.");
    valid = false;
  } else {
    showSuccess(email);
  }

  // Password strength, checked step by step
  let pw = password.value;
  if (pw === "") {
    showError(password, "passwordError", "Password is required.");
    valid = false;
  } else if (pw.length < 8) {
    showError(password, "passwordError", "At least 8 characters.");
    valid = false;
  } else if (!/[A-Z]/.test(pw)) {
    showError(password, "passwordError", "Add at least one uppercase letter.");
    valid = false;
  } else if (!/[a-z]/.test(pw)) {
    showError(password, "passwordError", "Add at least one lowercase letter.");
    valid = false;
  } else if (!/[0-9]/.test(pw)) {
    showError(password, "passwordError", "Add at least one digit.");
    valid = false;
  } else if (!/[^A-Za-z0-9]/.test(pw)) {
    showError(password, "passwordError", "Add at least one special character.");
    valid = false;
  } else {
    showSuccess(password);
  }

  // Confirm password
  if (confirm.value === "") {
    showError(confirm, "confirmError", "Please confirm your password.");
    valid = false;
  } else if (confirm.value !== pw) {
    showError(confirm, "confirmError", "Passwords do not match.");
    valid = false;
  } else {
    showSuccess(confirm);
  }

  // Success
  if (valid) {
    let name = username.value.trim();
    let type = role.value;

    registerForm.reset();
    clearErrors(registerForm);
    alert("Account created for " + name + " as " + type + ". Please sign in.");

    // Go to the Sign In tab and fill in the new username
    showTab("signin");
    document.getElementById("loginUser").value = name;
  }
});
