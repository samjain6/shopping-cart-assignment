const homeParent = `<div class="homeParent">
<div class="slideshow-container">
<a class="prev">❮</a>
<a class="next">❯</a>
</div>
<br>
<div class="dot-container" style="text-align:center">
</div>
<div class="categoryView"></div>
</div>`;

const categoryItem = `<div class="category-item">
<img alt="category-image" class="product-image" height="150px" />
<div class="categoryDetails">
  <h4 class="product-title"></h4>
  <p class="product-desc"></p>
  <button class="explore-button">Buy Now</button>
</div>
</div>`;

const carouselBody = `<div class="mySlides fade">
<img class="carousel-img" height="200px" width="100%"/>
</div>`;

customElements.define(
  "my-home",
  class extends HTMLElement {
    constructor() {
      super();
      this.categories = [];
      this.slideIndex = 1;
    }

    connectedCallback() {
      var productsView = document.createElement("div");
      productsView.innerHTML = homeParent;
      this.appendChild(productsView.firstChild);
      this.getAllCategories();
      this.getBanners();
    }

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

    setCategoriesHTML = (data) => {
      var listElements = this.getElementsByClassName("categoryView");
      data.forEach((item, index) => {
        var productItem = document.createElement("div");
        productItem.innerHTML = categoryItem;
        var h3elements = productItem.getElementsByClassName("product-title");
        h3elements[0].innerHTML = item.name;
        var imgElements = productItem.getElementsByClassName("product-image");
        imgElements[0].src = item.imageUrl || "";
        var pElements = productItem.getElementsByClassName("product-desc");
        pElements[0].innerHTML = item.description;
        var buttonElements =
          productItem.getElementsByClassName("explore-button");
        buttonElements[0].innerHTML = `Explore ${item.key}`;
        buttonElements[0].onclick = () => {
          location.href = `/client/Products.html?key=${item.id}`;
        };
        listElements[0].appendChild(productItem.firstChild);
      });
    };

    getBanners = () => {
      fetch("./../../server/banners/index.get.json")
        .then((banners) => {
          banners.json().then((data) => {
            this.setBannersHtml(data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    setBannersHtml = (data) => {
      var listElements = this.getElementsByClassName("slideshow-container");
      var dotElements = this.getElementsByClassName("dot-container");

      data.forEach((item, index) => {
        var carouselItem = document.createElement("div");
        carouselItem.innerHTML = carouselBody;
        var imgElements = carouselItem.getElementsByClassName("carousel-img");
        imgElements[0].src = item.bannerImageUrl || "";
        imgElements[0].alt = item.bannerImageAlt || "";
        listElements[0].appendChild(carouselItem.firstChild);

        var dotItem = document.createElement("span");
        dotItem.className = "dot";
        dotItem.addEventListener(
          "click",
          () => this.currentSlide(index + 1),
          false
        );
        dotElements[0].appendChild(dotItem);
      });

      var aELements = this.getElementsByClassName("prev");
      aELements[0].addEventListener("click", () => this.plusSlides(-1), false);
      var aELements = this.getElementsByClassName("next");
      aELements[0].addEventListener("click", () => this.plusSlides(1), false);
      this.showSlides(this.slideIndex);
    };

    plusSlides = (n) => {
      this.showSlides((this.slideIndex += n));
    };

    currentSlide = (n) => {
      this.showSlides((this.slideIndex = n));
    };

    showSlides = (n) => {
      let i;
      let slides = this.getElementsByClassName("mySlides");
      let dots = this.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
    };
  }
);
