let userInput = prompt(
  "¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena\n(Ingrese los números)"
);

const PRODUCTS = [
  {
    id: "1",
    name: "Arroz",
    price: 3.5,
    amount: 0,
  },
  {
    id: "2",
    name: "Azúcar",
    price: 2,
    amount: 0,
  },
  {
    id: "3",
    name: "Avena",
    price: 1.8,
    amount: 0,
  },
];

const CART = [];

const addCart = (userInput) => {
  PRODUCTS.map((product) => {
    if (product.id === userInput) {
      if (product.amount === 0) {
        product.amount++;
        CART.push(product);
      } else {
        CART.map((_product) => {
          if (_product.id === product.id) {
            _product.amount++;
          }
        });
      }
    }
  });

  console.log({ CART });

  let question = prompt("1. Desea seguir comprando\n2. Realizar el pago");
  buyOrPay(question);
};

const buyOrPay = (question) => {
  let contado = "";

  if (question === "1") {
    userInput = prompt(
      "¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena\n(Ingrese los números)"
    );
    addCart(userInput);
  } else if (question === "2") {
    CART.map((product) => {
      contado += `- ${product.name} x Cantidad = ${
        product.amount
      } = S/ ${product.price.toFixed(2)}\n`;
    });

    alert(`Usted desea comprar:\n${contado}`);

    const totalPrice = CART.reduce(
      (acumulator, product) => acumulator + product.price * product.amount,
      0
    );

    alert(`El total a pagar es: S/ ${totalPrice.toFixed(2)}`);

    let userDinner = +prompt("Ingrese su dinero:");
    let calculo = userDinner - totalPrice;

    alert(`Su vuelto es: S/ ${calculo.toFixed(2)}.\nGracias por su compra :)`);
  } else {
    let question = prompt("1. Desea seguir comprando\n2. Realizar el pago");
    buyOrPay(question);
  }
};

addCart(userInput);
