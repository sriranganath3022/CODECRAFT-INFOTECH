// script.js
async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const tableBody = document.getElementById("productTable");
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = `<tr>
            <td>${product.title}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.rating?.rate || "N/A"}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function downloadCSV() {
    let csv = "Name,Price,Rating\n";
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
        const columns = row.querySelectorAll("td");
        const rowData = [];
        columns.forEach(column => rowData.push(column.innerText));
        csv += rowData.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
}
