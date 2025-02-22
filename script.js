document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#data-table");
    const filterInput = document.querySelector("input");
    let salesData = [];

    // Fetch JSON data
    fetch("file.json")
        .then((response) => response.json())
        .then((cycles) => {
            salesData = cycles;
            renderTable(salesData);
        });

    // Render table rows
    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach((cyl) => {
            tableBody.innerHTML += `
            <tr>
                <td> <img src='${cyl.image}' width="50"> </td>
                <td>${cyl.name}</td>
                <td>${cyl.price}</td>
                <td>${cyl.inventory}</td>
                <td>${cyl.productCode}</td>
            </tr>
        `;
        });
    }

    // Sorting function
    function sortTable(columnIndex) {
        const columnKeys = ["image", "name", "price", "inventory", "productCode"];
        const key = columnKeys[columnIndex];

        salesData.sort((a, b) => {
            if (typeof a[key] === "number") {
                return a[key] - b[key]; // Sort numbers
            } else {
                return a[key].toString().localeCompare(b[key].toString()); // Sort strings
            }
        });

        renderTable(salesData);
    }

    // Add click event listeners for sorting
    document.querySelectorAll("th").forEach((th, index) => {
        th.addEventListener("click", () => sortTable(index));
    });

    // Filter function
    filterInput.addEventListener("keyup", function () {
        const searchText = filterInput.value.toLowerCase();
        const filteredData = salesData.filter((item) =>
            item.name.toLowerCase().includes(searchText)
        );
        renderTable(filteredData);
    });
});
