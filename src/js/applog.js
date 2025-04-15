//troca de formulário
let formLogin = document.getElementById("form-login");
let formCadastro = document.getElementById("form-cadastro");

function sessaoCadastrar() {
    formLogin.style.display = "none";
    formCadastro.style.display = "flex";
}

function voltarLogin() {
    formLogin.style.display = "flex";
    formCadastro.style.display = "none";
}



// login do usuario existente no banco de dados
async function loginUser() {

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    const userData = {
        email,
        senha
    };

    try {
        const response = await fetch('https://api-teste-6om5.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result);
        if (result.email && result.senha) {
            localStorage.setItem('loggedUser', JSON.stringify(result)); // salva o usuario logado no localstorage
            loadLogin.style.display = "flex"; // animação de carregamento
            setTimeout(() => {
                window.location.href = "/CODE-BURGUER/index.html"; // Redireciona para a página inicial 
            }, 2000);
        } else {
            alert('Usuário inválido ou senha incorreta!'); // alerta de erro
        }
    } catch (error) {
        alert('Usuarios invalido ou senha incorreta!'); // alerta de erro
    }
}



// criação de usuario no banco de dados com filtro de user e adm
async function addUser() {
    let email = document.getElementById('email-cad').value;
    let senha = document.getElementById('senha-cad').value;
    let nome = document.getElementById('nome-cad').value;
    let celular = document.getElementById('telefone-cad').value;
    let cpf = document.getElementById('cpf-cad').value;
    let cep = document.getElementById('cep-cad').value;
    let endereco = document.getElementById('endereco-cad').value;
    let numero = document.getElementById('endereco-numero-cad').value;

    const userData = {
        email,
        senha,
        nome,
        celular,
        cpf,
        cep,
        endereco,
        numero
    };


    try {
 
        const response = await fetch('https://api-teste-6om5.onrender.com/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        alert('Usuário adicionado:', result);
    } catch (error) {
        alert('Erro ao adicionar usuário:', error);
    }



}



// validação de usuario ja logado com filtro de user e adm
document.addEventListener('DOMContentLoaded', () => {

    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {

        const user = JSON.parse(loggedUser);

        // Exibir os dados para testar
        const logadoDiv = document.querySelector('.logado');

        if (logadoDiv) {
            if (user.tip === 'USER') {
                logadoDiv.innerHTML = `
            <a href="./pages/carrinho-cliente.html">${user.nome}</a> 
            <h3><a href="./pages/login.html" id="logoutButton">Sair</a></h3>`;
            } else {
                logadoDiv.innerHTML = `
            <a href="./pages/adm.html">${user.nome}</a> 
            <h3><a href="./pages/login.html" id="logoutButton">Sair</a></h3>`;
            }
        }
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedUser'); // botão sair
            window.location.href = "/pages/login.html"; // Redireciona para a página de login 
        });
    }

});



// animação de carregamento
var loadLogin = document.querySelector(".caixa-loading-login");
