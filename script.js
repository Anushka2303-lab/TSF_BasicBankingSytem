// Dummy customer data
// const customers = [
//     { id: 1, name: "Alice", email: "alice@example.com", balance: 5000, avatar: "female.png" },
//     { id: 2, name: "Bob", email: "bob@example.com", balance: 3000, avatar: "male.png" },
//     { id: 3, name: "Charlie", email: "charlie@example.com", balance: 4000, avatar: "male.png" },
//     { id: 4, name: "David", email: "david@example.com", balance: 2000, avatar: "male.png" },
//     { id: 5, name: "Eve", email: "eve@example.com", balance: 3500, avatar: "female.png" },
//     { id: 6, name: "Frank", email: "frank@example.com", balance: 4500, avatar: "male.png" },
//     { id: 7, name: "Grace", email: "grace@example.com", balance: 1500, avatar: "female.png" },
//     { id: 8, name: "Hank", email: "hank@example.com", balance: 6000, avatar: "female.png" },
//     { id: 9, name: "Ivy", email: "ivy@example.com", balance: 2500, avatar: "female.png" },
//     { id: 10, name: "Jack", email: "jack@example.com", balance: 500, avatar: "logo1.png" },
// ];
const customers = [
    { id: 1, name: "Alice", email: "alice@example.com", balance: 5000 },
    { id: 2, name: "Bob", email: "bob@example.com", balance: 3000 },
    { id: 3, name: "Charlie", email: "charlie@example.com", balance: 4000 },
    { id: 4, name: "David", email: "david@example.com", balance: 2000 },
    { id: 5, name: "Eve", email: "eve@example.com", balance: 3500},
    { id: 6, name: "Frank", email: "frank@example.com", balance: 4500 },
    { id: 7, name: "Grace", email: "grace@example.com", balance: 1500 },
    { id: 8, name: "Hank", email: "hank@example.com", balance: 6000 },
    { id: 9, name: "Ivy", email: "ivy@example.com", balance: 2500 },
    { id: 10, name: "Jack", email: "jack@example.com", balance: 500 },
];



// Save customers to localStorage
if (!localStorage.getItem("customers")) {
    localStorage.setItem("customers", JSON.stringify(customers));
}

// Load customers from localStorage
function loadCustomers() {
    return JSON.parse(localStorage.getItem("customers"));
}

// Save customers to localStorage
//<td><img src="${customer.avatar}" alt="Avatar" class="avatar"></td>
//<img src="${customer.avatar}" alt="Avatar" class="avatar">
function saveCustomers(customers) {
    localStorage.setItem("customers", JSON.stringify(customers));
}

// Load customers into the table
if (document.querySelector("#customers-table")) {
    const customersTableBody = document.querySelector("#customers-table tbody");
    const customers = loadCustomers();

    customers.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `

            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.balance}</td>
            <td><a href="customer.html?id=${customer.id}">View</a></td>
        `;
        customersTableBody.appendChild(row);
    });
}

// Load individual customer details
if (document.querySelector("#customer-details")) {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get("id");
    const customers = loadCustomers();
    const customer = customers.find(c => c.id == customerId);

    if (customer) {
        const customerDetails = document.querySelector("#customer-details");
        customerDetails.innerHTML = `
           
            <p>Name: ${customer.name}</p>
            <p>Email: ${customer.email}</p>
            <p>Current Balance: ${customer.balance}</p>
        `;
        document.querySelector("#transfer-btn").addEventListener("click", () => {
            window.location.href = `transfer.html?from=${customer.id}`;
        });
    }
}

// Handle transfer money
if (document.querySelector("#transfer-form")) {
    const params = new URLSearchParams(window.location.search);
    const fromCustomerId = params.get("from");
    const customers = loadCustomers();
    const fromCustomer = customers.find(c => c.id == fromCustomerId);

    if (fromCustomer) {
        const fromCustomerSelect = document.querySelector("#from-customer");
        fromCustomerSelect.innerHTML = `<option>${fromCustomer.name} (${fromCustomer.balance})</option>`;

        const toCustomerSelect = document.querySelector("#to-customer");
        customers.forEach(customer => {
            if (customer.id != fromCustomerId) {
                const option = document.createElement("option");
                option.value = customer.id;
                option.textContent = `${customer.name} (${customer.balance})`;
                toCustomerSelect.appendChild(option);
            }
        });

        document.querySelector("#transfer-form").addEventListener("submit", event => {
            event.preventDefault();
            const toCustomerId = document.querySelector("#to-customer").value;
            const amount = parseFloat(document.querySelector("#amount").value);
            const toCustomer = customers.find(c => c.id == toCustomerId);

            if (amount > 0 && fromCustomer.balance >= amount) {
                fromCustomer.balance -= amount;
                toCustomer.balance += amount;
                saveCustomers(customers);
                alert("Transfer successful!");
                window.location.href = "customers.html";
            } else {
                alert("Transfer failed. Check the balance and amount.");
            }
        });
    }
}
