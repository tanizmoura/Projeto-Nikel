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
    getAllTransactions();

    alert("Transação adicionada!");
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
    getAllTransactions();

}

//FUNÇÃO QUE FILTRA ENTRADAS
function getAllTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach(item => {
            let type = "Entrada";
            if (item.type == "2") {
                type = "Saída";
            }

            transactionsHtml += `
        <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.desc}</td>
        </tr>
        
        `;
        });
    }

    document.getElementById("transactions-table").innerHTML = transactionsHtml;

}

//FUNÇÃO SALVAR DATA
function saveData(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}

