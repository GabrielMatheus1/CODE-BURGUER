let carrinhoParaFechar = document.querySelector('.pedidos');


carrinhoParaFechar.addEventListener('click', (e) => {
  let itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho'));
  if(e.target.classList.contains('mais-item')) {
    let contSpan = e.target.previousElementSibling;
    let cont = parseInt(contSpan.textContent);
    cont++;
    contSpan.textContent = cont;

    let itemIndex = Array.from(document.querySelectorAll('.mais-item')).indexOf(e.target);
    itensCarrinho[itemIndex].quantidade = cont;

  } else if(e.target.classList.contains('menos-item')) {
    let contSpan = e.target.nextElementSibling;
    let cont = parseInt(contSpan.textContent);
    cont--;

    let itemIndex = Array.from(document.querySelectorAll('.menos-item')).indexOf(e.target);

    if(cont <= 0) {
      if(confirm('Deseja realmente excluir este item?')) {
        contSpan.textContent = 0;
        itensCarrinho.splice(itemIndex, 1);
        document.querySelector('.pedidos').children[itemIndex].remove();
      } else {
        contSpan.textContent = 1;
        itensCarrinho[itemIndex].quantidade = 1;
      }
    } else {
      contSpan.textContent = cont;
      itensCarrinho[itemIndex].quantidade = cont;
    }
  }




  localStorage.setItem('itensCarrinho', JSON.stringify(itensCarrinho));
  window.location.reload();
});


function percorrerItensCarrinho() {
  let itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho'));

  if(itensCarrinho === null || itensCarrinho.length === 0) {
    document.querySelector('.pedidos').innerHTML = '<h2 class="sem-itens">Nenhum item no carrinho</h2>';
    return;
  }

  let somaQuantidade = itensCarrinho.reduce((acc, item) => {
    let valorItem = parseFloat(item.valorItem.replace(/[^\d.-]/g, ''));
    if (isNaN(valorItem)) valorItem = 0;
    return acc + item.quantidade * valorItem;
  }, 0);

  let convValor = parseFloat(somaQuantidade);
  let taxa = 6.00;
  let valorTotalComTaxa = somaQuantidade + taxa;

  document.querySelector('#valor-total-itens').textContent = `R$ ${convValor.toFixed(2)}`;
  document.querySelector('#valor-total-com-taxa').textContent = `R$ ${valorTotalComTaxa.toFixed(2)}`;
  
  console.log(somaQuantidade);
  console.log(convValor);
  console.log(valorTotalComTaxa);
  let qtdItens = itensCarrinho.length;

  for (let i = 0; i < qtdItens; i++) {
    let item = itensCarrinho[i];

    let template = `
      <div class="card-produtos">
                <div>
                    <img src="${item.img}" class="produtos-carrinho" alt="Produto">
                </div>
                <div>
                    <div class="header-card-carrinho">
                        <h3>${item.nome}</h3>
                        <img onclick="deletarItemCarrinho(${i})" src="../src/imgs/icons/lixeira.png" alt="lixeira">
                    </div>

                    <div class="descricao-produto-carrinho">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel quam iquo consequuntur molestiae quas cupiditate molestiae quas cupiditate. </p>
                    </div>

                    <div class="info-valors-card-carrinho">
                      <p><span>${item.valorItem}</span></p>

                      <div class="btns-item-carrinho">

                              <button class="menos-item"></button>
                              <span class="cont-span">${item.quantidade}</span>
                              <button class="mais-item"></button>

                      </div>

                    </div>
                </div>
              </div>`;

      document.querySelector('.pedidos').innerHTML += template;
  }
}


percorrerItensCarrinho();






function deletarItemCarrinho(index) {
  let itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho'));
  itensCarrinho.splice(index, 1);
  localStorage.setItem('itensCarrinho', JSON.stringify(itensCarrinho));
  document.querySelector('.pedidos').children[index].remove();
  window.location.reload();
}

