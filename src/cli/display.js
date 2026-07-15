// Funções de exibição do CLI (formatação e impressão no terminal)

import pc from 'picocolors';
import * as cartService from '../services/cart.js';
import catalog from '../data/catalog.js';

function menu() {
    return `
${pc.bold(pc.cyan('🛍️  Shopping Cart CLI'))}
${pc.blue('1.')} Adicionar item
${pc.blue('2.')} Remover item
${pc.blue('3.')} Atualizar quantidade de um item
${pc.blue('4.')} Listar itens do carrinho
${pc.blue('5.')} Calcular total do carrinho
${pc.blue('6.')} Sair
`;
}

function printCatalog() {
    console.log(pc.bold('\n📦 Itens disponíveis:'));
    catalog.forEach((catalogItem, index) => {
        console.log(`${pc.blue(`${index + 1}.`)} ${catalogItem.icon} ${catalogItem.name} - ${pc.yellow(`$${catalogItem.price.toFixed(2)}`)}`);
    });
}

// Formatar o carrinho em linhas de texto, prontas para exibição
function formatCart(cart) {
    return cart.map(
        (item, index) =>
            `${index + 1}. ${item.icon} ${item.name}: $${item.price.toFixed(2)} | ${item.quantity}x = $${item.subtotal().toFixed(2)}`
    );
}

function printCart(cart) {
    if (cart.length === 0) {
        console.log(pc.dim('\n🛒 Carrinho vazio.'));
        return;
    }
    console.log(pc.bold('\n🛒 Itens no carrinho:'));
    formatCart(cart).forEach((line) => console.log(line));
}

function printTotal(cart) {
    const total = cartService.calculateCartTotal(cart);
    console.log(pc.bold(`\n💰 Total do carrinho: ${pc.yellow(`$${total.toFixed(2)}`)}`));
}

function printSuccess(message) {
    console.log(pc.green(`✅ ${message}`));
}

function printError(message) {
    console.log(pc.red(`❌ ${message}`));
}

function printSeparator() {
    console.log(pc.dim('\n' + '─'.repeat(40)));
}

export {
    menu,
    printCatalog,
    printCart,
    printTotal,
    printSuccess,
    printError,
    printSeparator,
    formatCart,
};
