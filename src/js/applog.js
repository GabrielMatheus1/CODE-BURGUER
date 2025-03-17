var logins = [{
        user: 'Adm',
        pass: '123'
}];

let btn = document.getElementById("sessao-cadastrar");

function sessaoCadastrar() {
    let formLogin = document.getElementById("form-login");
    let formCadastro = document.getElementById("form-cadastro");

    formLogin.style.display = "none";
    formCadastro.style.display = "flex";
}

let btnVoltarLogin = document.getElementById("voltar-login");

function voltarLogin() {
    let formLogin = document.getElementById("form-login");
    let formCadastro = document.getElementById("form-cadastro");

    formLogin.style.display = "flex";
    formCadastro.style.display = "none";
}



let btnCadastrar = document.getElementById("btn-cadastrar-cad");

btnCadastrar.addEventListener("click", function(event) {
    event.preventDefault();
    salvarCadastro();
});

function salvarCadastro() {
    let user = document.getElementById("email-cad").value;
    let pass = document.getElementById("senha-cad").value;
    let pass2 = document.getElementById("senha-cad2").value;

    if (user === "" || pass === "" || pass2 === "") {
        return alert("Preencha todos os campos!");
    }

    if (pass !== pass2) {
        return alert("Senhas não conferem!");
    }
   

    for (let i = 0; i < logins.length; i++) {
        if (user === logins[i].user) {
            return alert("Usuário já cadastrado!");
        }
    }

    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    logins.push({ user: user, pass: pass });
}






function logar() {
    let user = document.getElementById("email").value;
    let pass = document.getElementById("senha").value;

    if (user === "" || pass === "") {
        return alert("Preencha todos os campos!");
    }

    for (let i = 0; i < logins.length; i++) {
        if (user === logins[i].user && pass === logins[i].pass) {
            if (user === "Adm") {
                sessionStorage.setItem("Logado", "Admin");
                alert('Logado com Sucesso!');
                return setTimeout(function() {
                    window.location.href = "./adm.html"; 
                }, 2000);
            } 

            sessionStorage.setItem("Logado", "Usuario");
            alert('Logado com Sucesso!');
            return setTimeout(function() {
                window.location.href = "../index.html"; 
            }, 2000);
        }
    }

    alert("Usuário ou senha incorretos!");
}

let btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", function(event) {
    event.preventDefault();
    logar();
});

