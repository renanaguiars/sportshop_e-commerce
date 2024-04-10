document.addEventListener("DOMContentLoaded", function() {

    let carrinho = [];
    
    const nomeProduto = document.querySelectorAll(".nome-produto");
    const precoProduto = document.querySelectorAll(".preco-produto");
    const imagemProduto = document.querySelectorAll(".img-produto");
    const listaCarrinho = document.querySelector(".lista-carrinho");
    const valorTotal = document.querySelector("#valor-total");
    const btnComprar = document.querySelector("#btn-comprar");

    for (let i = 0; i < nomeProduto.length; i++) {
        imagemProduto[i].addEventListener("click", () => {
            let produto = nomeProduto[i].textContent;
            let preco = parseFloat(precoProduto[i].textContent.replace("R$ ", ""));
            
            let index = carrinho.findIndex(item => item.produto === produto);

            if(index !== -1) {
                carrinho[index].quantidade++;
                valorTotal.removeAttribute("hidden")
            } else {
                carrinho.push({
                    produto: produto,
                    preco: preco,
                    quantidade: 1
                });
            }

            atualizarListaCarrinho();
            atualizarValorTotal();
        });
    }

    btnComprar.onclick = limparCarrinho;

    function limparCarrinho() {
        alert("Compra realizada!")
        carrinho.splice(0, carrinho.length)
        atualizarListaCarrinho();
        atualizarValorTotal();
    }

    function atualizarListaCarrinho() {
        listaCarrinho.innerHTML = "";

        carrinho.forEach(item => {
            let novoElemento = document.createElement("li");
            novoElemento.textContent = `${item.quantidade}x ${item.produto} - R$ ${item.preco}`;
            listaCarrinho.appendChild(novoElemento);
        });
    }

    function atualizarValorTotal() {
        let total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        valorTotal.textContent = `Total: R$ ${total.toFixed(2)}`
    }
});