// Casos de uso dos itens do carrinho de compras

// Criar item com subtotal
function createItem(name, price, quantity, icon = '📦') {
  const item = {
    name,
    price,
    quantity,
    icon,
  };
  item.subtotal = () => item.price * item.quantity;
  return item;
}

export default createItem;