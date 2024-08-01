const contenedorProductosPage = document.querySelector(".products-cart");
const subTotalPageCart = document.querySelector(".order-summary__subtotal");
const totalPageCart = document.querySelector(".order-summary__total");

const pintarContenedorCarritoPagina = () => {
  contenedorProductosPage.innerHTML = "";
  cart.forEach((producto) => {
    contenedorProductosPage.innerHTML += `
    <article>
      <div class="product-image">
        <img
        src="${producto.image}"
        alt=""
        />
      </div>
      <div class="product-details">
        <div>
          <span class="product-details__name">${producto.name}</span>
          <div>
            <span>S/ </span>
            <span class="product-details__price-by-unit">${
              producto.price
            }</span>
          </div>
        </div>
        <div class="product-details__quantity">
          <div>
            <button class="disminuir-unidad-page">-</button>
            <input type="number" value="${producto.quantity}" id="${
      producto.id
    }" />
            <button class="aumentar-unidad-page">+</button>
          </div>
          <div>
            <span>S/ </span>
            <span class="product-details__total-price">${
              producto.quantity * producto.price
            }</span>
          </div>
        </div>
      </div>
      <div>
        <i class="fa-solid fa-trash delete-button ${producto.id}"></i>
      </div>
    </article>
  `;
  });

  getDecreaseButtons(".disminuir-unidad-page");
  getIncreaseButtons(".aumentar-unidad-page");
  getDeleteButtons(".delete-button");

  quantityProductsCart.forEach(
    (quantity) => (quantity.textContent = cart.length)
  );

  let dineroApagar = cart.reduce(
    (acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity,
    0
  );

  subTotalPageCart.textContent = dineroApagar.toFixed(2);
  totalPageCart.textContent = dineroApagar.toFixed(2);
};

const getDeleteButtons = (buttons) => {
  let btnDelete = document.querySelectorAll(buttons);
  deleteProduct(btnDelete);
};

const deleteProduct = (btnDelete) => {
  btnDelete.forEach((_btnDelete) => {
    _btnDelete.addEventListener("click", (e) => {
      cart = cart.filter(
        (cartProduct) => cartProduct.id !== e.target.classList[3]
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      verCarrito();
      pintarContenedorCarritoPagina();
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  pintarContenedorCarritoPagina();
});
