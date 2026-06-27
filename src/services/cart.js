// Ações do carrinho de compras

// Adicionar um item ao carrinho
async function addItem(userCart, item) {
    userCart.push(item);
}

// Deletar um item do carrinho
async function deleteItem(userCart, name) {
    const itemIndex = userCart.findIndex((item) => item.name === name);
    if (itemIndex !== -1) {
        userCart.splice(itemIndex, 1);
    }
}


// Atualizar a quantidade de um item no carrinho
async function updateItemQuantity(userCart, index) {
    // Transformar o índice do usuário em índice do array (back-end)
    const deletedIndex = index - 1;

    if (index >= 0 && index < userCart.length){
        userCart.splice(deletedIndex, 1);
    }
}

// Calcular o total do carrinho
async function calculateCartTotal(userCart) {
    console.log("\n 🛍️ Shopping Cart Total:");
    const result =  userCart.reduce((total, item) => total + item.subtotal(), 0);
    console.log(`$${result.toFixed(2)}`);
}

// Exibir o carrinho de compras
async function displayCart(userCart) {
    console.log("\n Shopping Cart list:"); 
    userCart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name}: $${item.price.toFixed(2)} | ${item.quantity}x = $${item.subtotal().toFixed(2)}`);
    });
}

export { addItem, deleteItem, updateItemQuantity, calculateCartTotal, displayCart };