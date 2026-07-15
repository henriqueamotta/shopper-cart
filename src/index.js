import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import pc from 'picocolors';
import { menu, printCart, printTotal, printError, printSeparator } from './cli/display.js';
import { promptAddItem, promptDeleteItem, promptUpdateQuantity } from './cli/prompts.js';
import { seedRandomItems } from './cli/seed.js';

const cart = [];
const rl = createInterface({ input, output });

async function main() {
    console.log(pc.bold('Welcome to the Shopping Cart Service!'));
    seedRandomItems(cart, 3);

    let running = true;
    while (running) {
        console.log(menu());
        const choice = (await rl.question('Escolha uma opção: ')).trim();

        switch (choice) {
            case '1':
                await promptAddItem(rl, cart);
                break;
            case '2':
                await promptDeleteItem(rl, cart);
                break;
            case '3':
                await promptUpdateQuantity(rl, cart);
                break;
            case '4':
                printCart(cart);
                break;
            case '5':
                printTotal(cart);
                break;
            case '6':
                running = false;
                break;
            default:
                printError('Opção inválida. Escolha um número de 1 a 6.');
        }

        if (running) {
            printSeparator();
        }
    }

    console.log(pc.cyan('👋 Até a próxima!'));
    rl.close();
}

await main();
