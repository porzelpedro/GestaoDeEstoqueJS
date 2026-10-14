"use strict";

const categorias = ["Eletrônicos", "Vestuário", "Alimentos"];

console.log("1.1 - Categorias:", categorias);

const codigosProdutos = [101, 102, 103, 104];
const fornecedores = new Array(
    "TechSupply",
    "ModaExpress",
    "SuperFoods"
);

console.log("1.2 - Códigos:", codigosProdutos);
console.log("1.2 - Fornecedores:", fornecedores);

console.log("1.3 - Primeira categoria:", categorias[0]);

categorias[1] = "Calçados";

console.log("1.3 - Categorias modificadas:", categorias);

categorias.push("Livros");
console.log("Após push:", categorias);

categorias.pop();
console.log("Após pop:", categorias);

categorias.unshift("Brinquedos");
console.log("Após unshift:", categorias);

categorias.shift();
console.log("Após shift:", categorias);

console.log("2.2 - Tamanho:", categorias.length);
console.log("2.3 - Índice de Calçados:", categorias.indexOf("Calçados"));
console.log("2.3 - Existe Eletrônicos?", categorias.includes("Eletrônicos"));

console.log("3.1 - Laço for:");

for (let i = 0; i < categorias.length; i++) {
    console.log(categorias[i]);
}

console.log("3.2 - Laço for...of:");

for (const categoria of categorias) {
    console.log(categoria);
}

const produtos = [
    { nome: "Teclado Mecânico", preco: 250, estoque: 15 },
    { nome: "Mouse Gamer", preco: 120, estoque: 8 },
    { nome: "Monitor Ultrawide", preco: 1200, estoque: 4 }
];

console.log("4.1 - Primeiro produto:", produtos[0].nome);

const produtosBaratos = produtos.filter(
    produto => produto.preco < 300
);

console.log("4.2 - Produtos baratos:", produtosBaratos);

const precos = [50, 150, 200, 350, 400];

const multiplosDe100 = precos.filter(
    preco => preco % 100 === 0
);

console.log("4.2 - Múltiplos de 100:", multiplosDe100);

const quantidades = [2, 3, 5, 10];

const totalItens = quantidades.reduce(
    (acumulador, quantidade) => acumulador + quantidade,
    0
);

console.log("4.3 - Total de itens:", totalItens);

const valorTotalEstoque = produtos.reduce(
    (total, produto) => total + produto.preco * produto.estoque,
    0
);

console.log(
    "4.3 - Valor total do estoque:",
    valorTotalEstoque.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
);

const precosOriginais = [100, 200, 300];

const precosComDesconto = precosOriginais.map(
    preco => preco * 0.9
);

console.log("4.4 - Preços com desconto:", precosComDesconto);

const nomesProdutos = produtos.map(
    produto => produto.nome
);

console.log("4.4 - Nomes dos produtos:", nomesProdutos);

const produtosOrdenados = produtos.slice();

produtosOrdenados.sort(
    (a, b) => a.preco - b.preco
);

console.log("4.5 - Produtos ordenados:", produtosOrdenados);

const existeEstoqueBaixo = produtos.some(
    produto => produto.estoque < 5
);

console.log("4.6 - Existe estoque baixo?", existeEstoqueBaixo);

const inventario = [
    { nome: "Teclado", preco: 250, estoque: 15 },
    { nome: "Mouse", preco: 120, estoque: 2 },
    { nome: "Headset", preco: 180, estoque: 10 }
];

console.log(
    "4.6 - Existe estoque crítico?",
    inventario.some(produto => produto.estoque < 5)
);

console.log(
    "4.6 - Primeiro produto crítico:",
    inventario.find(produto => produto.estoque < 5)
);

const listaProdutos = document.getElementById("listaProdutos");
const formProduto = document.getElementById("formProduto");
const campoBusca = document.getElementById("busca");
const campoOrdenacao = document.getElementById("ordenacao");

const campoNome = document.getElementById("nome");
const campoPreco = document.getElementById("preco");
const campoEstoque = document.getElementById("estoque");

const mensagemVazia = document.getElementById("mensagemVazia");
const mensagemOperacoes = document.getElementById("mensagemOperacoes");

let inventarioAtual = produtos.slice();

