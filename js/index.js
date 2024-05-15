let addProduct = prompt("¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena");

const products = [
  {
    id: 1,
    name: "Arroz",
    price: 3.5
  },
  {
    id: 2,
    name: "Azúcar",
    price: 2
  },
  {
    id: 3,
    name: "Avena",
    price: 1.8
  },
];

const cart = [];

const response = () => {
    products.find(product => {
        if(product.id == addProduct){
            alert(`Usted desea comprar:\n- ${product.name} = S/ ${product.price.toFixed(2)}`);
            let question = prompt("1. Desea seguir comprando\n2. Realizar el pago");
            question == "1" ? prompt("¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena") :  alert(`Usted desea comprar:\n- ${product.name} = S/ ${product.price.toFixed(2)}`);;
            let moneyConsultation = +prompt("¿Con cuánto dinero va a cancelar?");
            restMoney(moneyConsultation, product);
        }
    })
};

const restMoney = (moneyConsultation, product) => {
    console.log(product);
    let finalPrice = moneyConsultation - product.price;
    alert(`Su vuelto es: S/ ${finalPrice.toFixed(2)}`);
}

response();

const buyOrPay = (question) => {

  addProduct = prompt("¿Qué producto desea comprar?\n1. Arroz\n2. Azúcar\n3. Avena")

  cart.push(addProduct)

}


