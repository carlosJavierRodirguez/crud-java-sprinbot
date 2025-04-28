import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderGodForm } from "./godForm.js";
import { alertas } from "../alertas/alertas.js";


export const reloadGods = () => {
    const container = document.getElementById("containerGods");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlGods,
        containerId: "containerGods",
        paginationId: "paginateGods",
        renderItemFn: renderGodCard,
        itemsPerPage: 3
    });
};

export function renderGodCard(god) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

    card.innerHTML = `
    <div class="destination-item position-relative overflow-hidden mb-4 rounded-lg shadow-lg">
        <!-- Imagen del dios con dimensiones fijas de 400x250 y bordes redondeados -->
        <img class="img-fluid w-100" src="${god.imageGod}" alt="${god.name}" 
             style="height: 250px; object-fit: cover; border-radius: 10px;">
    </div>

    <!-- Nombre del dios debajo de la imagen -->
    <div class="text-center mt-3">
        <h5 class="text-black font-weight-bold" style="font-size: 1.2rem;">${god.name}</h5>
    </div>

    <!-- Mitología debajo del nombre -->
    <div class="text-center mt-2">
        <p class="text-muted" style="font-size: 1rem; margin-bottom: 0;">
            <strong>Mitología:</strong> ${god.mythology?.name || "Sin mitología"}
        </p>
    </div>

     <!-- Botones de edición y eliminación -->
    <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-sm rounded-pill mx-2 btn-edit" 
                data-id="${god.id}">
            <i class="bi bi-pencil"></i> Editar
        </button>

        <button class="btn btn-outline-danger btn-sm rounded-pill mx-2 btn-delete" 
                data-id="${god.id}" >
            <i class="bi bi-trash"></i> Eliminar
        </button>
    </div>
`;

    // implemento la función generica para eliminar datos 
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.target.closest("button").getAttribute("data-id");

        // Llamar función de eliminación
        deleteResource(id, urlApi.urlGods, "Dios", reloadGods);

    });

    // Adaptación para dioses
    card.querySelector(".btn-edit").addEventListener("click", async (event) => {
        try {
            // Adaptamos el objeto al formato que espera el formulario
            const dios = {
                id: god.id,  // El id del dios, que se usa para el campo idGod en el cuerpo
                name: god.name,  // Nombre del dios
                imageGod: god.imageGod,  // URL de la imagen del dios
                mythology_id: god.mythology?.mythologyId || god.mythologyId // ID de la mitología asociada al dios
            };

            // Aquí se llama a la función que muestra el formulario para editar el dios
            renderGodForm(dios);
        } catch (error) {
            alertas("error", "Error al cargar dios", error.message);
        }
    });



    return card;
}

document.addEventListener("DOMContentLoaded", () => {

    fetchWithPagination({
        url: urlApi.urlGods,
        containerId: "containerGods",
        paginationId: "paginateGods",
        renderItemFn: renderGodCard,
        itemsPerPage: 3
    });
});
