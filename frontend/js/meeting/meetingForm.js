import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderMeetingCard } from "./getDataMeeting.js";
import { fetchDataSimple } from "../generica/obtenerDatos.js"

export async function renderMeetingForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("genericModalLabel");

    modalContent.innerHTML = "Cargando formulario...";
    modalTitle.textContent = data ? "Editar Encuentro" : "Registrar Encuentro";

    // Obtenemos los exploradores y las criaturas
    const explorers = await fetchDataSimple(urlApi.urlExplorers);
    const creature = await fetchDataSimple(urlApi.urlCreatures);

    const explorerOptions = `<option disabled ${!data ? "selected" : ""}>Selecciona un explorador</option>` +
        explorers
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(e => `<option value="${e.id_explorer}" ${e.id_explorer === data?.explorerId ? "selected" : ""}>${e.name}</option>`)
            .join("");

    const creatureOptions = `<option disabled ${!data ? "selected" : ""}>Selecciona una criatura</option>` +
        creature
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(c => `<option value="${c.id}" ${c.id === data?.creatureId ? "selected" : ""}>${c.name}</option>`)
            .join("");
    const formHtml = `
        <form id="meetingForm">
        ${data?.id ? `<input type="hidden" id="id_Meeting" value="${data.id}">` : ""}
            <div class="mb-3">
                <label for="selectExplorador" class="form-label">Explorador</label>
                <select class="form-select" id="selectExplorador">${explorerOptions}</select>
            </div>
            <div class="mb-3">
                <label for="selectCriatura" class="form-label">Criatura</label>
                <select class="form-select" id="selectCriatura">${creatureOptions}</select>
            </div>
            <div class="mb-3">
                <label for="txtFechaEncuentro" class="form-label">Fecha de Encuentro</label>
                <input type="date" class="form-control" id="txtFechaEncuentro" value="${data?.Date || ""}">
            </div>
            <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
        </form>
    `;

    modalContent.innerHTML = formHtml;

    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();

    // Envío del formulario
    document.getElementById("meetingForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const id_explorer = document.getElementById("selectExplorador").value;
        const id_creature = document.getElementById("selectCriatura").value;
        const date_meeting = document.getElementById("txtFechaEncuentro").value;

        // Validaciones básicas
        if (!id_explorer || !id_creature || !date_meeting) {
            alertas("warning", "Campos requeridos", "Por favor completa todos los campos.");
            return;
        }

        const meetingData = {
            id_explorer: parseInt(id_explorer),
            id_creature: parseInt(id_creature),
            date_meeting
        };

        if (data?.id_Meeting) {
            meetingData.id_Meeting = data.id_Meeting;
        }

        console.log(meetingData)

        await insertarDatos(
            urlApi.urlMeeting,
            meetingData,
            () => {
                alertas("success", data ? "Encuentro actualizado" : "Encuentro registrado", "Operación exitosa.");
                fetchWithPagination({
                    url: urlApi.urlMeeting,
                    containerId: "containerMeeting",
                    paginationId: "paginateMeeting",
                    renderItemFn: renderMeetingCard,
                    itemsPerPage: 3
                });

                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('genericModal'));
                modalInstance.hide();
            },
            (error) => {
                alertas("error", "Error al guardar", error.message);
            }
        );
    });
}

document.getElementById("btnAgregarMeeting").addEventListener("click", () => {
    renderMeetingForm(); // sin datos, así se activa el modo "registrar"
});