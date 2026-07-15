// Handlers de cada opção do menu: leem input do usuário e chamam o cartService

import * as cartService from '../services/cart.js';
import createItem from '../services/item.js';
import catalog from '../data/catalog.js';
import { printCatalog, printCart, printSuccess, printError } from './display.js';

function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

async function promptAddItem(rl, cart) {
    printCatalog();
    const choice = Number(await rl.question('Escolha o item pelo número: '));
    const catalogItem = catalog[choice - 1];

    if (!catalogItem) {
        printError('Item inválido.');
        return;
    }

    const quantity = Number(await rl.question('Quantidade: '));
    if (!isPositiveInteger(quantity)) {
        printError('Quantidade inválida. Informe um número inteiro maior que zero.');
        return;
    }

    cartService.addItem(cart, createItem(catalogItem.name, catalogItem.price, quantity, catalogItem.icon));
    printSuccess(`${catalogItem.name} adicionado ao carrinho.`);
}

async function promptDeleteItem(rl, cart) {
    printCart(cart);
    if (cart.length === 0) {
        return;
    }

    const index = Number(await rl.question('Número do item a remover: '));

    if (Number.isNaN(index)) {
        printError('Número inválido.');
        return;
    }

    const removed = cartService.deleteItem(cart, index);
    if (removed) {
        printSuccess('Item removido do carrinho.');
    } else {
        printError('Item não encontrado.');
    }
}

async function promptUpdateQuantity(rl, cart) {
    printCart(cart);
    if (cart.length === 0) {
        return;
    }

    const index = Number(await rl.question('Número do item a atualizar: '));
    const quantity = Number(await rl.question('Nova quantidade: '));

    if (Number.isNaN(index) || !isPositiveInteger(quantity)) {
        printError('Dados inválidos. A quantidade deve ser um número inteiro maior que zero.');
        return;
    }

    const updated = cartService.updateItemQuantity(cart, index, quantity);
    if (updated) {
        printSuccess('Quantidade atualizada.');
    } else {
        printError('Item não encontrado.');
    }
}

export { promptAddItem, promptDeleteItem, promptUpdateQuantity };
