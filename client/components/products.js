var productParentHtml = `<div class="container">
<div class="menu">
  <ul class="menuList"></ul>
</div>
<div class="products"></div>
</div>
`;

var productItemHtml = `<div class="product_item">
<h6 class="product-title"></h6>
<br />
<img class="product-image" alt="product-image" height="150px" />
<br />
<div class="product-desc-box">
  <p class="product-desc"></p>
</div>
<br />
<div class="product-price-box">
  <span class="product-price"></span>
  <button class="buy-button">Buy Now</button>
</div>
</div>
`;

customElements.define(
  "my-products",
  class extends HTMLElement {
    constructor() {
      super();
      this.filter = "all";
      this.posts = [];
      this.categories = [];
    }

    connectedCallback() {
      this.getAllCategories();
    }

    onClickFilter = (event) => {
      const category = event.target["data-value"];
      this.filter = category;
      // const filteredPosts = this.posts.filter((f) => f.category === category);
      this.setProductsHtml(this.posts, category);
    };

    getAllCategories = () => {
      fetch("./../../server/categories/index.get.json")
        .then((categories) => {
          categories.json().then((data) => {
            this.categories = data;
            this.setCategoriesHTML(data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    getAllPosts = () => {
      fetch("./../../server/products/index.get.json")
        .then((responsePosts) => {
          responsePosts.json().then((data) => {
            this.posts = data;
            this.setProductsHtml(data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    setProductsHtml = (posts, filter) => {
      var url_string = window.location.href;
      var searchParams = new URL(url_string).searchParams;
      let filteredPosts = posts;
      if (filter) {
        filteredPosts = posts.filter((f) => f.category === filter);
        searchParams.set("key", filter);
        window.location.search = searchParams.toString();
      } else {
        var key = searchParams.get("key");
        if (key) filteredPosts = posts.filter((f) => f.category === key);
      }

      var postList = document.querySelector(".products");
      postList?.classList.remove("empty");
      postList.innerHTML = "";
      if (filteredPosts.length === 0) {
        postList.innerHTML = "No Products Found";
        postList.classList.add("empty");
        return;
      }
      for (let post of filteredPosts) {
        var productItem = document.createElement("div");
        productItem.innerHTML = productItemHtml;
        var h3elements = productItem.getElementsByClassName("product-title");
        h3elements[0].innerHTML = post.name;
        var imgElements = productItem.getElementsByClassName("product-image");
        imgElements[0].src = post.imageURL;
        var pElements = productItem.getElementsByClassName("product-desc");
        pElements[0].innerHTML = post.description;
        var spanElements = productItem.getElementsByClassName("product-price");
        spanElements[0].innerHTML = `MRP Rs.${post.price}`;
        var bElements = productItem.getElementsByClassName("buy-button");
        bElements[0].onclick = () => this.addCartProducts(post);
        postList.appendChild(productItem.firstChild);
      }
    };

    setCategoriesHTML = (data) => {
      var productsView = document.createElement("div");
      productsView.innerHTML = productParentHtml;
      var listElements =
        productsView.firstChild.getElementsByClassName("menuList");
      data.forEach((item, index) => {
        var listItem = document.createElement("li");
        listItem.className = "menuItem";
        listItem.innerHTML = item.name;
        listItem.addEventListener("click", this.onClickFilter, false);
        listItem["data-value"] = item.id;
        listElements[0].appendChild(listItem);
      });
      this.appendChild(productsView.firstChild);
      this.getAllPosts();
    };

    addCartProducts = (product) => {
      let storageArray = JSON.parse(localStorage.getItem("cart")) || [];
      let cartButton = document.getElementById("cart-button");
      storageArray.push(product);

      localStorage.setItem("cart", JSON.stringify(storageArray));

      cartButton.innerHTML = `<i class="fas fa-solid fa-cart-arrow-down cart-icon"></i>
      &nbsp;&nbsp;${storageArray.length} items`;
    };
  }
);
