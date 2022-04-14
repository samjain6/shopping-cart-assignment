const navbarView = `<header class="header">
<div class="top-header">
  <a href="/client/Login.html" class="signInbutton">SignIn</a>
  <a href="/client/SignUp.html" class="signInbutton">Register</a>
</div>
<section id="main-nav">
  <nav>
    <img
      src="/static/images/logo_2x.png"
      alt="My Portfolio"
      id="logo"
      height="50px"
    />
    <section class="link-section">
      <a href="/client/index.html">Home</a>
      <a href="/client/products.html">Products</a>
    </section>
  </nav>
  <button id="cart-button" class="cart-button">
    <i class="fas fa-solid fa-cart-arrow-down cart-icon"></i>
    &nbsp;&nbsp;0 items
  </button>
</section>
</header>`;

const cartItem = `<div class="cartItemView">
<div class="cartItem">
<img class="cartProductImg" alt="product-image" height="70px"></img>
<div class="cartItemDetails">
  <h6 class="cart-title"></h6>
  <div class="cartTotal">
    <button class="op-button">+</button>
    <span class="itemQuantity">1</span>
    <button class="op-button">-</button>
    <span class="price">&times;</span>
  </div>
</div>
</div>
  <span class="totalPrice"></span>
</div>`;

customElements.define(
  "my-header",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      var navbar = document.createElement("div");
      navbar.innerHTML = navbarView;
      this.appendChild(navbar.firstChild);
      this.addEvents();
    }

    addEvents = () => {
      const cartButton = this.getElementsByClassName("cart-button");
      let storageArray = JSON.parse(localStorage.getItem("cart")) || [];
      cartButton[0].addEventListener("click", this.onCartButtonClick, false);
      cartButton[0].innerHTML = `<i class="fas fa-solid fa-cart-arrow-down cart-icon"></i>
      &nbsp;&nbsp;${storageArray.length} items`;
    };

    onCartButtonClick = () => {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      this.fetchCartItems();
    };

    fetchCartItems = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartItems.length > 0) this.setCartHtml(cartItems);
    };

    setCartHtml = (data) => {
      const cartElement = document.getElementsByClassName("modal-body")[0];
      cartElement.innerHTML = "";
      cartElement.classList.remove("modal-align");
      var modalFooter = document.getElementsByClassName("modal-footer")[0];
      modalFooter.style.display = "block";
      const cartProducts = [];
      data.forEach((element) => {
        const id = element.id;
        const index = cartProducts.findIndex((f) => f.id === id);
        if (index > 1) {
          const updatedItem = {
            ...cartProducts[index],
            quantity: cartProducts[index].quantity + 1,
          };
          cartProducts.splice(index, 1, updatedItem);
        } else {
          cartProducts.push({ ...element, quantity: 1 });
        }
      });

      let totalPrice = 0;

      cartProducts.forEach((item) => {
        const cartItemEl = document.createElement("div");
        cartItemEl.innerHTML = cartItem;
        const imgEl = cartItemEl.getElementsByClassName("cartProductImg")[0];
        imgEl.src = item.imageURL;
        const titleEl = cartItemEl.getElementsByClassName("cart-title")[0];
        titleEl.innerHTML = item.name;
        const quantityEl = cartItemEl.getElementsByClassName("itemQuantity")[0];
        quantityEl.innerHTML = item.quantity;
        const totalEl = cartItemEl.getElementsByClassName("totalPrice")[0];
        totalEl.innerHTML = `Rs.${item.quantity * item.price}`;
        totalPrice = totalPrice + item.quantity * item.price;
        const priceEl = cartItemEl.getElementsByClassName("price")[0];
        priceEl.innerHTML = `&times; Rs.${item.price}`;
        cartElement.appendChild(cartItemEl.firstChild);
      });

      const totalBillEl = document.getElementsByClassName("totalBill")[0];
      totalBillEl.innerHTML = `Rs.${totalPrice}`;
    };
  }
);
