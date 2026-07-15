// Casos de uso dos itens do carrinho de compras

let nextId = 1;

// Criar item com subtotal
function createItem(name, price, quantity) {
  const item = {
    id: nextId++,
    name,
    price,
    quantity,
  };
  item.subtotal = () => item.price * item.quantity;
  return item;
}

export default createItem;