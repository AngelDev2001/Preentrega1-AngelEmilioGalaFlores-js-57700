import { categories } from "../data-list/categories.js";

const btnShowNavbar = document.querySelector(".btn-show-navbar");
const btnCloseNavbar = document.querySelector(".btn-close-navbar");
const navbar = document.querySelector(".navbar");

const btnShowCart = document.querySelectorAll(".btn-show-cart");
const btnCartClose = document.querySelector(".btn-close-cart");

const cartContainer = document.querySelector(".cart");
const cartProductsContainer = document.querySelector(".cart__products");

const category = document.querySelector(".main__category-items");

const quantityProductsCart = document.querySelectorAll(
  ".quantity-products-cart"
);
const productsSection = document.querySelector(".main__products") || [];
const totalPagar = document.querySelector(".total-pagar");
const contenedorProductosPage = document.querySelector(
  ".shopping-cart-container .products-container .products"
);

const subTotalPageCart = document.querySelector(".order-summary__subtotal");
const totalPageCart = document.querySelector(".order-summary__total");

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

let cart = [];

window.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
  let productosLocalStorage = JSON.parse(localStorage.getItem("cart"));
  cart = [...productosLocalStorage];
  console.log(productosLocalStorage);
  verCarrito();
  pintarContenedorCarritoPagina();
});

const products = [
  {
    id: "1",
    name: "Producto 1",
    price: 36.99,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-zapatillas-wwlDHh.png",
  },
  {
    id: "2",
    name: "Producto 2",
    price: 62.99,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-zapatillas-wwlDHh.png",
  },
  {
    id: "3",
    name: "Producto 3",
    price: 163.99,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-zapatillas-wwlDHh.png",
  },
  {
    id: "4",
    name: "Producto 4",
    price: 83.99,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-zapatillas-wwlDHh.png",
  },
];

categories.map((_category) => {
  category.innerHTML += `
  <article>
    <img src="${_category.src}" alt="${_category.alt}" />
    <span>${_category.title}</span>
  </article>
  `;
});

const renderizarProductos = () => {
  products.forEach((product) => {
    productsSection.innerHTML += `
    <article class="main__product">
      <img src="${product.image}" alt="" />
      <div class="main__product-text">
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
      let existsProduct = cart.find(
        (cartProduct) => cartProduct.id === e.target.id
      );

      if (existsProduct) {
        existsProduct.quantity++;
      } else {
        let product = products.find((_product) => _product.id === e.target.id);
        cart.push({ quantity: 1, ...product });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      verCarrito();
      pintarContenedorCarritoPagina();
      console.log(cart);
    });
  });
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
          <span class="product-details__price-by-unit">${producto.price}</span>
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

  quantityProductsCart.forEach((quantity) => {
    quantity.textContent = cart.length;
  });

  let dineroApagar = cart.reduce(
    (acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity,
    0
  );

  subTotalPageCart.textContent = dineroApagar.toFixed(2);
  totalPageCart.textContent = dineroApagar.toFixed(2);
  console.log(cart);
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
