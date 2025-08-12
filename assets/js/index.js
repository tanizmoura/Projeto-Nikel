const myModal = new bootstrap.Modal("#create-account-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGIN CONTA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const pass =  document.getElementById("login-pass").value;
    const session = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account || account.pass !== pass){
        alert("Ops! Verifique o usuário ou a senha.");
        return;  
        
    } else {
       saveSession(email, session); 
       window.location.href = "home.html";
    }

});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("create-email").value;
    const pass = document.getElementById("create-pass").value;

    if(email.length < 5) {
        alert("Preencha o campo com um email válido!");
        return;
    }

    if(pass.length < 4) {
        alert("Preencha a senha com no mínimo 4 digitos.");
        return;
    }

    saveAccount({
        email: email,
        pass: pass,
        transactions: []
    });

    myModal.hide();
    alert("Conta criada com sucesso!");
});

function saveAccount(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}

//CHECA LOGIN
function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

// SALVA SESSÃO
function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

//PEGA DADOS DA CONTA
function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}