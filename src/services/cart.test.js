import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as cartService from './cart.js';
import createItem from './item.js';

test('addItem soma a quantidade quando o item já existe no carrinho', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Mouse', 50, 1));
    cartService.addItem(cart, createItem('Mouse', 50, 2));

    assert.equal(cart.length, 1);
    assert.equal(cart[0].quantity, 3);
});

test('deleteItem remove o item pelo nome e retorna true', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Mouse', 50, 1));

    const removed = cartService.deleteItem(cart, 'Mouse');

    assert.equal(removed, true);
    assert.equal(cart.length, 0);
});

test('deleteItem retorna false quando o item não existe', () => {
    const cart = [];
    const removed = cartService.deleteItem(cart, 'Mouse');
    assert.equal(removed, false);
});

test('updateItemQuantity atualiza a quantidade do item no índice informado (1-based)', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));
    cartService.addItem(cart, createItem('Mouse', 50, 2));

    const updated = cartService.updateItemQuantity(cart, 2, 5);

    assert.equal(updated, true);
    assert.equal(cart[1].quantity, 5);
    assert.equal(cart[0].quantity, 1);
});

test('updateItemQuantity funciona para o último item do carrinho (regressão do off-by-one)', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));

    const updated = cartService.updateItemQuantity(cart, 1, 10);

    assert.equal(updated, true);
    assert.equal(cart[0].quantity, 10);
});

test('updateItemQuantity retorna false para índice fora do intervalo', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));

    assert.equal(cartService.updateItemQuantity(cart, 0, 5), false);
    assert.equal(cartService.updateItemQuantity(cart, 2, 5), false);
});

test('calculateCartTotal soma os subtotais de todos os itens', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));
    cartService.addItem(cart, createItem('Mouse', 50, 2));

    assert.equal(cartService.calculateCartTotal(cart), 1600);
});

test('formatCart formata cada item do carrinho em uma linha legível', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Mouse', 50, 2, '🖱️'));

    const lines = cartService.formatCart(cart);

    assert.equal(lines.length, 1);
    assert.equal(lines[0], '1. 🖱️ Mouse: $50.00 | 2x = $100.00');
});
