
import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { fetchDataSimple } from "../generica/obtenerDatos.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderDiscoveryCard } from "./getDataDiscovery.js";

export async function renderDiscoveryForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("genericModalLabel");

    modalContent.innerHTML = "Cargando formulario...";

    modalTitle.textContent = data ? "Editar Descubrimiento" : "Registrar Descubrimiento";

    // Obtener los exploradores y las ubicaciones
    const explorers = await fetchDataSimple(urlApi.urlExplorers);
    const locations = await fetchDataSimple(urlApi.urlMysticLocation);

    // Asegúrate de que las opciones de exploradores y ubicaciones sean correctas
    const explorerOptions = `<option disabled ${!data ? "selected" : ""}>Selecciona un explorador</option>` +
        explorers
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(e => `<option value="${e.id_explorer}" ${e.id_explorer === data?.explorerId ? "selected" : ""}>${e.name}</option>`)
            .join("");

    const locationOptions = `<option disabled ${!data ? "selected" : ""}>Selecciona una ubicación</option>` +
        locations
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(l => `<option value="${l.id}" ${l.id === data?.id ? "selected" : ""}>${l.name}</option>`)

            .join("");

    //console.log(data);
    // HTML del formulario
    const formHtml = `
        <form id="discoveryForm">
            ${data?.id ? `<input type="hidden" id="discoveryId" value="${data.id}">` : ""}
            <div class="mb-3">
                <label for="selectExplorer" class="form-label">Explorador</label>
                <select class="form-select" id="selectExplorer">${explorerOptions}</select>
            </div>
            <div class="mb-3">
                <label for="selectLocation" class="form-label">Ubicación</label>
                <select class="form-select" id="selectLocation">${locationOptions}</select>
            </div>
            <div class="mb-3">
                <label for="inputDate" class="form-label">Fecha</label>
                <input type="date" class="form-control" id="inputDate" value="${data?.discoveryDate || ""}">
            </div>
            <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
        </form>
    `;

    modalContent.innerHTML = formHtml;

    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();

    // Manejar el evento de envío del formulario
    document.getElementById("discoveryForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validar formulario
        if (!validarFormularioDiscovery()) {
            return;
        }

        // Obtener los datos del formulario
        const discoveryData = {
            explorerId: parseInt(document.getElementById("selectExplorer").value), // Valor del explorador
            locationId: parseInt(document.getElementById("selectLocation").value), // Valor de la ubicación
            date: document.getElementById("inputDate").value, // Valor de la fecha
        };

        // Si estamos editando, agregar el id al objeto
        if (data?.id) {
            discoveryData.id = data.id;
        }

        //console.log(discoveryData);  // Verifica que los datos sean correctos antes de enviar

        // Enviar los datos para actualizar o guardar
        await insertarDatos(
            urlApi.urlDiscovery,
            discoveryData,
            () => {
                alertas("success", data ? "Descubrimiento actualizado" : "Descubrimiento registrado", "Operación exitosa.");

                // Actualizar la vista con los nuevos datos
                fetchWithPagination({
                    url: urlApi.urlDiscovery,
                    containerId: "containerdiscovery",
                    paginationId: "paginatediscovery",
                    renderItemFn: renderDiscoveryCard,
                    itemsPerPage: 6
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



function validarFormularioDiscovery() {
    const dateInput = document.getElementById("inputDate");
    const explorerSelect = document.getElementById("selectExplorer");
    const locationSelect = document.getElementById("selectLocation");

    const fecha = dateInput.value.trim();
    const explorerId = explorerSelect.value;
    const locationId = locationSelect.value;

    if (!explorerId || explorerSelect.selectedIndex === 0) {
        alertas("warning", "Explorador requerido", "Debes seleccionar un explorador.");
        return false;
    }

    if (!locationId || locationSelect.selectedIndex === 0) {
        alertas("warning", "Ubicación requerida", "Debes seleccionar una ubicación.");
        return false;
    }

    if (!fecha) {
        alertas("warning", "Fecha requerida", "Debes seleccionar una fecha válida.");
        return false;
    }

    return true;
}

// Botón para agregar descubrimiento nuevo
document.getElementById("btnAgregarDiscovery").addEventListener("click", () => {
    renderDiscoveryForm(); // modo registrar
});
