// Popula o carrinho com itens aleatórios do catálogo ao iniciar a aplicação

import * as cartService from '../services/cart.js';
import createItem from '../services/item.js';
import catalog from '../data/catalog.js';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seedRandomItems(cart, count) {
    const shuffled = [...catalog].sort(() => Math.random() - 0.5);
    shuffled.slice(0, count).forEach((catalogItem) => {
        const quantity = randomInt(1, 3);
        cartService.addItem(cart, createItem(catalogItem.name, catalogItem.price, quantity, catalogItem.icon));
    });
}

export { seedRandomItems };
