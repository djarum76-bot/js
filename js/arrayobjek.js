const fruits = [
    {
      name: "strawberry",
      color: "red",
      qty: 5
    },
    {
      name: "blueberry",
      color: "blue",
      qty: 10
    },
    {
       name: "orange",
       color: "orange",
       qty: 5
    },
    {
       name: "grape",
       color: "purple",
       qty: 2
    }
];

const tableContent = document.getElementById("fruit-table");

const totalBuah = fruits.reduce((total,data) => {
    return total + data.qty
},0)

fruits.map((data,i) => {
    const row = tableContent.insertRow(i);
    row.insertCell(0).innerHTML = data.name;
    row.insertCell(1).innerHTML = data.color;
    row.insertCell(2).innerHTML = data.qty;
})

const lastRow = tableContent.insertRow(tableContent.rows.length);

const lastRowCell1 = lastRow.insertCell(0);
lastRowCell1.setAttribute("id","lastCell");
const td = document.getElementById("lastCell").colSpan="2";
lastRowCell1.innerHTML = "Total";

lastRow.insertCell(1).innerHTML = totalBuah;