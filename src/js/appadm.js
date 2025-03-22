// cadastrar no localStorage //

function previewFile() {
	var preview = document.querySelector('#exibir-prod-imagem');

	var file = document.querySelector('input[type=file]').files[0];

	var reader = new FileReader();

	reader.onloadend = function () {
		preview.src = reader.result;
	}

	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}


function cadastrarItem() {

	var nomeProd = document.getElementById('add-prod-name').value;
	var valorProd = document.getElementById('add-prod-valor').value;
	var descricaoProd = document.getElementById('add-prod-descricao').value;
	var categoriaProd = document.getElementById('add-prod-categoria').value;
	var imagemProd = document.getElementById('exibir-prod-imagem').src;

	valorNumber = parseFloat(valorProd);

	var produtosCadastrado = {
		nome: nomeProd,
		valor: valorNumber,
		imagem: imagemProd,
		descricao: descricaoProd,
		categoria: categoriaProd
	}

	if (nomeProd.length >= 3) {
		document.getElementById('add-prod-name').style.borderBottom = '3px solid green';

		if (valorNumber >= 0) {
			document.getElementById('add-prod-valor').style.borderBottom = '3px solid green';

			if (imagemProd !== '') {
				document.getElementById('exibir-prod-imagem').style.borderBottom = '3px solid green';

				if (categoriaProd !== 'notSelect') {
					document.getElementById('add-prod-categoria').style.borderBottom = '3px solid green';

					if (descricaoProd.length >= 5) {
						document.getElementById('add-prod-descricao').style.borderBottom = '3px solid green';

						var produtosString = JSON.stringify(produtosCadastrado);

						localStorage.setItem('Produto ' + (localStorage.length + 1), produtosString);

						document.querySelector('.campo-add-itens button').textContent = 'Produto cadastrado com sucesso!';
						document.querySelector('.campo-add-itens button').setAttribute('disabled', 'disabled');

						return setTimeout(function () {
							window.location.href = 'produtos.html';
						}, 2000);

					} else {
						document.getElementById('add-prod-descricao').style.borderBottom = '3px solid red';
						alert('Adicionar uma descrição para o produto!')
					}

				} else {
					document.getElementById('add-prod-categoria').style.borderBottom = '3px solid red';
					alert('Adicionar uma categoria para o produto!');
				}

			} else {
				document.getElementById('exibir-prod-imagem').style.borderBottom = '3px solid red';
				alert('Adicionar uma imagem para o produto!')
			}

		} else {
			document.getElementById('add-prod-valor').style.borderBottom = '3px solid red';
			alert('O valor do produto não pode ser 0!')
		}

	} else {
		document.getElementById('add-prod-name').style.borderBottom = '3px solid red';
		alert('Nome do produto deve conter no mínimo 3 caracteres!')
	}

}
	

let produtosSalvos = [];

// exibir produtos cadastrados para o adm //
function itenSalvoProdutos() {

	let prodQtd = localStorage.length;
	for (i = 1; i <= prodQtd; i++) {

		let prodExibir = localStorage.getItem('Produto ' + i);

		if (!prodExibir) {
			continue;
		}

		var imagemConvertida = JSON.parse(prodExibir).imagem;

		let prodObj = JSON.parse(prodExibir);

		produtosSalvos.push(prodObj);

		let template = `
		<div class="cards">
		  <span class="categoria-card">${prodObj.categoria}</span>        
		  <img src="${imagemConvertida}" alt="pudim de chocolarte" class="imgs-cards">
		  <h3>${prodObj.nome}</h3>
		  <div class="descricao-cards">
			<p>${prodObj.descricao}</p>
		  </div>

		  <div class="btn-produtos">

			<a href="#edit-itens" class="link-edit">
				<button onclick="editarItem()">Editar</button>
		  	</a>

			<button class="link-exlui" onclick="exluirItem()">Excluir</button>
		  </div>

		</div>`;

		document.querySelector('#produtos-salvos').innerHTML += template;
	}

}


window.onload = itenSalvoProdutos();

// excluir item //
function exluirItem() {

	let excluir = document.querySelectorAll('.link-exlui');

	excluir.forEach((item, index) => {

		item.addEventListener('click', () => {

			if (confirm('Deseja realmente excluir este produto?')) {
				item.parentElement.parentElement.remove();
				return localStorage.removeItem('Produto ' + (index + 1));
			}
		});

	});

}


// editar item //
function editarItem() {

	let editar = document.querySelectorAll('.link-edit');

	editar.forEach((item, index) => {

		item.addEventListener('click', () => {

			let prodExibir = localStorage.getItem('Produto ' + (index + 1));
			let prodObj = JSON.parse(prodExibir);




			document.getElementById('edit-prod-name').value = prodObj.nome;
			document.getElementById('edit-prod-valor').value = prodObj.valor;
			document.getElementById('edit-prod-descricao').value = prodObj.descricao;
			document.getElementById('edit-prod-categoria').value = prodObj.categoria;


			document.querySelector('.campo-edit-itens button').addEventListener('click', () => {

				if (document.getElementById('edit-prod-name').value.length < 3) {
					document.getElementById('edit-prod-name').style.borderBottom = '3px solid red';
					return alert('Nome do produto deve conter no mínimo 3 caracteres!')
				} else {
					document.getElementById('edit-prod-name').style.borderBottom = '3px solid green';
				}

				if (document.getElementById('edit-prod-valor').value == 0) {
					document.getElementById('edit-prod-valor').style.borderBottom = '3px solid red';
					return alert('O valor do produto não pode ser 0!')
				} else {
					document.getElementById('edit-prod-valor').style.borderBottom = '3px solid green';
				}

				if (document.getElementById('edit-prod-descricao').value.length < 5) {
					document.getElementById('edit-prod-descricao').style.borderBottom = '3px solid red';
					return alert('Adicionar uma descrição para o produto!')
				} else {
					document.getElementById('edit-prod-descricao').style.borderBottom = '3px solid green';
				}


				prodObj.nome = document.getElementById('edit-prod-name').value;
				prodObj.valor = document.getElementById('edit-prod-valor').value;
				prodObj.descricao = document.getElementById('edit-prod-descricao').value;
				prodObj.categoria = document.getElementById('edit-prod-categoria').value;

				let produtosString = JSON.stringify(prodObj);

				localStorage.setItem('Produto ' + (index + 1), produtosString);

				document.querySelector('.campo-edit-itens button').textContent = 'Produto editado com sucesso!';
				document.querySelector('.campo-edit-itens button').setAttribute('disabled', 'disabled');

				return setTimeout(function () {
					window.location.href = 'produtos.html';
				}, 2000);
			});
		});
	});
}

// sair da conta //
let logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	sessionStorage.removeItem('Logado');
	window.location.href = './Login-Cadastro/login.html';
});


