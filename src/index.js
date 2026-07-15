import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import pc from 'picocolors';
import * as cartService from './services/cart.js';
import createItem from './services/item.js';
import catalog from './data/catalog.js';

const cart = [];
const rl = createInterface({ input, output });

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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seedRandomItems(count) {
    const shuffled = [...catalog].sort(() => Math.random() - 0.5);
    shuffled.slice(0, count).forEach((catalogItem) => {
        const quantity = randomInt(1, 3);
        cartService.addItem(cart, createItem(catalogItem.name, catalogItem.price, quantity, catalogItem.icon));
    });
}

function printCatalog() {
    console.log(pc.bold('\n📦 Itens disponíveis:'));
    catalog.forEach((catalogItem, index) => {
        console.log(`${pc.blue(`${index + 1}.`)} ${catalogItem.icon} ${catalogItem.name} - ${pc.yellow(`$${catalogItem.price.toFixed(2)}`)}`);
    });
}

function printCart() {
    if (cart.length === 0) {
        console.log(pc.dim('\n🛒 Carrinho vazio.'));
        return;
    }
    console.log(pc.bold('\n🛒 Itens no carrinho:'));
    cartService.formatCart(cart).forEach((line) => console.log(line));
}

function printTotal() {
    const total = cartService.calculateCartTotal(cart);
    console.log(pc.bold(`\n💰 Total do carrinho: ${pc.yellow(`$${total.toFixed(2)}`)}`));
}

function printSuccess(message) {
    console.log(pc.green(`✅ ${message}`));
}

function printError(message) {
    console.log(pc.red(`❌ ${message}`));
}

async function promptAddItem() {
    printCatalog();
    const choice = Number(await rl.question('Escolha o item pelo número: '));
    const catalogItem = catalog[choice - 1];

    if (!catalogItem) {
        printError('Item inválido.');
        return;
    }

    const quantity = Number(await rl.question('Quantidade: '));
    if (Number.isNaN(quantity) || quantity <= 0) {
        printError('Quantidade inválida.');
        return;
    }

    cartService.addItem(cart, createItem(catalogItem.name, catalogItem.price, quantity, catalogItem.icon));
    printSuccess(`${catalogItem.name} adicionado ao carrinho.`);
}

async function promptDeleteItem() {
    printCart();
    if (cart.length === 0) {
        return;
    }

    const name = await rl.question('Nome do item a remover: ');
    const removed = cartService.deleteItem(cart, name.trim());
    if (removed) {
        printSuccess(`${name} removido do carrinho.`);
    } else {
        printError(`Item "${name}" não encontrado.`);
    }
}

async function promptUpdateQuantity() {
    printCart();
    if (cart.length === 0) {
        return;
    }

    const index = Number(await rl.question('Número do item a atualizar: '));
    const quantity = Number(await rl.question('Nova quantidade: '));

    if (Number.isNaN(index) || Number.isNaN(quantity) || quantity <= 0) {
        printError('Dados inválidos.');
        return;
    }

    const updated = cartService.updateItemQuantity(cart, index, quantity);
    if (updated) {
        printSuccess('Quantidade atualizada.');
    } else {
        printError('Item não encontrado.');
    }
}

async function main() {
    console.log(pc.bold('Welcome to the Shopping Cart Service!'));
    seedRandomItems(3);

    let running = true;
    while (running) {
        console.log(menu());
        const choice = (await rl.question('Escolha uma opção: ')).trim();

        switch (choice) {
            case '1':
                await promptAddItem();
                break;
            case '2':
                await promptDeleteItem();
                break;
            case '3':
                await promptUpdateQuantity();
                break;
            case '4':
                printCart();
                break;
            case '5':
                printTotal();
                break;
            case '6':
                running = false;
                break;
            default:
                printError('Opção inválida. Escolha um número de 1 a 6.');
        }
    }

    console.log(pc.cyan('👋 Até a próxima!'));
    rl.close();
}

await main();
