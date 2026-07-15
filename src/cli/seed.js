// Popula o carrinho com itens aleatórios do catálogo ao iniciar a aplicação

import * as cartService from '../services/cart.js';
import createItem from '../services/item.js';
import catalog from '../data/catalog.js';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Embaralhar com Fisher-Yates para garantir distribuição uniforme
// (sort(() => Math.random() - 0.5) enviesa o resultado)
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function seedRandomItems(cart, count) {
    const shuffled = shuffle(catalog);
    shuffled.slice(0, count).forEach((catalogItem) => {
        const quantity = randomInt(1, 3);
        cartService.addItem(cart, createItem(catalogItem.name, catalogItem.price, quantity, catalogItem.icon));
    });
}

export { seedRandomItems };
