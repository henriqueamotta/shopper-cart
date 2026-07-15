// Casos de uso dos itens do carrinho de compras

let nextId = 1;

// Criar item com subtotal
function createItem(name, price, quantity, icon = '📦') {
  const item = {
    id: nextId++,
    name,
    price,
    quantity,
    icon,
  };
  item.subtotal = () => item.price * item.quantity;
  return item;
}

export default createItem;