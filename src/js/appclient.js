let carrinhoParaFechar = document.querySelector('.pedidos');

carrinhoParaFechar.addEventListener('click', (e) => {
  if(e.target.classList.contains('mais-item')) {
    let contSpan = e.target.previousElementSibling;
    let cont = parseInt(contSpan.textContent);
    cont++;
    contSpan.textContent = cont;
  } else if(e.target.classList.contains('menos-item')) {
    let contSpan = e.target.nextElementSibling;
    let cont = parseInt(contSpan.textContent);
    cont--;

    if(cont <= 0) {

      if(confirm('Deseja realmente excluir este item?')) {
        contSpan.textContent = 0;
        deletarItemCarrinho();
      } else {
        contSpan.textContent = 1;
      }

    } else {
      contSpan.textContent = cont;
      }

  }
});


function percorrerItensCarrinho() {
  let itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho'));

  let qtdItens = itensCarrinho.length;

  document.querySelector('#qtdlenght-carrinho').innerHTML = qtdItens;
  
  
  for (let i = 0; i < qtdItens; i++) {
    let item = itensCarrinho[i];

    template = `
      <div class="card-produtos">
                <div>
                    <img src="${item.img}" class="produtos-carrinho" alt="">
                </div>
                <div>
                    <div class="header-card-carrinho">
                        <h3>${item.nome}</h3>
                        <img onclick="deletarItemCarrinho()" src="../imgs/icons/lixeira.png" alt="lixeira">
                    </div>

                    <div class="descricao-produto-carrinho">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel quam iquo consequuntur molestiae quas cupiditate molestiae quas cupiditate. </p>
                    </div>

                    <div class="info-valors-card-carrinho">
                      <p><span>${item.valorItem}</span></p>
                      <p><span>${item.quantidade}</span></p>

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


function deletarItemCarrinho() {
  let itensCarrinho = JSON.parse(localStorage.getItem('itensCarrinho'));
  let item = itensCarrinho[0];
  let itemCarrinho = document.querySelector('.card-produtos');

  itemCarrinho.remove(item);
  localStorage.removeItem('itensCarrinho');
  localStorage.setItem('itensCarrinho', JSON.stringify(itensCarrinho));
}

