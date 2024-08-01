const productsSection = document.querySelector(".products");

const fetchProducts = async () => {
  const response = await fetch("../data-list/products.json");
  const data = await response.json();
  renderCategories(data.categories);
  renderProducts(data.products);
};

const renderProducts = (products) => {
  products.forEach((product) => {
    productsSection.innerHTML += `
      <article class="product">
        <img src="${product.image}" alt="" />
        <div class="product__text">
          <span>${product.name}</span>
          <span>${product.price}</span>
        </div>
        <button class="product-button" id="${product.id}">Agregar al carrito</button>
      </article>`;
  });

  getButtonsPoducts(".product-button");
};

const getButtonsPoducts = (buttons) => {
  let buttonsProducts = document.querySelectorAll(buttons);
  agregarProducto(buttonsProducts);
};

const agregarProducto = (buttonsProducts) => {
  buttonsProducts.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(cart);
      let existsProduct = cart.find(
        (cartProduct) => cartProduct.id === e.target.id
      );

      console.log(existsProduct);

      if (existsProduct) {
        existsProduct.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        verCarrito();
      } else {
        getProduct(e.target.id);
      }
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
