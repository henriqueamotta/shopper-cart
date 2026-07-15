function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

// Converter um índice 1-based (voltado ao usuário) para o índice 0-based do array,
// retornando -1 se não for um inteiro ou estiver fora dos limites do carrinho
function toArrayIndex(userCart, index) {
    if (!Number.isInteger(index)) {
        return -1;
    }

    const itemIndex = index - 1;
    return itemIndex >= 0 && itemIndex < userCart.length ? itemIndex : -1;
}

// Adicionar um item ao carrinho, somando a quantidade se já existir um item com o mesmo nome
// Retorna true se adicionou, false se o item violar as invariantes de domínio
function addItem(userCart, item) {
    if (!isPositiveInteger(item.quantity) || typeof item.price !== 'number' || item.price < 0) {
        return false;
    }

    const existingItem = userCart.find(
        (cartItem) => cartItem.name.toLowerCase() === item.name.toLowerCase()
    );

    if (existingItem) {
        existingItem.quantity += item.quantity;
        return true;
    }

    userCart.push(item);
    return true;
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
    if (!isPositiveInteger(newQuantity)) {
        return false;
    }

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
