import * as cartService from './services/cart.js';
import createItem from './services/item.js';

const cart = [];
const myWishlist = [];

console.log("Welcome to the Shopping Cart Service!");

const item1 = await createItem('Laptop', 1500, 1);
const item2 = await createItem('Mouse', 50, 2);

await cartService.addItem(cart, item1);
await cartService.addItem(cart, item2);
await cartService.updateItemQuantity(cart, 1);
await cartService.displayCart(cart);

// await cartService.deleteItem(cart, item2.name);

await cartService.calculateCartTotal(cart);