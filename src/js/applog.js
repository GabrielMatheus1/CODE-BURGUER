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



var logins = [{
        user: 'Adm',
        pass: '123',
        nome: 'gabriel',
        tip: 'ADM'
}];


function salvarCadastro() {
    let user = document.getElementById("email-cad").value;
    let pass = document.getElementById("senha-cad").value;
    let pass2 = document.getElementById("senha-cad2").value;
    let nomeUser = document.getElementById('nome-cad').value;

    if (user === "" || pass === "" || pass2 === "" || nomeUser === "") {
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
    logins.push({ user: user, pass: pass, nome: nomeUser, tip: "USER" });
    
    
    formLogin.style.display = "flex";
    formCadastro.style.display = "none";

   
    
    alert("Cadastro realizado com sucesso! Faça login para continuar.");
   
}


var loadLogin = document.querySelector(".caixa-loading-login");



function logar() {
    let user = document.getElementById("email").value;
    let pass = document.getElementById("senha").value;

    if (user === "" || pass === "") {
        return alert("Preencha todos os campos!");
    }

    for (let i = 0; i < logins.length; i++) {
        if (user === logins[i].user && pass === logins[i].pass) {
            if (logins[i].tip === "ADM") {
                sessionStorage.setItem("Logado", `${logins[i].nome}`);
                formLogin.style.display = "none";
                loadLogin.style.display = "flex";
                return setTimeout(function() {
                    window.location.href = "./adm.html"; 
                }, 4000);
            } 

            sessionStorage.setItem("Logado", `${logins[i].nome}` );
            formLogin.style.display = "none";
            loadLogin.style.display = "flex";
            return setTimeout(function() {
                window.location.href = "../index.html"; 
            }, 4000);
        }
    }

    alert("Usuário ou senha incorretos!");
}


let btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener('click', function(event) {
    logar();
});



let btnCadastrar = document.getElementById("btn-cadastrar-cad");
btnCadastrar.addEventListener('click', function(event) {
    salvarCadastro();
});

