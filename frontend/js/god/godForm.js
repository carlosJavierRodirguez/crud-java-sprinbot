import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { getAllMythology } from "../mythology/getDataMythology.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderGodCard } from "./getDataGod.js";

export async function renderGodForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("genericModalLabel");

    modalContent.innerHTML = "Cargando formulario...";

    // Cambiar el título según si estamos creando o editando
    modalTitle.textContent = data ? "Editar Dios" : "Registrar Dios";

    const mythologies = await getAllMythology();

    const optionsHtml = `<option disabled ${!data ? "selected" : ""}>Selecciona una mitología</option>` +
        mythologies
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(m =>
                `<option value="${m.mythologyId}" ${m.mythologyId === data?.mythology_id ? "selected" : ""}>${m.name}</option>`
            ).join("");

    const formHtml = `
        <form id="godForm">
            ${data?.id ? `<input type="hidden" id="godId" value="${data.id}">` : ""}
            <div class="mb-3">
                <label for="selectMitologia" class="form-label">Mitología</label>
                <select class="form-select" id="selectMitologia">${optionsHtml}</select>
            </div>
            <div class="mb-3">
                <label for="txtNombreDios" class="form-label">Nombre del Dios</label>
                <input type="text" class="form-control" id="txtNombreDios" value="${data?.name || ""}" >
            </div>
            <div class="mb-3">
                <label for="txtImagenDios" class="form-label">Imagen del Dios</label>
                <br>
                 <strong>tamaño recomendado: 400 x 250 Pixeles</strong> 
                <input type="text" class="form-control" id="txtImagenDios" value="${data?.imageGod || ""}">
            </div>
            <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
        </form>
    `;

    modalContent.innerHTML = formHtml;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();

    // Aquí es donde se agrega la lógica de envío
    document.getElementById("godForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validación previa
        if (!validarFormularioDios()) {
            return; // No continúa si no pasa validación
        }

        // Construir el objeto con los datos del formulario
        const godData = {
            mythologyId: parseInt(document.getElementById("selectMitologia").value),
            name: document.getElementById("txtNombreDios").value.trim(),
            imageGod: document.getElementById("txtImagenDios").value.trim()
        };

        if (data?.id) godData.idGod = data.id;

        await insertarDatos(
            urlApi.urlGods,
            godData,
            () => {
                alertas("success", data ? "Dios actualizado" : "Dios registrado", "Operación exitosa.");

                // Llamada para recargar los dioses
                fetchWithPagination({
                    url: urlApi.urlGods,
                    containerId: "containerGods",
                    paginationId: "paginateGods",
                    renderItemFn: renderGodCard,  // Asegúrate de tener esta función para renderizar los dioses
                    itemsPerPage: 3
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

function validarFormularioDios() {
    const nameInput = document.getElementById("txtNombreDios");
    const imageInput = document.getElementById("txtImagenDios");
    const mythologySelect = document.getElementById("selectMitologia");

    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    const mythologyId = mythologySelect.value;

    if (!mythologyId || mythologySelect.selectedIndex === 0) {
        alertas("warning", "Mitología requerida", "Debes seleccionar una mitología.");
        return false;
    }

    if (!name || !image) {
        alertas("warning", "Campos requeridos", "Todos los campos son obligatorios.");
        return false;
    }

    if (name.length > 50) {
        alertas("warning", "Nombre muy largo", "El nombre del dios no debe superar los 50 caracteres.");
        return false;
    }

    if (image.length > 255) {
        alertas("warning", "Imagen muy larga", "La URL de la imagen no debe superar los 255 caracteres.");
        return false;
    }

    return true;
}

// Agregar evento para crear un nuevo Dios
document.getElementById("btnAgregarDios").addEventListener("click", () => {
    renderGodForm(); // Sin datos, activa el modo "registrar"
});
