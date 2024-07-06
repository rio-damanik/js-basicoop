document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("myTable");
  const rows = Array.from(table.querySelectorAll("tbody > tr"));
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  const fuse = new Fuse(
    rows.map((row) => {
      const cells = row.querySelectorAll("td");
      return {
        element: row,
        name: cells[0].textContent,
        email: cells[1].textContent,
        phone: cells[2].textContent,
      };
    }),
    {
      keys: ["name"],
      threshold: 0.3,
    }
  );

  function search() {
    const searchTerm = searchInput.value;
    if (searchTerm.trim() === "") {
      rows.forEach((row) => (row.style.display = ""));
    } else {
      const result = fuse.search(searchTerm);
      rows.forEach((row) => (row.style.display = "none"));
      result.forEach((item) => (item.item.element.style.display = ""));
    }
  }

  searchButton.addEventListener("click", search);

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });
});
