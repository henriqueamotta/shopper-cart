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

test('deleteItem remove o item pelo índice (1-based) e retorna true', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));
    cartService.addItem(cart, createItem('Mouse', 50, 1));

    const removed = cartService.deleteItem(cart, 2);

    assert.equal(removed, true);
    assert.equal(cart.length, 1);
    assert.equal(cart[0].name, 'Laptop');
});

test('deleteItem retorna false para índice fora do intervalo', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Mouse', 50, 1));

    assert.equal(cartService.deleteItem(cart, 0), false);
    assert.equal(cartService.deleteItem(cart, 2), false);
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

test('updateItemQuantity retorna false para quantidade negativa, zero ou fracionária', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));

    assert.equal(cartService.updateItemQuantity(cart, 1, -5), false);
    assert.equal(cartService.updateItemQuantity(cart, 1, 0), false);
    assert.equal(cartService.updateItemQuantity(cart, 1, 1.5), false);
    assert.equal(cart[0].quantity, 1);
});

test('deleteItem e updateItemQuantity retornam false para índice fracionário', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));
    cartService.addItem(cart, createItem('Mouse', 50, 1));

    assert.equal(cartService.deleteItem(cart, 1.5), false);
    assert.equal(cartService.updateItemQuantity(cart, 1.5, 3), false);
    assert.equal(cart.length, 2);
});

test('addItem retorna false para quantidade inválida ou preço negativo', () => {
    const cart = [];

    assert.equal(cartService.addItem(cart, createItem('Mouse', 50, -1)), false);
    assert.equal(cartService.addItem(cart, createItem('Mouse', 50, 0)), false);
    assert.equal(cartService.addItem(cart, createItem('Mouse', 50, 1.5)), false);
    assert.equal(cartService.addItem(cart, createItem('Mouse', -10, 1)), false);
    assert.equal(cart.length, 0);
});

test('addItem retorna false para preço NaN ou infinito', () => {
    const cart = [];

    assert.equal(cartService.addItem(cart, createItem('Mouse', NaN, 1)), false);
    assert.equal(cartService.addItem(cart, createItem('Mouse', Infinity, 1)), false);
    assert.equal(cart.length, 0);
});

test('calculateCartTotal soma os subtotais de todos os itens', () => {
    const cart = [];
    cartService.addItem(cart, createItem('Laptop', 1500, 1));
    cartService.addItem(cart, createItem('Mouse', 50, 2));

    assert.equal(cartService.calculateCartTotal(cart), 1600);
});
