//   // JavaScript to add more columns dynamically
  document.getElementById("add_column").addEventListener("click", function () {
    const columns = document.getElementById("columns");
    const column = document.querySelector(".column").cloneNode(true);
    columns.appendChild(column);
});


