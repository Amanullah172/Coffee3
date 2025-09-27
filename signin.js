// function signInUser() {
//   let username = document.getElementById("loginUsername").value.trim().toLowerCase();
//   let email = document.getElementById("loginEmail").value.trim().toLowerCase();
//   let password = document.getElementById("loginPassword").value;

//   if (username === "" || email === "" || password === "") {
//    Swal.fire({
//   icon: "warning",
//   title: "Please enter all fields",
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 2500
// });

//     return false;
//   }

//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   let found = users.find(u => 
//     u.username.toLowerCase() === username &&
//     u.email === email &&
//     u.password === password
//   );

//   if (!found) {
//     Swal.fire({
//   icon: "error",
//   title: "Invalid credentials",
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 2500
// });

//     return false;
//   }

//   if (username === "raza" && email === "razakhan255225@gmail.com" && password === "raza") {
//    Swal.fire({
//   icon: "success",
//   title: "👑 Welcome Admin!",
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 2500
// });

//     window.location.href = "dashboard.html";
//   } else {
//     Swal.fire({
//   icon: "success",
//   title: "🎉 Welcome!",
//   html: "Hello <b style='color:green'>" + found.username + "</b>",
//   confirmButtonText: "Continue"
// });

//     window.location.href = "main.html";
//   }

//   return false;
// }
function signInUser() {
  let username = document.getElementById("loginUsername").value.trim().toLowerCase();
  let email = document.getElementById("loginEmail").value.trim().toLowerCase();
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(u => (u.username.toLowerCase() === username || u.email.toLowerCase() === email) && u.password === password);

  if (!found) {
    Swal.fire({
      icon: "error",
      title: "❌ Invalid Credentials",
      text: "Username/email or password is incorrect."
    });
    return;
  }

  // ✅ Save logged in user
  localStorage.setItem("loggedInUser", JSON.stringify(found));

  Swal.fire({
    icon: "success",
    title: "🎉 Welcome " + found.username,
    text: "You have successfully logged in."
  }).then(() => {
    window.location.reload(); // refresh to show profile section
  });
}
