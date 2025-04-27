import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { getAllMythology } from "../mythology/getDataMythology.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderLegendCard } from "./getDataLegend.js";

export async function renderLeyendaForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("leyendaModalLabel");

    modalContent.innerHTML = "Cargando formulario...";

    // Cambiar el título según si estamos creando o editando
    modalTitle.textContent = data ? "Editar Leyenda" : "Registrar Leyenda";

    const mythologies = await getAllMythology();

    const optionsHtml = `<option disabled ${!data ? "selected" : ""}>Selecciona una mitología</option>` +
        mythologies
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(m =>
                `<option value="${m.mythologyId}" ${m.mythologyId === data?.mythology_id ? "selected" : ""}>${m.name}</option>`
            ).join("");

    const formHtml = `
        <form id="leyendaForm">
            ${data?.id ? `<input type="hidden" id="leyendaId" value="${data.id}">` : ""}
            <div class="mb-3">
                <label for="selectMitologia" class="form-label">Mitología</label>
                <select class="form-select" id="selectMitologia">${optionsHtml}</select>
            </div>
            <div class="mb-3">
                <label for="txtTituloLeyenda" class="form-label">Título</label>
                <input type="text" class="form-control" id="txtTituloLeyenda" value="${data?.title || ""}" >
            </div>
            <div class="mb-3">
                <label for="txtTextoLeyenda" class="form-label">Leyenda</label>
                <textarea class="form-control" id="txtTextoLeyenda" rows="4" >${data?.story || ""}</textarea>
                <small id="contadorHistoria" class="form-text text-muted">0/500 caracteres</small>
            </div>
            <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
        </form>
    `;

    modalContent.innerHTML = formHtml;

    const storyTextarea = document.getElementById("txtTextoLeyenda");
    const contadorHistoria = document.getElementById("contadorHistoria");

    const actualizarContador = () => {
        const length = storyTextarea.value.length;
        contadorHistoria.textContent = `${length}/500 caracteres`;
        contadorHistoria.style.color = length > 500 ? "red" : "#6c757d"; // visual feedback
    };

    storyTextarea.addEventListener("input", actualizarContador);
    actualizarContador(); // iniciar contador si hay texto previo

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('leyendaModal'));
    modal.show();

    // Aquí es donde se agrega la lógica de envío
    document.getElementById("leyendaForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validación previa
        if (!validarFormularioLeyenda()) {
            return; // No continúa si no pasa validación
        }

        // Construir el objeto con los datos del formulario
        const leyendaData = {
            mythologyId: parseInt(document.getElementById("selectMitologia").value),
            title: document.getElementById("txtTituloLeyenda").value.trim(),
            story: document.getElementById("txtTextoLeyenda").value.trim()
        };

        if (data?.id) leyendaData.idLegend = data.id;

        await insertarDatos(
            urlApi.urlLegends,
            leyendaData,
            () => {
                alertas("success", data ? "Leyenda actualizada" : "Leyenda registrada", "Operación exitosa.");

                fetchWithPagination({
                    url: urlApi.urlLegends,
                    containerId: "containerLegends",
                    paginationId: "paginateLegends",
                    renderItemFn: renderLegendCard,
                    itemsPerPage: 2
                });

                const modal = bootstrap.Modal.getInstance(document.getElementById('leyendaModal'));
                modal.hide();
            },
            (error) => {
                alertas("error", "Error", error.message);
            }
        );
    });

}

function validarFormularioLeyenda() {
    const titleInput = document.getElementById("txtTituloLeyenda");
    const storyInput = document.getElementById("txtTextoLeyenda");
    const mythologySelect = document.getElementById("selectMitologia");

    const title = titleInput.value.trim();
    const story = storyInput.value.trim();
    const mythologyId = mythologySelect.value;

    if (!mythologyId || mythologySelect.selectedIndex === 0) {
        alertas("warning", "Mitología requerida", "Debes seleccionar una mitología.");
        return false;
    }

    if (!title || !story) {
        alertas("warning", "Campos requeridos", "Todos los campos son obligatorios.");
        return false;
    }

    if (title.length > 45) {
        alertas("warning", "Título muy largo", "El título no debe superar los 45 caracteres.");
        return false;
    }

    if (story.length > 500) {
        alertas("warning", "Texto muy largo", "La historia no debe superar los 500 caracteres.");
        return false;
    }

    return true;
}


document.getElementById("btnAgregarLeyenda").addEventListener("click", () => {
    renderLeyendaForm(); // sin datos, así se activa el modo "registrar"
});
