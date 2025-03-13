var logins = [{user: "admin", pass: "123"},
              {user: "user1", pass: 123}];


// função para logar //
function logar() {

    var user = document.getElementById("usuario").value;
    var pass = document.getElementById("senha").value;

    for (var i = 0; i < logins.length; i++) {

        if (user == logins[i].user && pass == logins[i].pass) {

            if (user == "admin") {
                
                sessionStorage.setItem("Logado", "Admin");
                showAlert('Logado com Sucesso!', 30000);

                return setTimeout(function() {
                    window.location.href = "../ADM/adm.html"; 
                }, 3000);
                
            } 

            sessionStorage.setItem("Logado", "Usuario");
            showAlert('Logado com Sucesso!', 30000);
            return setTimeout(function() {
                window.location.href = "../index.html"; 
            }, 3000);
                
        } else if (user == "" || pass == "") {

            return alert("Preencha todos os campos!");

        }
    }   
}




// alerta de login com sucesso //
function showAlert(message, duration) {
    const alertBox = document.getElementById('customAlert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, duration);
}





