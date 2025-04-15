function listaProdutos() {

	fetch('https://api-teste-6om5.onrender.com/products', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json()).then(data => {

		let produtos = data;

		produtos.forEach((prod) => {

			let template = `
			<div class="cards">
			  <span class="categoria-card">${prod.categoria}</span>        
			  <img src="${prod.img_url}" alt="imagem do produto inserido" class="imgs-cards">
			  <h3>${prod.produto}</h3>
			  <div class="descricao-cards">
				<p>${prod.descricao}</p>
			  </div>

			  <div class="btn-produtos">

				<a href="#edit-itens" class="link-edit">
					<button onclick="editarItem()">Editar</button>
			  	</a>

				<button class="link-exlui" onclick="exluirItem()">Excluir</button>
			  </div>

			</div>`;

			document.querySelector('#produtos-salvos').innerHTML += template;

		});

	}
	)
	.catch(error => {
		console.error('Erro:', error);
	});

}

window.onload = listaProdutos();


function previewFile() {
	var preview = document.querySelector('#exibir-prod-imagem');
	var fileInput = document.querySelector('input[type=file]');
	var file = fileInput.files[0];
	var reader = new FileReader();

	reader.onloadend = function () {
		var img = new Image();
		img.src = reader.result;

		img.onload = function () {
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			var maxWidth = 800; 
			var maxHeight = 800; 
			var width = img.width;
			var height = img.height;

			if (width > maxWidth || height > maxHeight) {
				if (width > height) {
					height *= maxWidth / width;
					width = maxWidth;
				} else {
					width *= maxHeight / height;
					height = maxHeight;
				}
			}

			canvas.width = width;
			canvas.height = height;

			ctx.drawImage(img, 0, 0, width, height);

			preview.src = canvas.toDataURL('image/jpeg', 0.7);
		};
	};

	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}



function addProduto() {

	var nomeProd = document.getElementById('add-prod-name').value;
	var valorProd = document.getElementById('add-prod-valor').value;
	var descricaoProd = document.getElementById('add-prod-descricao').value;
	var categoriaProd = document.getElementById('add-prod-categoria').value;
	var imagemProd = document.getElementById('exibir-prod-imagem').src;

	var valorNumber = parseFloat(valorProd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

	var produtosCadastrado = {
		produto: nomeProd,
		valor: valorNumber,
		img_url: imagemProd,
		descricao: descricaoProd,
		categoria: categoriaProd
	}




	fetch('https://api-teste-6om5.onrender.com/product', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(produtosCadastrado)
	})
	.then(res => {
		if (!res.ok) {
			throw new Error('Erro ao cadastrar produto: ' + res.statusText);
		}
		return res.json();
	})
	.then(data => {
		console.log('Produto cadastrado com sucesso!', data);
		alert('Produto cadastrado com sucesso!');
		window.location.href = 'controle-produtos.html';
	})
	.catch(error => {
		console.error('Erro:', error);
		alert('Erro ao cadastrar produto!');
	}
	)
}




// // excluir / editar item //
// function exluirItem() {

// 	let excluir = document.querySelectorAll('.link-exlui');

// 	excluir.forEach((item, index) => {

// 		item.addEventListener('click', () => {

// 			if (confirm('Deseja realmente excluir este produto?')) {
// 				item.parentElement.parentElement.remove();
// 				return localStorage.removeItem('Produto ' + (index + 1));
// 			}
// 		});

// 	});

// }


// // editar item //
// function editarItem() {

// 	let editar = document.querySelectorAll('.link-edit');

// 	editar.forEach((item, index) => {

// 		item.addEventListener('click', () => {

// 			let prodExibir = localStorage.getItem('Produto ' + (index + 1));
// 			let prodObj = JSON.parse(prodExibir);




// 			document.getElementById('edit-prod-name').value = prodObj.nome;
// 			document.getElementById('edit-prod-valor').value = prodObj.valor;
// 			document.getElementById('edit-prod-descricao').value = prodObj.descricao;
// 			document.getElementById('edit-prod-categoria').value = prodObj.categoria;


// 			document.querySelector('.campo-edit-itens button').addEventListener('click', () => {

// 				if (document.getElementById('edit-prod-name').value.length < 3) {
// 					document.getElementById('edit-prod-name').style.borderBottom = '3px solid red';
// 					return alert('Nome do produto deve conter no mínimo 3 caracteres!')
// 				} else {
// 					document.getElementById('edit-prod-name').style.borderBottom = '3px solid green';
// 				}

// 				if (document.getElementById('edit-prod-valor').value == 0) {
// 					document.getElementById('edit-prod-valor').style.borderBottom = '3px solid red';
// 					return alert('O valor do produto não pode ser 0!')
// 				} else {
// 					document.getElementById('edit-prod-valor').style.borderBottom = '3px solid green';
// 				}

// 				if (document.getElementById('edit-prod-descricao').value.length < 5) {
// 					document.getElementById('edit-prod-descricao').style.borderBottom = '3px solid red';
// 					return alert('Adicionar uma descrição para o produto!')
// 				} else {
// 					document.getElementById('edit-prod-descricao').style.borderBottom = '3px solid green';
// 				}


// 				prodObj.nome = document.getElementById('edit-prod-name').value;
// 				prodObj.valor = document.getElementById('edit-prod-valor').value;
// 				prodObj.descricao = document.getElementById('edit-prod-descricao').value;
// 				prodObj.categoria = document.getElementById('edit-prod-categoria').value;

// 				let produtosString = JSON.stringify(prodObj);

// 				localStorage.setItem('Produto ' + (index + 1), produtosString);

// 				document.querySelector('.campo-edit-itens button').textContent = 'Produto editado com sucesso!';
// 				document.querySelector('.campo-edit-itens button').setAttribute('disabled', 'disabled');

// 				return setTimeout(function () {
// 					window.location.href = 'produtos.html';
// 				}, 2000);
// 			});
// 		});
// 	});
// }

/* */

// sair da conta //

const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
	logoutButton.addEventListener('click', () => {
		localStorage.removeItem('loggedUser'); 
		window.location.href = "/pages/login.html"; 
	});
}


