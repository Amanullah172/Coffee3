let users = JSON.parse(localStorage.getItem("users")) || [];

function userDetails() {
  let fullName = document.getElementById("SiUsername").value.trim();
  let email = document.getElementById("Siemail").value.trim();
  let password = document.getElementById("Sipassword").value;
  let conPassword = document.getElementById("SiCpassword").value;

  if (fullName === "" || email === "" || password === "" || conPassword === "") {
    Swal.fire({
  icon: "warning",
  title: "⚠️ Missing Information",
  text: "Please fill all the fields",
  confirmButtonText: "OK"
});

    return false;
  }

  if (password !== conPassword) {
   Swal.fire({
  icon: "error",
  title: "❌ Password Error",
  text: "Passwords do not match",
  confirmButtonText: "Try Again"
});

    return false;
  }

  let exists = users.find(u => u.email === email);
  if (exists) {
   Swal.fire({
  icon: "error",
  title: "📧 Email Already Registered",
  text: "Please use a different email.",
  confirmButtonText: "OK"
});

    return false;
  }
let user = { username: fullName, email: email, password: password };
  users.push(user);

  // save users + auto-login
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  Swal.fire({
    icon: "success",
    title: "🎉 Signup successful!",
    text: "Welcome " + fullName,
  }).then(() => {
    window.location.reload(); // refresh -> profile shows
  });



  // Clear inputs
  document.getElementById("SiUsername").value = "";
  document.getElementById("Siemail").value = "";
  document.getElementById("Sipassword").value = "";
  document.getElementById("SiCpassword").value = "";

  // ✅ Signup ke baad dusre page pe redirect
  window.location.href = "index.html"; // apna homepage ya dashboard

  return false; // stop real form submit
}

