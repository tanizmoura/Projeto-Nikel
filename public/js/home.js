const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

checkLogged();
//ADICIONAR TRANSAÇÃO
document.getElementById("transaction-modal").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("transaction-value").value);
    const desc = document.getElementById("transaction-desc").value;
    const date = document.getElementById("transaction-date").value;
    const type = document.querySelector("input[name='type-transaction']:checked").value;

    data.transactions.unshift({
        value: value,
        desc: desc,
        date: date,
        type: type
    });
    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();

    alert("Transação adicionada!");
});

//BOTÃO VER MAIS
document.getElementById("transaction-button").addEventListener("click", function(){
    window.location.href = "transactions.html";
});

//BOTÃO SAIR
document.getElementById("exit").addEventListener("click", exitSession);

//FUNÇÃO DESLOGAR
function exitSession() {
    localStorage.removeItem("session");
    sessionStorage.removeItem("logged");

    window.location.href = "index.html";
}

//FUNÇÃO LOGGIN
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    data = JSON.parse(dataUser);
    getCashIn();
    getCashOut();
    getTotal();
}

//FUNÇÃO QUE FILTRA ENTRADAS
function getCashIn() {
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type == "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limite = 0;

        if (cashIn.length > 5) {
            limite = 5;
        } else {
            limite = cashIn.length;
        }

        for (let i = 0; i < limite; i++) {
            cashInHtml += `
            
            <div class="row">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[i].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[i].desc}</p>
                            </div>

                            <div class="col-12 col-md-4 text-md-end">
                                ${cashIn[i].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            `

        }

        document.getElementById("cashin-list").innerHTML = cashInHtml;
    }
}

//FUNÇÃO QUE FILTRA SAÍDAS
function getCashOut() {
    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => item.type == "2");

    if (cashOut.length) {
        let cashOutHtml = ``;
        let limite = 0;

        if (cashOut.length > 5) {
            limite = 5;
        } else {
            limite = cashOut.length;
        }

        for (let i = 0; i < limite; i++) {
            cashOutHtml += `
            
            <div class="row">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashOut[i].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[i].desc}</p>
                            </div>

                            <div class="col-12 col-md-4 text-md-end">
                                ${cashOut[i].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            `

        }

        document.getElementById("cashout-list").innerHTML = cashOutHtml;
    }
}

//FUNÇÃO SALVAR DATA
function saveData(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}

//FUNÇÃO QUE FILTRA ENTRADAS
function getAllTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    transactions.forEach(item => {
        if(item.type == "1"){
            item.type = "Entrada";
        } else {
            item.type = "Saída";
        }

        transactionsHtml += `
        <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${item.type}</td>
            <td>${item.desc}</td>
        </tr>
        
        `;
    });

    document.getElementById("transactions-table").innerHTML = transactionsHtml;
}

//FUNÇÃO SOMA TOTAL
function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach(item => {
        if(item.type == "1") {
            total += item.value;
        } else {
            total -= item.value;
        }        
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}