const formatarMoeda = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function atualizarResumo() {
    const quantidadeProdutos = inventarioAtual.length;

    const unidades = inventarioAtual.reduce(
        (total, produto) => total + produto.estoque,
        0
    );

    const valor = inventarioAtual.reduce(
        (total, produto) => total + produto.preco * produto.estoque,
        0
    );

    const criticos = inventarioAtual.filter(
        produto => produto.estoque < 5
    ).length;

    document.getElementById("totalProdutos").textContent =
        quantidadeProdutos;

    document.getElementById("totalUnidades").textContent =
        unidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valor);

    document.getElementById("estoqueCritico").textContent =
        criticos;
}

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function renderizarProdutos() {
    const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
    const ordenacao = campoOrdenacao.value;

    const filtrados = inventarioAtual.filter(
        produto => produto.nome.toLocaleLowerCase("pt-BR").includes(termo)
    );

    const ordenados = filtrados.slice();

    ordenados.sort((a, b) => {
        if (ordenacao === "menor") {
            return a.preco - b.preco;
        }

        if (ordenacao === "maior") {
            return b.preco - a.preco;
        }

        if (ordenacao === "estoque") {
            return a.estoque - b.estoque;
        }

        return a.nome.localeCompare(b.nome, "pt-BR");
    });

    listaProdutos.replaceChildren();

    ordenados.forEach(produto => {
        const linha = document.createElement("tr");

        linha.appendChild(criarCelula(produto.nome));
        linha.appendChild(criarCelula(formatarMoeda(produto.preco)));
        linha.appendChild(criarCelula(String(produto.estoque)));
        linha.appendChild(
            criarCelula(formatarMoeda(produto.preco * produto.estoque))
        );

        const celulaStatus = document.createElement("td");
        const status = document.createElement("span");

        status.classList.add("status");

        if (produto.estoque < 5) {
            status.classList.add("critico");
            status.textContent = "Estoque crítico";
        } else {
            status.classList.add("ok");
            status.textContent = "Disponível";
        }

        celulaStatus.appendChild(status);
        linha.appendChild(celulaStatus);

        const celulaAcao = document.createElement("td");
        const botaoRemover = document.createElement("button");

        botaoRemover.type = "button";
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";
        botaoRemover.setAttribute(
            "aria-label",
            `Remover ${produto.nome}`
        );

        botaoRemover.addEventListener("click", () => {
            inventarioAtual = inventarioAtual.filter(
                item => item !== produto
            );

            atualizarResumo();
            renderizarProdutos();
        });

        celulaAcao.appendChild(botaoRemover);
        linha.appendChild(celulaAcao);

        listaProdutos.appendChild(linha);
    });

    mensagemVazia.hidden = ordenados.length !== 0;
}

formProduto.addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const preco = Number(campoPreco.value);
    const estoque = Number(campoEstoque.value);

    if (
        !nome ||
        !Number.isFinite(preco) ||
        preco <= 0 ||
        !Number.isInteger(estoque) ||
        estoque < 0
    ) {
        alert("Informe um nome, um preço positivo e uma quantidade inteira não negativa.");
        return;
    }

    inventarioAtual.push({
        nome: nome,
        preco: preco,
        estoque: estoque
    });

    formProduto.reset();

    atualizarResumo();
    renderizarProdutos();

    campoNome.focus();
});

campoBusca.addEventListener("input", renderizarProdutos);

campoOrdenacao.addEventListener("change", renderizarProdutos);

document.getElementById("btnConsole").addEventListener("click", () => {
    console.log("===== RESUMO DO INVENTÁRIO =====");
    console.log("Produtos:", inventarioAtual);

    console.log(
        "Total de unidades:",
        inventarioAtual.reduce((total, p) => total + p.estoque, 0)
    );

    console.log(
        "Valor do estoque:",
        formatarMoeda(
            inventarioAtual.reduce(
                (total, p) => total + p.preco * p.estoque,
                0
            )
        )
    );

    console.log(
        "Existem produtos críticos?",
        inventarioAtual.some(p => p.estoque < 5)
    );

    const primeiroCritico = inventarioAtual.find(p => p.estoque < 5);

    console.log(
        "Primeiro produto crítico:",
        primeiroCritico ?? "Nenhum"
    );

    alert("Resumo exibido no console do navegador (F12).");
});

document.getElementById("btnOperacoes").addEventListener("click", () => {
    console.clear();

    console.log("===== ATIVIDADE PRÁTICA: ARRAYS =====");
    console.log("Categorias:", categorias);
    console.log("Códigos:", codigosProdutos);
    console.log("Fornecedores:", fornecedores);

    console.log(
        "Produtos abaixo de R$ 300:",
        inventarioAtual.filter(p => p.preco < 300)
    );

    console.log(
        "Nomes dos produtos:",
        inventarioAtual.map(p => p.nome)
    );

    console.log(
        "Valor total do inventário:",
        inventarioAtual.reduce(
            (total, p) => total + p.preco * p.estoque,
            0
        )
    );

    console.log(
        "Produtos ordenados por preço:",
        inventarioAtual.slice().sort((a, b) => a.preco - b.preco)
    );

    console.log(
        "Existe estoque crítico?",
        inventarioAtual.some(p => p.estoque < 5)
    );

    console.log(
        "Primeiro produto crítico:",
        inventarioAtual.find(p => p.estoque < 5) ?? "Nenhum"
    );

    mensagemOperacoes.textContent =
        "Operações executadas! Pressione F12 e abra a aba Console para conferir os resultados.";
});

atualizarResumo();
renderizarProdutos();