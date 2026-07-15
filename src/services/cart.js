// Converter um índice 1-based (voltado ao usuário) para o índice 0-based do array,
// retornando -1 se estiver fora dos limites do carrinho
function toArrayIndex(userCart, index) {
    const itemIndex = index - 1;
    return itemIndex >= 0 && itemIndex < userCart.length ? itemIndex : -1;
}

// Adicionar um item ao carrinho, somando a quantidade se já existir um item com o mesmo nome
function addItem(userCart, item) {
    const existingItem = userCart.find(
        (cartItem) => cartItem.name.toLowerCase() === item.name.toLowerCase()
    );

    if (existingItem) {
        existingItem.quantity += item.quantity;
        return;
    }

    userCart.push(item);
}

// Deletar um item do carrinho pelo índice (1-based, voltado ao usuário)
// Retorna true se removeu, false se o índice for inválido
function deleteItem(userCart, index) {
    const itemIndex = toArrayIndex(userCart, index);

    if (itemIndex === -1) {
        return false;
    }

    userCart.splice(itemIndex, 1);
    return true;
}

// Atualizar a quantidade de um item no carrinho (índice 1-based, voltado ao usuário)
// Retorna true se atualizou, false se o índice for inválido
function updateItemQuantity(userCart, index, newQuantity) {
    const itemIndex = toArrayIndex(userCart, index);

    if (itemIndex === -1) {
        return false;
    }

    userCart[itemIndex].quantity = newQuantity;
    return true;
}

// Calcular o total do carrinho
function calculateCartTotal(userCart) {
    return userCart.reduce((total, item) => total + item.subtotal(), 0);
}

// Formatar o carrinho em linhas de texto, prontas para exibição
function formatCart(userCart) {
    return userCart.map(
        (item, index) =>
            `${index + 1}. ${item.icon} ${item.name}: $${item.price.toFixed(2)} | ${item.quantity}x = $${item.subtotal().toFixed(2)}`
    );
}

export { addItem, deleteItem, updateItemQuantity, calculateCartTotal, formatCart };
