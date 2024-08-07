const btnShowNavbar = document.querySelector(".btn-show-navbar");
const btnCloseNavbar = document.querySelector(".btn-close-navbar");
const navbar = document.querySelector(".navbar");

const btnShowCart = document.querySelectorAll(".btn-show-cart");
const btnCartClose = document.querySelector(".btn-close-cart");

const cartContainer = document.querySelector(".cart");
const cartProductsContainer = document.querySelector(".cart__products");

const quantityProductsCart = document.querySelectorAll(
  ".quantity-products-cart"
);

const totalPagar = document.querySelector(".total-pagar");

btnShowNavbar.addEventListener("click", () => {
  navbar.classList.add("navbar--active");
});

btnCloseNavbar.addEventListener("click", () => {
  navbar.classList.remove("navbar--active");
});

btnShowCart.forEach((btn) => {
  btn.addEventListener("click", () => {
    cartContainer.classList.add("cart--active");
  });
});

btnCartClose.addEventListener("click", () => {
  cartContainer.classList.remove("cart--active");
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const getProduct = async (productId) => {
  const response = await fetch("../data-list/products.json");
  const data = await response.json();
  let product = await data.products.find(
    (_product) => _product.id === productId
  );

  await cart.push({ quantity: 1, ...product });
  localStorage.setItem("cart", JSON.stringify(cart));
  verCarrito();
};

const verCarrito = () => {
  cartProductsContainer.innerHTML = "";

  cart.forEach((product) => {
    cartProductsContainer.innerHTML += `
    <article class="product">
      <div class="product__image">
        <img src="${product.image}" alt="" />
      </div>
      <div>
        <div class="product__text">
          <span>${product.name}</span>
          <span>${product.price}</span>
        </div>
        <div class="product__quantity">
          <button class="disminuir-unidad">-</button>
          <input type="number" value="${product.quantity}" id="${product.id}" />
          <button class="aumentar-unidad">+</button>
        </div>
      </div>
    </article>`;
  });

  getDecreaseButtons(".disminuir-unidad");
  getIncreaseButtons(".aumentar-unidad");

  quantityProductsCart.forEach((quantity) => {
    quantity.textContent = cart.length;
  });

  let dineroApagar = cart.reduce(
    (acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity,
    0
  );

  totalPagar.textContent = dineroApagar.toFixed(2);
};

const getDecreaseButtons = (buttons) => {
  let btnDisminuir = document.querySelectorAll(buttons);
  btnChangeQuantity(btnDisminuir, "decrease");
};

const getIncreaseButtons = (buttons) => {
  let btnAumentar = document.querySelectorAll(buttons);
  btnChangeQuantity(btnAumentar, "increase");
};

const btnChangeQuantity = (element, activity) => {
  element.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let productId = e.target.parentNode.children[1].id;
      cart.find((cartProduct) => {
        if (cartProduct.id === productId && activity === "decrease") {
          cartProduct.quantity--;
        }

        if (cartProduct.id === productId && activity === "increase") {
          cartProduct.quantity++;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      verCarrito();
      pintarContenedorCarritoPagina();
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  verCarrito();
});
