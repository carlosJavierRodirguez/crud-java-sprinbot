import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderLeyendaForm } from "./leyendaForm.js";


export const reloadLegends = () => {
    const container = document.getElementById("containerLegends");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlLegends,
        containerId: "containerLegends",
        paginationId: "paginateLegends",
        renderItemFn: renderLegendCard,
        itemsPerPage: 2
    });
};

export function renderLegendCard(leyenda) {
    const card = document.createElement("div");
    card.classList.add("col-md-6");

    card.innerHTML = `
        <div class="card h-100 shadow-sm border-0 rounded-4 p-3 legend-card">
            <div class="card-body d-flex flex-column">
                <span class="badge bg-secondary text-dark mb-2 align-self-start">${leyenda.mythology?.name || "Sin mitología"}</span>
                <h5 class="card-title text-primary">${leyenda.title || "Sin título"}</h5>
                <p class="card-text flex-grow-1 overflow-auto">${leyenda.story || "Sin descripción"}</p>

                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-outline-primary btn-sm btn-edit" data-id="${leyenda.id}">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${leyenda.id}">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;

    // implemento la función generica para eliminar datos 
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.target.closest("button").getAttribute("data-id");
        deleteResource(id, urlApi.urlLegends, "leyenda", reloadLegends);
    });

    card.querySelector(".btn-edit").addEventListener("click", async (event) => {
        try {
            // Adaptamos el objeto al formato que espera el formulario
            const leyendaAdaptada = {
                id: leyenda.id, // este lo usarás como idLegend en el body
                title: leyenda.title,
                story: leyenda.story,
                mythology_id: leyenda.mythology?.mythologyId || leyenda.mythologyId // soporta ambos casos
            };

            renderLeyendaForm(leyendaAdaptada);
        } catch (error) {
            alertas("error", "Error al cargar leyenda", error.message);
        }
    });


    return card;
}

document.addEventListener("DOMContentLoaded", () => {

    fetchWithPagination({
        url: urlApi.urlLegends,
        containerId: "containerLegends",
        paginationId: "paginateLegends",
        renderItemFn: renderLegendCard,
        itemsPerPage: 2
    });
});
