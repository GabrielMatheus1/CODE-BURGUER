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

var logins = [{
        user: 'admin',
        pass: '123'
}];


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
            if (user === "admin") {
                sessionStorage.setItem("Logado", "Admin");
                alert('Logado com Sucesso!');
                return setTimeout(function() {
                    window.location.href = "../ADM/adm.html"; 
                }, 3000);
            } 

            sessionStorage.setItem("Logado", "Usuario");
            alert('Logado com Sucesso!');
            return setTimeout(function() {
                window.location.href = "../index.html"; 
            }, 3000);
        }
    }

    alert("Usuário ou senha incorretos!");
}

let btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", function(event) {
    event.preventDefault();
    logar();
});









// var logins = [{user: "admin", pass: "123"},
//               {user: "user1", pass: 123}];


// // função para logar //
// function logar() {

//     var user = document.getElementById("email").value;
//     var pass = document.getElementById("senha").value;

//     for (var i = 0; i < logins.length; i++) {

//         if (user == logins[i].user && pass == logins[i].pass) {

//             if (user == "admin") {
                
//                 sessionStorage.setItem("Logado", "Admin");
//                 showAlert('Logado com Sucesso!', 30000);

//                 return setTimeout(function() {
//                     window.location.href = "../ADM/adm.html"; 
//                 }, 3000);
                
//             } 

//             sessionStorage.setItem("Logado", "Usuario");
//             showAlert('Logado com Sucesso!', 30000);
//             return setTimeout(function() {
//                 window.location.href = "../index.html"; 
//             }, 3000);
                
//         } else if (user == "" || pass == "") {

//             return alert("Preencha todos os campos!");

//         }
//     }   
// }

// var btn = document.getElementById("btn-cadastrar");
// var log = document.getElementById("form-login");
// var cad = document.getElementById("form-cadastro");
// var blog = document.getElementById("btn-login");


// function cadastrar() {
//         log.style.display = "none";
//         btn.style.display = "none";
//         cad.style.display = "flex";
// }

// function voltar() {
//     log.style.display = "flex";
//     btn.style.display = "flex";
//     cad.style.display = "none";
// }

// blog.addEventListener("click", function(event){
//     event.preventDefault();
//     logar();
// });

// btn.addEventListener("click", function(event){
//     event.preventDefault();
//     cadastrar();
// });



// // função para cadastrar //

// function salvarCadastro(){

//     var user = document.getElementById("email-cad").value;
//     var pass = document.getElementById("senha-cad").value;
//     var pass2 = document.getElementById("senha-cad2").value;

//     if (user == "" || pass == "" || pass2 == "") {
//         return alert("Preencha todos os campos!");
//     }

//     if (pass != pass2) {
//         return alert("Senhas não conferem!");
//     }

//     for (var i = 0; i < logins.length; i++) {
//         if (user == logins[i].user) {
//             return alert("Usuário já cadastrado!");
//         }
//     }
    
//     alert("Cadastro realizado com sucesso! Faça login para continuar.");
//     logins.push({user: user, pass: pass});




// }



// cad.addEventListener("submit", function(event){

//     event.preventDefault();
//     salvarCadastro();

// });




// // alerta de login com sucesso //
// function showAlert(message, duration) {
//     const alertBox = document.getElementById('customAlert');
//     alertBox.textContent = message;
//     alertBox.style.display = 'block';

//     setTimeout(() => {
//         alertBox.style.display = 'none';
//     }, duration);
// }





