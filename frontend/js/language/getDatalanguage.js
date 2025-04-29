import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderLanguageForm } from "./languageForm.js"; //
import { alertas } from "../alertas/alertas.js";

// Función para recargar las localizaciones místicas
export const reloadLanguage = () => {
    const container = document.getElementById("containerLanguage");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlLanguages,
        containerId: "containerLanguage",
        paginationId: "paginateLanguage",
        renderItemFn: renderLanguageCard,
        itemsPerPage: 4
    });
};

// Función para renderizar una tarjeta de localización mística
export function renderLanguageCard(language) {
    const card = document.createElement("div");
    card.classList.add("col-lg-6", "col-md-6", "mb-6");

    card.innerHTML = `
    <div class="bg-white border rounded p-3 h-100 shadow">
        <ul class="list-unstyled m-0">
            <li class="d-flex justify-content-between align-items-center mb-2">
                <span>
                    <i class="fa fa-angle-right text-success mr-2"></i> 
                    <strong>${language.name || "Sin nombre"}</strong>
                </span>
                <span>
                    <i class="fa-solid fa-pen-to-square text-warning mx-2 btn-edit" 
                       title="Editar" 
                       data-id="${language.id_ancient_language}" 
                       style="cursor: pointer;"></i>
                    <i class="fa-solid fa-trash text-danger mx-2 btn-delete" 
                       title="Eliminar" 
                       data-id="${language.id_ancient_language}" 
                       style="cursor: pointer;"></i>
                </span>
            </li>
            <li class="text-muted small">
                <i class="fa-solid fa-globe text-primary mr-2"></i>
                 Origen: ${language.originRegion || "No disponible"}
            </li>
            <li class="text-muted small">
                <i class="fa-solid fa-pen-fancy text-success me-2"></i>
                Sistema de escritura: ${language.writingSystem || "No disponible"}
            </li>
            <li class="text-muted small">
                <i class="fa-solid fa-hat-wizard text-info me-2"></i>
                Explorador: ${language.explorer?.name || "Sin explorador"}
            </li>
        </ul>
    </div>
    `;

    // Evento eliminar
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        deleteResource(id, urlApi.urlLanguages, "Lenguaje antiguo", reloadLanguage);
    });

    // Evento editar 
    card.querySelector(".btn-edit").addEventListener("click", async (event) => {
        try {
            const adaptedLanguage = {
                id: language.id_ancient_language,
                name: language.name,
                originRegion: language.originRegion,
                writingSystem: language.writingSystem,
                explorerId: language.explorer?.id_explorer || language.explorerId
            };
            renderLanguageForm(adaptedLanguage);
        } catch (error) {
            alertas("error", "Error al cargar el lenguaje", error.message);
        }
    });


    return card;
}


// Carga inicial de localizaciones al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    fetchWithPagination({
        url: urlApi.urlLanguages,
        containerId: "containerLanguage",
        paginationId: "paginateLanguage",
        renderItemFn: renderLanguageCard,
        itemsPerPage: 4
    });
});
