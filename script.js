// Initial Data
let tableEntries = JSON.parse(localStorage.getItem("tableEntries")) || [];

// Function to update expense summary
function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;
    }, 0);

    let totalExpense = tableEntries.reduce((t, e) => {
        if (e.type === 0) t += e.amount;
        return t;
    }, 0);
       let Balance = totalIncome - totalExpense;
    document.getElementById("updatedInc").innerText = totalIncome;
    document.getElementById("updatedExp").innerText = totalExpense;
    document.getElementById("updatedPer").innerText = ` ${Math.floor(((Balance/totalIncome)*100))}%`;
    document.getElementById("updatedBal").innerText = Balance;
}

// Function to add a new entry
function addItem() {
    let type = document.getElementById("itemType").value;
    let nameInput = document.getElementById("name");
    let amountInput = document.getElementById("amount");

    if (nameInput.value === "" || Number(amountInput.value) <= 0) {
        return alert("Please enter a valid name and a positive amount.");
    }

    // Add new data
    tableEntries.push({
        type: Number(type),
        name: nameInput.value.trim(),
        amount: Number(amountInput.value),
    });

    // Save to local storage
    localStorage.setItem("tableEntries", JSON.stringify(tableEntries));

    updateTable();
    nameInput.value = "";
    amountInput.value = 0;
}

// Function to populate entries in the expense table
function loadItems(entry, index) {
    let table = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = table.insertRow();

    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);

    cell0.textContent = index + 1;
    cell1.textContent = entry.name;
    cell2.textContent = entry.amount;
    cell3.innerHTML = entry.type === 0 ? "🟥" : "🟩";
    cell3.style.color = entry.type === 0 ? "red" : "green";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteEntry(entry));
    cell4.appendChild(deleteButton);
}

// Clear table rows before updating
function clearTable() {
    let table = document.getElementById("table").getElementsByTagName("tbody")[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

// Function to delete an entry
function deleteEntry(entryToDelete) {
    tableEntries = tableEntries.filter((entry) => entry !== entryToDelete);

    // Save updated data to local storage
    localStorage.setItem("tableEntries", JSON.stringify(tableEntries));

    updateTable();
}

// Function to render all entries
function updateTable() {
    clearTable();
    tableEntries.forEach((entry, index) => loadItems(entry, index));
    updateSummary();
}

// Initialize the table on page load
updateTable();
