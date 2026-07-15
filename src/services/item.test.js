import { test } from 'node:test';
import assert from 'node:assert/strict';
import createItem from './item.js';

test('createItem calcula subtotal a partir do preço e quantidade', () => {
    const item = createItem('Mouse', 50, 2);
    assert.equal(item.subtotal(), 100);
});

test('subtotal reflete mudanças feitas na quantidade do item', () => {
    const item = createItem('Mouse', 50, 2);
    item.quantity = 5;
    assert.equal(item.subtotal(), 250);
});
