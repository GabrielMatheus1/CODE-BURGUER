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
        email: 'Adm',
        pass: '123',
        nome: 'gabriel',
        tip: 'ADM',
        cel: '1193022993',
        cpf: '123123113',
        cep: '04888',
        endereco: 'slaq',
        n: '502'
},{
        email: 'a',
        pass: 'a',
        nome: 'user teste',
        tip: 'USER',
        cel: 'a',
        cpf: '123123213',
        cep: 'a',
        endereco: 'a',
        n: 'a'
}];


function salvarCadastro() {
    let email = document.getElementById("email-cad").value;
    let pass = document.getElementById("senha-cad").value;
    let pass2 = document.getElementById("senha-cad2").value;
    let nome = document.getElementById('nome-cad').value;
    let telefone = document.getElementById('telefone-cad').value;
    let cpf = document.getElementById('cpf-cad').value;
    let cep = document.getElementById('cep-cad').value;
    let ende = document.getElementById('endereco-cad').value;
    let num = document.getElementById('endereco-numero-cad').value;
    
    
    if (email === "" || pass === "" || pass2 === "" || nome === "" || telefone === "" ||
    cpf === "" || cep === "" || ende === "" || num === "") {
        return alert("Preencha todos os campos!");
    }

    if (pass !== pass2) {
        return alert("Senhas não conferem!");
    }
    
    

    for (let i = 0; i < logins.length; i++) {
        if (email === logins[i].email) {
            
            return alert("Usuário já cadastrado!");
        }
    }
    logins.push({ email: email, pass: pass, nome: nome, tip: "USER", cel: telefone, cpf: cpf,
        cep: cep, endereco: ende, n: num});
    
    document.getElementById("email-cad").value = "";
    document.getElementById("senha-cad").valuec= "";
    document.getElementById("senha-cad2").value = "";
    document.getElementById('nome-cad').value = "";
    document.getElementById('telefone-cad').value = "";
    document.getElementById('cpf-cad').value = "";
    document.getElementById('cep-cad').value = "";
    document.getElementById('endereco-cad').value = "";
    document.getElementById('endereco-numero-cad').value = "";
    
    formLogin.style.display = "flex";
    formCadastro.style.display = "none";
    
for(let v = 0; v < logins.length; v++){
   console.log('dado teste é: ' + logins[v].n)
}
    
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
        if (user === logins[i].email && pass === logins[i].pass) {
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

