import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderLanguageCard } from "./getDatalanguage.js";
import { getAllExplorer } from "../explorer/getDataExplorer.js"; // Asumiendo que quieres traer Exploradores

export async function renderLanguageForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("genericModalLabel");

    modalContent.innerHTML = "Cargando formulario...";

    modalTitle.textContent = data ? "Editar Lenguaje" : "Registrar Lenguaje";

    const explorers = await getAllExplorer();

    const optionsHtml = `<option disabled ${!data ? "selected" : ""}>Selecciona un explorador</option>` +
        explorers
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(e =>
                `<option value="${e.id_explorer}" ${e.id_explorer === data?.explorerId ? "selected" : ""}>${e.name}</option>`
            ).join("");

    const formHtml = `
        <form id="languageForm">
            ${data?.id ? `<input type="hidden" id="languageId" value="${data.id}">` : ""}
            <div class="mb-3">
                <label for="selectExplorer" class="form-label">Explorador</label>
                <select class="form-select" id="selectExplorer">${optionsHtml}</select>
            </div>
            <div class="mb-3">
                <label for="txtNameLanguage" class="form-label">Nombre del Lenguaje</label>
                <input type="text" class="form-control" id="txtNameLanguage" value="${data?.name || ""}">
            </div>
            <div class="mb-3">
                <label for="txtOriginRegion" class="form-label">Región de Origen</label>
                <input type="text" class="form-control" id="txtOriginRegion" value="${data?.originRegion || ""}">
            </div>
            <div class="mb-3">
                <label for="txtWritingSystem" class="form-label">Sistema de Escritura</label>
                <input type="text" class="form-control" id="txtWritingSystem" value="${data?.writingSystem || ""}">
            </div>
            <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
        </form>
    `;

    modalContent.innerHTML = formHtml;

    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();

    document.getElementById("languageForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validarFormularioLanguage()) {
            return;
        }

        const languageData = {
            name: document.getElementById("txtNameLanguage").value.trim(),
            originRegion: document.getElementById("txtOriginRegion").value.trim(),
            writingSystem: document.getElementById("txtWritingSystem").value.trim(),
            explorerId: parseInt(document.getElementById("selectExplorer").value)
        };

        if (data?.id) languageData.idLanguage = data.id;

        // console.log(languageData.idAncientLanguage);

        await insertarDatos(
            urlApi.urlLanguages,
            languageData,
            () => {
                alertas("success", data ? "Lenguaje actualizado" : "Lenguaje registrado", "Operación exitosa.");

                fetchWithPagination({
                    url: urlApi.urlLanguages,
                    containerId: "containerLanguage",
                    paginationId: "paginateLanguage",
                    renderItemFn: renderLanguageCard,
                    itemsPerPage: 4
                });

                const modal = bootstrap.Modal.getInstance(document.getElementById('genericModal'));
                modal.hide();
            },
            (error) => {
                alertas("error", "Error", error.message);
            }
        );
    });
}

function validarFormularioLanguage() {
    const nameInput = document.getElementById("txtNameLanguage");
    const originInput = document.getElementById("txtOriginRegion");
    const writingSystemInput = document.getElementById("txtWritingSystem");
    const explorerSelect = document.getElementById("selectExplorer");

    const name = nameInput.value.trim();
    const origin = originInput.value.trim();
    const writingSystem = writingSystemInput.value.trim();
    const explorerId = explorerSelect.value;

    if (!explorerId || explorerSelect.selectedIndex === 0) {
        alertas("warning", "Explorador requerido", "Debes seleccionar un explorador.");
        return false;
    }

    if (!name || !origin || !writingSystem) {
        alertas("warning", "Campos requeridos", "Todos los campos son obligatorios.");
        return false;
    }

    if (name.length > 100) {
        alertas("warning", "Nombre muy largo", "El nombre no debe superar los 45 caracteres.");
        return false;
    }

    if (origin.length > 100) {
        alertas("warning", "Región muy larga", "La región no debe superar los 100 caracteres.");
        return false;
    }

    if (writingSystem.length > 100) {
        alertas("warning", "Sistema de escritura muy largo", "El sistema de escritura no debe superar los 100 caracteres.");
        return false;
    }

    return true;
}

// Botón para agregar lenguaje nuevo
document.getElementById("btnAgregarLenguaje").addEventListener("click", () => {
    renderLanguageForm(); // modo registrar
});
