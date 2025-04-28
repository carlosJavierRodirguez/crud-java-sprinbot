import { insertarDatos } from "../generica/insertarDatos.js";
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";
import { getAllMythology } from "../mythology/getDataMythology.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { renderArtefatc } from "./getDataArtefact.js";  // Asegúrate de que esta funció existe

export async function renderArtefactForm(data = null) {
    const modalContent = document.getElementById("modalContent");
    const modalTitle = document.getElementById("genericModalLabel");

    modalContent.innerHTML = "Cargando formulario...";

    // Cambiar el título según si estamos creando o editando
    modalTitle.textContent = data ? "Editar Artefacto" : "Registrar Artefacto";

    const mythologies = await getAllMythology();

    const optionsHtml = `<option disabled ${!data ? "selected" : ""}>Selecciona una mitología</option>` +
        mythologies
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(m =>
                `<option value="${m.mythologyId}" ${m.mythologyId === data?.mythologyId ? "selected" : ""}>${m.name}</option>`
            ).join("");

    // Actualiza el formulario para incluir el campo oculto de id
    const formHtml = `
    <form id="artifactForm">
        ${data?.id ? `<input type="hidden" id="artifactId" value="${data.id}">` : ""}
        <div class="mb-3">
            <label for="selectMitologia" class="form-label">Mitología</label>
            <select class="form-select" id="selectMitologia">${optionsHtml}</select>
        </div>
        <div class="mb-3">
            <label for="txtNombreArtefacto" class="form-label">Nombre del Artefacto</label>
            <input type="text" class="form-control" id="txtNombreArtefacto" value="${data?.name || ""}" >
        </div>
        <div class="mb-3">
            <label for="txtImagenArtefacto" class="form-label">Imagen del Artefacto</label>
            <br>
             <strong>tamaño recomendado: 400 x 250 Pixeles</strong> 
            <input type="text" class="form-control" id="txtImagenArtefacto" value="${data?.imageArtifact || ""}">
        </div>
        <button type="submit" class="btn btn-primary">${data ? "Actualizar" : "Guardar"}</button>
    </form>
`;

    modalContent.innerHTML = formHtml;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();

    // Aquí es donde se agrega la lógica de envío
    document.getElementById("artifactForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validación previa
        if (!validarFormularioArtefacto()) {
            return; // No continúa si no pasa validación
        }

        // Construir el objeto con los datos del formulario
        const artifactData = {
            mythologyId: parseInt(document.getElementById("selectMitologia").value),
            name: document.getElementById("txtNombreArtefacto").value.trim(),
            imageArtifact: document.getElementById("txtImagenArtefacto").value.trim()
        };
        console.log("si llega el id", data?.id);

        if (data?.id) artifactData.idArtifact = data.id; // Asegurarse de usar el id y no idArtifact

        await insertarDatos(
            urlApi.urlArtefacts,
            artifactData,
            () => {
                alertas("success", data ? "Artefacto actualizado" : "Artefacto registrado", "Operación exitosa.");

                // Llamada para recargar los artefactos
                fetchWithPagination({
                    url: urlApi.urlArtefacts,
                    containerId: "containerArtefact",
                    paginationId: "paginateArtefact",
                    renderItemFn: renderArtefatc,
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

function validarFormularioArtefacto() {
    const nameInput = document.getElementById("txtNombreArtefacto");
    const imageInput = document.getElementById("txtImagenArtefacto");
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

    if (name.length > 100) {
        alertas("warning", "Nombre muy largo", "El nombre del artefacto no debe superar los 100 caracteres.");
        return false;
    }

    if (image.length > 255) {
        alertas("warning", "Imagen muy larga", "La URL de la imagen no debe superar los 255 caracteres.");
        return false;
    }

    return true;
}

const btnAgregarArtefacto = document.getElementById("btnAgregarArtefacto");

if (btnAgregarArtefacto) {
    btnAgregarArtefacto.addEventListener("click", () => {
        renderArtefactForm(); // Sin datos, activa el modo "registrar"
    });
}

