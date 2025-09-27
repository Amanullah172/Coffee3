
  // All products data
  let products = [
    { id: 1, name: "Cappuccino", price: 9.50, desc: "Coffee 50% | Milk 50%", image: "./coffee card 1.jpg" },
    { id: 2, name: "Chai Latte", price: 20.50, desc: "Sweet and spicy chai with milk", image: "./coffee card2.jpg" },
    { id: 3, name: "Macchiato", price: 19.50, desc: "Strong espresso with milk foam", image: "./coffee card 3.jpg" },
    { id: 4, name: "Espresso", price: 11.50, desc: "Pure, strong black coffee", image: "./coffee card 4.jpg" }
  ];

  let cart = [];
  let cartCount = 0;

  // Add to cart
  function orderNow(id) {
    let product = products.find(p => p.id === id);
    let cartItem = cart.find(item => item.id === id);

    if (cartItem) {
      cartItem.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    cartCount++;
    document.getElementById("cartCount").textContent = cartCount;
    showCart();
  }

  // Show cart items
  function showCart() {
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      let li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="40">
        <div>
          <strong>${item.name}</strong><br>
          ${item.desc}<br>
          $${item.price} x ${item.qty}
        </div>
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      cartItems.appendChild(li);
    });

    document.getElementById("totalAmount").textContent = "Total: $" + total.toFixed(2);
  }

  // Remove item
  function removeFromCart(index) {
    cartCount -= cart[index].qty;
    cart.splice(index, 1);
    document.getElementById("cartCount").textContent = cartCount;
    showCart();
  }

  // Toggle cart box
  function toggleCart() {
    let cartBox = document.getElementById("cartBox");
    cartBox.style.display = (cartBox.style.display === "block") ? "none" : "block";
  }

  // Place order
  function placeOrder() {
    if (cart.length === 0) {
      Swal.fire({
  icon: "info",
  title: "Your cart is empty!",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500
});

      return;
    }

    let total = 0;
    cart.forEach(item => total += item.price * item.qty);

   Swal.fire({
  icon: "success",
  title: "✅ Thanks for your order!",
  text: "You ordered items worth $" + total.toFixed(2),
  confirmButtonText: "OK"
});


    // reset cart
    cart = [];
    cartCount = 0;
    document.getElementById("cartCount").textContent = cartCount;
    showCart();
    toggleCart();
  }

// order form after cart
function placeOrder() {
    if (cart.length === 0) {
      Swal.fire({
  icon: "info",
  title: "Your cart is empty!",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500
});

      return;
    }
    document.getElementById("checkoutForm").style.display = "flex";
  }

  // Close checkout form
  function closeForm() {
    document.getElementById("checkoutForm").style.display = "none";
  }

  // Confirm Order
  function confirmOrder() {
    let name = document.getElementById("custName").value.trim();
    let phone = document.getElementById("custPhone").value.trim();
    let address = document.getElementById("custAddress").value.trim();
    let date = document.getElementById("orderDate").value;
    let time = document.getElementById("orderTime").value;
    let payment = document.getElementById("paymentMethod").value;

    if (name === "" || phone === "" || address === "" || date === "" || time === "") {
      Swal.fire({
  icon: "warning",
  title: "Missing Information",
  text: "Please fill all details before confirming order!",
  confirmButtonText: "OK"
});

      return;
    }

    let total = 0;
    cart.forEach(item => total += item.price * item.qty);

Swal.fire({
  icon: "success",
  title: "✅ Order Confirmed!",
  html: `
    <b>Thanks ${name}!</b><br><br>
    Your order of <b>$${total.toFixed(2)}</b> has been placed.<br><br>
    📞 <b>Phone:</b> ${phone}<br>
    📍 <b>Address:</b> ${address}<br>
    🕒 <b>Delivery:</b> ${date} at ${time}<br>
    💳 <b>Payment:</b> ${payment}
  `,
  confirmButtonText: "Great!"
});


    // reset cart
    cart = [];
    cartCount = 0;
    document.getElementById("cartCount").textContent = cartCount;
    showCart();
    closeForm();
    toggleCart(); // close cart box too
  }
// after login or sign up
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const authLinks = document.getElementById("auth-links");
  const profileSection = document.getElementById("profile-section");
  const usernameDisplay = document.getElementById("username-display");
  const logoutBtn = document.getElementById("logout-btn");

  if (loggedInUser) {
    // Hide Sign in/Sign up
    authLinks.style.display = "none";
    // Show profile + name
    profileSection.style.display = "inline-flex";
    usernameDisplay.textContent = loggedInUser.username || "User";
  }

  // Logout button action
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload(); // Refresh page -> shows Sign in/Sign up again
    });
  }