const loginView = `<div class="loginView">
<section class="labelView">
  <h1>Login</h1>
  <p class="subtitle">
    Get access to your Orders, Wishlist and Recommendations
  </p>
</section>
<section class="inputView">
  <div id="floatContainer" class="float-container floatContainer_1">
    <label for="floatField_1">Email</label>
    <input class="floatField_1" id="floatField_1" type="text" />
  </div>
  <div id="floatContainer" class="float-container floatContainer_2">
    <label for="floatField_2">Password</label>
    <input class="floatField_2" id="floatField_2" type="password" />
  </div>
  <button class="login-button">Login</button>
</section>
</div>`;

const signUpView = `<div class="loginView">
<section class="labelView">
  <h1>Signup</h1>
  <p class="subtitle">We do not share your personal details with anyone.</p>
</section>
<section class="inputView">
  <div id="floatContainer" class="float-container floatContainer_1">
    <label for="floatField_3">First Name</label>
    <input class="floatField_3" id="floatField_3" type="text" />
  </div>
  <div id="floatContainer" class="float-container floatContainer_2">
    <label for="floatField_4">Last Name</label>
    <input class="floatField_4" id="floatField_4" type="text" />
  </div>
  <div id="floatContainer" class="float-container floatContainer_3">
    <label for="floatField_5">Email</label>
    <input class="floatField_5" id="floatField_5" type="text" />
  </div>
  <div id="floatContainer" class="float-container floatContainer_4">
    <label for="floatField_6">Password</label>
    <input class="floatField_6" id="floatField_6" type="password" />
  </div>
  <div id="floatContainer" class="float-container floatContainer_5">
    <label for="floatField_7">Confirm Password</label>
    <input class="floatField_7" id="floatField_7" type="password" />
  </div>
  <button class="login-button">Signup</button>
</section>
</div>`;

customElements.define(
  "my-login",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const type = this.getAttribute("type");
      var loginPage = document.createElement("div");
      loginPage.innerHTML = type === "signup" ? signUpView : loginView;
      this.appendChild(loginPage.firstChild);
      this.addEventsForInputField();
    }

    addEventsForInputField = () => {
      // accessing the elements with same classname
      const elements = document.querySelectorAll('input[class^="floatField"]');

      elements.forEach((element, index) => {
        element.addEventListener("focus", () => {
          var elm = document.querySelector(
            `div[class~=${`floatContainer_${index + 1}`}]`
          );
          elm.classList.add("active_container");
        });
        element.addEventListener("blur", () => {
          var elm = document.querySelector(
            `div[class~=${`floatContainer_${index + 1}`}]`
          );
          elm.classList.remove("active_container");
        });
      });
    };
  }
);
