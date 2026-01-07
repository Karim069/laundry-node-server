emailjs.init("UhqZIkn4EGBUSRPO0");

let cart = [];
let total = 0;

const toggleButtons = document.querySelectorAll(".toggle-btn");
const cartBody = document.getElementById("cartBody");
const totalPriceEl = document.querySelector(".total-price");
const bookBtn = document.querySelector(".book-now-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price, 10);

    const index = cart.findIndex((item) => item.name === name);

    if (index === -1) {
      cart.push({ name, price });
      total += price;

      btn.classList.add("active");
      btn.innerText = "Remove Item";
    } else {
      total -= cart[index].price;
      cart.splice(index, 1);

      btn.classList.remove("active");
      btn.innerText = "Add Item";
    }

    renderCart();
  });
});

function goTo(){
  document.getElementById("jump").scrollIntoView({ behavior: "smooth" });
}

function renderCart() {
  cartBody.innerHTML = "";

  cart.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price}.00</td>
    `;
    cartBody.appendChild(tr);
  });

  totalPriceEl.innerText = `₹${total}.00`;
}

bookBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all details");
    return;
  }

  if (cart.length === 0) {
    alert("Please add at least one service");
    return;
  }

  const params = {
    name: name,
    email: email,
    phone: phone,
    total: total,
    services: cart.map((i) => i.name).join(", "),
  };

  emailjs
    .send("service_85qnoa4", "template_6of6xbk", params)
    .then(() => {
      alert("Thank you For Booking the Service. We will get back to you soon!");

      cart = [];
      total = 0;
      renderCart();

      toggleButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.innerText = "Add Item";
      });

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch(() => {
      alert("Email failed. Please try again.");
    });
});

