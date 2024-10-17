// Função para criar um novo produto
function criarProduto(nome, preco, categoria, estoque) {
    return {
        nome: nome,
        preco: preco,
        categoria: categoria,
        estoque: estoque
    };
}

// Array para armazenar os produtos
let produtos = [];

// Função para exibir os produtos na tela
function mostrarProdutos() {
    const produtoLista = document.getElementById('produto-lista');
    produtoLista.innerHTML = ''; // Limpa a lista anterior
    produtos.forEach((produto, index) => {
        let produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        
        // Cria o conteúdo do produto
        produtoDiv.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Preço: R$${produto.preco.toFixed(2)}</p>
            <p>Categoria: ${produto.categoria}</p>
            <p>Estoque: ${produto.estoque}</p>
            <label for="quantidade-excluir-${index}">Quantidade para excluir:</label>
            <input type="number" id="quantidade-excluir-${index}" min="1" max="${produto.estoque}" value="1">
            <button onclick="excluirProduto(${index})">Excluir</button>
        `;
        
        produtoLista.appendChild(produtoDiv);
    });
}

// Função para excluir uma certa quantidade de estoque ou o estoque todo
function excluirProduto(index) {
    const quantidadeInput = document.getElementById(`quantidade-excluir-${index}`);
    const quantidadeExcluir = parseInt(quantidadeInput.value);

    // Verifica se a quantidade é válida
    if (quantidadeExcluir > 0 && quantidadeExcluir <= produtos[index].estoque) {
        produtos[index].estoque -= quantidadeExcluir; // Reduz a quantidade no estoque
        
        // Se o estoque chegar a zero, remover o produto completamente
        if (produtos[index].estoque === 0) {
            produtos.splice(index, 1); // Remove o produto do array
        }
        
        // Atualiza a exibição dos produtos
        mostrarProdutos();
    } else {
        alert('Quantidade inválida! Verifique o valor inserido.');
    }
}

// Função para adicionar um novo produto ao array e exibi-lo
document.getElementById('produto-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const estoque = parseInt(document.getElementById('estoque').value);

    // Adiciona o novo produto ao array de produtos
    produtos.push(criarProduto(nome, preco, categoria, estoque));
    
    // Exibe os produtos atualizados
    mostrarProdutos();

    // Limpa o formulário após adicionar o produto
    document.getElementById('produto-form').reset();
});
