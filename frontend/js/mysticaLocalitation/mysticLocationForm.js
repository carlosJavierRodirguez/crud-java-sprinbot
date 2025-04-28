import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { getAllMythology } from "../mythology/getDataMythology.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderMysticLocationCard } from "./getDataLocalitation.js"; // O como se llame tu renderizado

export async function renderMysticLocationForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("genericModalLabel");

    modalContent.innerHTML = "Cargando formulario...";
    modalTitle.textContent = data ? "Editar Ubicación Mística" : "Registrar Ubicación Mística";

    const mythologies = await getAllMythology();

    const optionsHtml = `<option disabled ${!data ? "selected" : ""}>Selecciona una mitología</option>` +
        mythologies
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(m =>
                `<option value="${m.mythologyId}" ${m.mythologyId === data?.mythology_id ? "selected" : ""}>${m.name}</option>`
            ).join("");

    const formHtml = `
        <form id="mysticLocationForm">
            ${data?.id ? `<input type="hidden" id="locationId" value="${data.id}">` : ""}
            <div class="mb-3">
                <label for="selectMitologia" class="form-label">Mitología</label>
                <select class="form-select" id="selectMitologia">${optionsHtml}</select>
            </div>
            <div class="mb-3">
                <label for="txtNombreUbicacion" class="form-label">Nombre de la ubicación</label>
                <input type="text" class="form-control" id="txtNombreUbicacion" value="${data?.name || ""}">
            </div>
            <div class="mb-3">
                <label for="txtCoordenadas" class="form-label">Coordenadas</label>
                <input type="text" class="form-control" id="txtCoordenadas" value="${data?.coordinates || ""}">
            </div>
            <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
        </form>
    `;

    modalContent.innerHTML = formHtml;

    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();

    document.getElementById("mysticLocationForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validarFormularioUbicacion()) {
            return;
        }

        const locationData = {
            mythologyId: parseInt(document.getElementById("selectMitologia").value),
            name: document.getElementById("txtNombreUbicacion").value.trim(),
            coordinates: document.getElementById("txtCoordenadas").value.trim()
        };

        if (data?.id) locationData.id = data.id;

        await insertarDatos(
            urlApi.urlMysticLocation,
            locationData,
            () => {
                alertas("success", data ? "Ubicación actualizada" : "Ubicación registrada", "Operación exitosa.");

                fetchWithPagination({
                    url: urlApi.urlMysticLocation,
                    containerId: "containerMysticasLocation",
                    paginationId: "paginateMysticasLocation",
                    renderItemFn: renderMysticLocationCard,
                    itemsPerPage: 4
                });

                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('genericModal'));
                modalInstance.hide();
            },
            (error) => {
                alertas("error", "Error", error.message);
            }
        );
    });
}

function validarFormularioUbicacion() {
    const nameInput = document.getElementById("txtNombreUbicacion");
    const coordInput = document.getElementById("txtCoordenadas");
    const mythologySelect = document.getElementById("selectMitologia");

    const name = nameInput.value.trim();
    const coordinates = coordInput.value.trim();
    const mythologyId = mythologySelect.value;

    if (!mythologyId || mythologySelect.selectedIndex === 0) {
        alertas("warning", "Mitología requerida", "Debes seleccionar una mitología.");
        return false;
    }

    if (!name || !coordinates) {
        alertas("warning", "Campos requeridos", "Todos los campos son obligatorios.");
        return false;
    }

    if (name.length > 100) {
        alertas("warning", "Nombre muy largo", "El nombre no debe superar los 100 caracteres.");
        return false;
    }

    if (coordinates.length > 100) {
        alertas("warning", "Coordenadas muy largas", "Las coordenadas no deben superar los 100 caracteres.");
        return false;
    }

    return true;
}

document.getElementById("btnAgregarlocalizacion").addEventListener("click", () => {
    renderMysticLocationForm();
});
