const cartView = `<div class="modal-content">
<div class="modal-header">
  <h2>My Cart</h2>
  <span class="close">&times;</span>
</div>
<div class="modal-body modal-align">
  No items in your cart
</div>
<div class="modal-footer">
  <p class="product-desc">Promo code can be applied on the payment page</p>
  <button class="checkout-button">
    <span>Proceed to Checkout</span>
    <span class="totalBill">Rs.187 ❯</span>
  </button>
</div>
</div>`;

customElements.define(
  "my-cart",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const element = document.createElement("div");
      element.innerHTML = cartView;
      this.appendChild(element.firstChild);
      this.addCartEvents();
      // this.fetchCartItems();
    }

    addCartEvents = () => {
      var span = document.getElementsByClassName("close")[0];
      var modal = document.getElementById("myModal");
      var button = this.getElementsByClassName("checkout-button")[0];

      button.onclick = () => {
        alert("Order Placed Successfully. Thanks for shopping");
        localStorage.removeItem("cart");
        var modalInner = document.getElementsByClassName("modal-body")[0];
        modalInner.innerHTML = "No items in your cart";
        modalInner.classList.add("modal-align");
        var modalFooter = document.getElementsByClassName("modal-footer")[0];
        modalFooter.style.display = "none";
        let cartButton = document.getElementById("cart-button");
        cartButton.innerHTML = `<i class="fas fa-solid fa-cart-arrow-down cart-icon"></i>
      &nbsp;&nbsp;0 items`;
      };
      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    };
  }
);
