import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderDiscoveryForm } from "./discoveryForm.js"; //
import { alertas } from "../alertas/alertas.js";

// Función para recargar las localizaciones místicas
export const reloadDiscovery = () => {
    const container = document.getElementById("containerdiscovery");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlDiscovery,
        containerId: "containerdiscovery",
        paginationId: "paginatediscovery",
        renderItemFn: renderDiscoveryCard,
        itemsPerPage: 6
    });
};

// Función para renderizar una tarjeta de localización mística
export function renderDiscoveryCard(discovery) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

    card.innerHTML = `
    <div class="bg-white border rounded p-3 h-100 shadow">
        <ul class="list-unstyled m-0">
            <li class="d-flex justify-content-between align-items-center mb-2">
                <span>
                  
                      <i class="fa-solid fa-map-location-dot text-primary mr-2"></i>
                    <strong>${discovery.mysticLocation.name || "Sin nombre"}</strong>
                </span>
                <span>
                    <i class="fa-solid fa-pen-to-square text-warning mx-2 btn-edit" 
                       title="Editar" 
                       data-id="${discovery.id}" 
                       style="cursor: pointer;"></i>
                    <i class="fa-solid fa-trash text-danger mx-2 btn-delete" 
                       title="Eliminar" 
                       data-id="${discovery.id}" 
                       style="cursor: pointer;"></i>
                </span>
            </li>
            <li class="text-muted small">
                <i class="fa-solid fa-magnifying-glass text-success me-2"></i>
                Fecha de descubrimiento: ${discovery.date || "No disponible"}
            </li>
            <li class="text-muted small">
                <i class="fa-solid fa-hat-wizard text-info me-2"></i>
                Explorador: ${discovery.explorer?.name || "Sin explorador"}
            </li>
        </ul>
    </div>
    `;

    // Evento eliminar
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        deleteResource(id, urlApi.urlDiscovery, "Descubrimiento", reloadDiscovery);
    });

    // Evento editar (descomentado si quieres usarlo)
    card.querySelector(".btn-edit").addEventListener("click", async (event) => {
        try {
            const adaptedDiscovery = {
                discoveryDate: discovery.date,
                id: discovery.id,
                explorerId: discovery.explorer?.id_explorer || discovery.explorerId,
                locationId: discovery.mysticLocation.id
            };
            console.log(adaptedDiscovery);
            renderDiscoveryForm(adaptedDiscovery);
        } catch (error) {
            alertas("error", "Error al cargar el descubrimiento", error.message);
        }
    });

    return card;
}

// Carga inicial de localizaciones al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    fetchWithPagination({
        url: urlApi.urlDiscovery,
        containerId: "containerdiscovery",
        paginationId: "paginatediscovery",
        renderItemFn: renderDiscoveryCard,
        itemsPerPage: 6
    });
});
