import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderMysticLocationForm } from "./mysticLocationForm.js"; //
import { alertas } from "../alertas/alertas.js";

// Función para recargar las localizaciones místicas
export const reloadLocalitation = () => {
    const container = document.getElementById("containerMysticasLocation");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlMysticLocation,
        containerId: "containerMysticasLocation",
        paginationId: "paginateMysticasLocation",
        renderItemFn: renderMysticLocationCard,
        itemsPerPage: 4
    });
};

// Función para renderizar una tarjeta de localización mística
export function renderMysticLocationCard(mysticLocation) {
    const card = document.createElement("div");
    card.classList.add("col-lg-6", "col-md-6", "mb-6");

    card.innerHTML = `
    <div class="bg-white border rounded p-3 h-100 shadow">
        <ul class="list-unstyled m-0">
            <li class="d-flex justify-content-between align-items-center mb-2">
                <span>
                    <i class="fa fa-angle-right text-success mr-2"></i> 
                    <strong>${mysticLocation.name || "Sin nombre"}</strong>
                </span>
                <span>
                    <i class="fa-solid fa-pen-to-square text-warning mx-2 btn-edit" 
                       title="Editar" 
                       data-id="${mysticLocation.id}" 
                       style="cursor: pointer;"></i>
                    <i class="fa-solid fa-trash text-danger mx-2 btn-delete" 
                       title="Eliminar" 
                       data-id="${mysticLocation.id}" 
                       style="cursor: pointer;"></i>
                </span>
            </li>
            <li class="text-muted small">
                <i class="fa fa-map-marker-alt text-danger mr-2"></i>
                 ${mysticLocation.coordinates || "No disponibles"}
            </li>
            <li class="text-muted small">
               <i class="fa-solid fa-landmark text-success me-2"></i>
             ${mysticLocation.mythology?.name || "Sin mitología"}
            </li>
        </ul>
    </div>
`;


    // Evento eliminar
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        deleteResource(id, urlApi.urlMysticLocation, "Localización", reloadLocalitation);
    });


    card.querySelector(".btn-edit").addEventListener("click", async (event) => {
        try {

            const locationAdaptada = {
                id: mysticLocation.id,
                name: mysticLocation.name,
                coordinates: mysticLocation.coordinates,
                mythology_id: mysticLocation.mythology?.mythologyId || mysticLocation.mythologyId
            };

            renderMysticLocationForm(locationAdaptada);
        } catch (error) {
            alertas("error", "Error al cargar localización", error.message);
        }
    });

    return card;
}

// Carga inicial de localizaciones al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    fetchWithPagination({
        url: urlApi.urlMysticLocation,
        containerId: "containerMysticasLocation",
        paginationId: "paginateMysticasLocation",
        renderItemFn: renderMysticLocationCard,
        itemsPerPage: 4
    });
});
