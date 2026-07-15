## Shopping Cart

CLI interativo de carrinho de compras em Node.js. O carrinho armazena itens e calcula subtotais e total automaticamente. O projeto roda somente via terminal - sem frontend, sem persistência (o carrinho existe apenas durante a execução).

## Como rodar

```bash
npm install
npm start
```

A cada execução, o carrinho já inicia com 3 itens aleatórios do catálogo (quantidade também aleatória).

## Menu

```
1. Adicionar item
2. Remover item
3. Atualizar quantidade de um item
4. Listar itens do carrinho
5. Calcular total do carrinho
6. Sair
```

Itens só podem ser adicionados a partir de um catálogo fixo de 9 produtos (`src/data/catalog.js`); não é possível cadastrar um item livre por nome/preço.

## Testes

```bash
npm test
```

Roda a suíte de testes (`node --test`) sobre a lógica de domínio em `src/services`.

## Estrutura

```
src/
├── index.js            # entrypoint: loop de leitura de comandos (readline)
├── cli/
│   ├── display.js       # formatação e impressão no terminal (menu, cores, mensagens)
│   ├── prompts.js       # handlers de cada opção do menu, chamam o cartService
│   └── seed.js           # popula o carrinho com itens aleatórios ao iniciar
├── data/
│   └── catalog.js        # catálogo fixo de itens disponíveis (nome, preço, ícone)
└── services/
    ├── item.js            # criação de itens (id, subtotal calculado a partir do próprio item)
    ├── cart.js            # lógica pura do carrinho (sem I/O, testável isoladamente)
    └── *.test.js           # testes de domínio (node --test)
```

A separação entre `src/services` (domínio) e `src/cli` (interface) mantém a lógica de negócio testável sem depender de entrada/saída de terminal — o `cartService` não sabe que existe um terminal, e a camada de CLI não tem regra de negócio própria.
