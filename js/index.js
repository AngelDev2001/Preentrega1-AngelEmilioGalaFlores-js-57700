let userInput = +prompt("¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena\n(Ingrese los números)");

const PRODUCTS = [
  {
    id: 1,
    name: "Arroz",
    price: 3.5,
  },
  {
    id: 2,
    name: "Azúcar",
    price: 2,
  },
  {
    id: 3,
    name: "Avena",
    price: 1.8,
  },
];

const CART = [];

const addCart = (userInput) => {
  const newProduct = PRODUCTS.find((product) => product.id === userInput);
  CART.push(newProduct);

  let question = +prompt("1. Desea seguir comprando\n2. Realizar el pago");
  buyOrPay(question);
};

const buyOrPay = (question) => {
  if (question === 1) {
    userInput = +prompt("¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena\n(Ingrese los números)");
    addCart(userInput);
  } else if (question === 2) {
    CART.map((product) => {
      alert(
        `Usted desea comprar:\n- ${product.name} = S/ ${product.price.toFixed(2)}`
      );
    });

    const totalPrice = CART.reduce(
      (acumulator, product) => acumulator + product.price,
      0
    );

    alert(`El total a pagar es: S/ ${totalPrice.toFixed(2)}`);

    let userDinner = +prompt("Ingrese su dinero:");
    let calculo = userDinner - totalPrice;

    alert(`Su vuelto es: S/ ${calculo.toFixed(2)}.\nGracias por su compra :)`);
  }else{
    let question = +prompt("1. Desea seguir comprando\n2. Realizar el pago");
    buyOrPay(question);
  }
};

addCart(userInput);
