import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatCart } from './display.js';
import createItem from '../services/item.js';

test('formatCart formata cada item do carrinho em uma linha legível', () => {
    const cart = [];
    cart.push(createItem('Mouse', 50, 2, '🖱️'));

    const lines = formatCart(cart);

    assert.equal(lines.length, 1);
    assert.equal(lines[0], '1. 🖱️ Mouse: $50.00 | 2x = $100.00');
});
