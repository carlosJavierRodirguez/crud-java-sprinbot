import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderArtefactForm } from "./artefactForm.js";
import { alertas } from "../alertas/alertas.js";

export const reloadArtefact = () => {
    const container = document.getElementById("containerArtefact");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlArtefacts,
        containerId: "containerArtefact",
        paginationId: "paginateArtefact",
        renderItemFn: renderArtefatc,
        itemsPerPage: 3
    });
};


export function renderArtefatc(artifact) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

    card.innerHTML = `
    <div class="destination-item position-relative overflow-hidden mb-4 rounded-lg shadow-lg">
        <!-- Imagen del artefacto con dimensiones fijas de 400x250 y bordes redondeados -->
        <img class="img-fluid w-100" src="${artifact.imageArtifact}" alt="${artifact.name}" 
             style="height: 250px; object-fit: cover; border-radius: 10px;">
    </div>

    <!-- Nombre del artefacto debajo de la imagen -->
    <div class="text-center mt-3">
        <h5 class="text-black font-weight-bold" style="font-size: 1.2rem;">${artifact.name}</h5>
    </div>

    <!-- Mitología debajo del nombre -->
    <div class="text-center mt-2">
        <p class="text-muted" style="font-size: 1rem; margin-bottom: 0;">
            <strong>Mitología:</strong> ${artifact.mythology?.name || "Sin mitología"}
        </p>
    </div>

    <!-- Botones de edición y eliminación -->
    <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-sm rounded-pill mx-2 btn-edit" 
                data-id="${artifact.id}">
            <i class="bi bi-pencil"></i> Editar
        </button>

        <button class="btn btn-outline-danger btn-sm rounded-pill mx-2 btn-delete" 
                data-id="${artifact.id}" >
            <i class="bi bi-trash"></i> Eliminar
        </button>
    </div>
`;

    // implemento la función generica para eliminar datos 
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.target.closest("button").getAttribute("data-id");
        deleteResource(id, urlApi.urlArtefacts, "Artefacto", reloadArtefact);
    });

    card.querySelector(".btn-edit").addEventListener("click", async (event) => {
        try {
            // Adaptamos el objeto al formato que espera el formulario
            const artefactoAdaptado = {
                id: artifact.id, // Este es el id que enviarás
                name: artifact.name,
                imageArtifact: artifact.imageArtifact,
                mythology_id: artifact.mythology?.mythologyId || artifact.mythologyId
            };

            // Llamamos a la función para renderizar el formulario con los datos del artefacto
            renderArtefactForm(artefactoAdaptado);
        } catch (error) {
            alertas("error", "Error al cargar artefacto", error.message);
        }
    });

    return card;
}

export function renderArtefatcIndex(artifact) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

    card.innerHTML = `
    <div class="destination-item position-relative overflow-hidden mb-4 rounded-lg shadow-lg">
        <!-- Imagen del artefacto con dimensiones fijas de 400x250 y bordes redondeados -->
        <img class="img-fluid w-100" src="${artifact.imageArtifact}" alt="${artifact.name}" 
             style="height: 250px; object-fit: cover; border-radius: 10px;">
    </div>

    <!-- Nombre del artefacto debajo de la imagen -->
    <div class="text-center mt-3">
        <h5 class="text-black font-weight-bold" style="font-size: 1.2rem;">${artifact.name}</h5>
    </div>

    <!-- Mitología debajo del nombre -->
    <div class="text-center mt-2">
        <p class="text-muted" style="font-size: 1rem; margin-bottom: 0;">
            <strong>Mitología:</strong> ${artifact.mythology?.name || "Sin mitología"}
        </p>
    </div>

`;
    return card;
}

document.addEventListener("DOMContentLoaded", () => {
    
    if (document.getElementById("containerArtefact")) {
        fetchWithPagination({
            url: urlApi.urlArtefacts,
            containerId: "containerArtefact",
            paginationId: "paginateArtefact",
            renderItemFn: renderArtefatc,
            itemsPerPage: 3
        });
    }


    if (document.getElementById("containerArtefactIndex")) {
        fetchWithPagination({
            url: urlApi.urlArtefacts,
            containerId: "containerArtefactIndex",
            paginationId: "paginateArtefact",
            renderItemFn: renderArtefatcIndex,
            itemsPerPage: 3
        });
    }

});