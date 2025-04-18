export function paginateData({ data, containerId, paginationId, renderItemFn, itemsPerPage = 4 }) {
    let currentPage = 1;

    function renderPage() {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "";

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = data.slice(start, end);

        items.forEach(item => {
            const element = renderItemFn(item);
            if (element instanceof Node) {
                container.appendChild(element);
            }
        });

        renderPagination();
    }

    function renderPagination() {
        const pagination = document.getElementById(paginationId);
        if (!pagination) return;

        const totalPages = Math.ceil(data.length / itemsPerPage);

        // 🔍 Validación: si hay solo 1 página, no mostramos la paginación
        if (totalPages <= 1) {
            pagination.innerHTML = ""; // Limpiar si ya había algo
            return;
        }

        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.className = `page-item ${i === currentPage ? "active" : ""}`;

            const a = document.createElement("a");
            a.className = "page-link";
            a.href = "#";
            a.textContent = i;

            a.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                renderPage();
            });

            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

    renderPage();
}
