let listaProdutos = document.querySelectorAll('.box-produto');
let nomeProdutos = document.querySelectorAll('.nome-produto');
let precoProdutos = document.querySelectorAll('.preco-produto');
let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
let listaCarrinho = document.getElementById('listaCarrinho');
let total = 0;
let totalElement = document.getElementById('total');
filtrarPorNome();
selecionarProdutos();
function selecionarProdutos() {
    for (let i = 0; i < listaProdutos.length; i++) {
        listaProdutos[i].addEventListener("click", (event) => {
            event.preventDefault();
            let product = nomeProdutos[i].textContent || '';
            let price = parseFloat(precoProdutos[i].textContent?.replace('R$', '').trim() || '0');
            let quantity = 1;
            let produtoExistente = carrinho.find(item => item.nome === product);
            if (produtoExistente) {
                produtoExistente.quantidade += 1;
            }
            else {
                let objProduto = {
                    nome: product,
                    preco: price,
                    quantidade: quantity
                };
                carrinho.push(objProduto);
            }
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            calcularTotal();
            criarElementos();
            console.log(carrinho);
        });
    }
}
function criarElementos() {
    if (listaCarrinho) {
        listaCarrinho.innerHTML = '';
        if (carrinho.length > 0) {
            carrinho.forEach(produto => {
                let item = document.createElement('p');
                item.classList.add('item-carrinho');
                item.innerHTML = `<span>${produto.quantidade}x</span> <span>${produto.nome}</span> <span>R$ ${produto.preco.toFixed(2)}</span>`;
                listaCarrinho.append(item);
            });
        }
    }
}
function calcularTotal() {
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });
    if (totalElement) {
        totalElement.innerHTML = `Total: <span>R$ ${total.toFixed(2)}</span>`;
    }
    console.log(`Total: R$ ${total.toFixed(2)}`);
}
if (carrinho.length > 0) {
    calcularTotal();
    criarElementos();
}
function filtrarPorNome() {
    let barraPesquisa = document.querySelector('.barra-pesquisa');
    barraPesquisa.addEventListener('input', () => {
        let termoPesquisa = barraPesquisa.value.toLowerCase();
        listaProdutos.forEach((produto, index) => {
            let nomeProduto = nomeProdutos[index].textContent?.toLowerCase() || '';
            if (nomeProduto.includes(termoPesquisa)) {
                produto.style.display = 'block';
            }
            else {
                produto.style.display = 'none';
            }
        });
    });
}
function limparCarrinho() {
    let res = confirm('Deseja limpar o carrinho de compras ?');
    if (res === true) {
        carrinho = [];
        total = 0;
        listaCarrinho.innerHTML = "";
        totalElement.innerHTML = `Total: <span>R$ ${total.toFixed(2)}</span>`;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
    else {
        return;
    }
}