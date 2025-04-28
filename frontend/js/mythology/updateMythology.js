import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllMythology } from "./getDataMythology.js"; // Importamos la función para obtener todas las mitologías
import { urlApi } from "../urlApis.js";

// Función para abrir el modal y llenar el formulario con los datos de la mitología
export function openUpdateMythologyModal(mythology) {
    // Llenamos el formulario con los datos de la mitología
    document.getElementById("txtMythologyName").value = mythology.name;
    document.getElementById("txtMythologyId").value = mythology.mythologyId;

    // Mostramos el modal
    const updateMythologyModal = new bootstrap.Modal(document.getElementById("updateMythologyModal"));
    updateMythologyModal.show();
}

// Función para validar los datos del formulario
function validateMythologyForm() {
    const name = document.getElementById("txtMythologyName").value.trim();
    const id = document.getElementById("txtMythologyId").value.trim();

    // Validar el campo Nombre
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alertas("error", "Error en el formulario", "El nombre solo puede contener letras y espacios.");
        return false;
    }

    // Validar el campo ID (opcional, si es necesario)
    if (!/^\d+$/.test(id)) {
        alertas("error", "Error en el formulario", "El ID debe ser un número válido.");
        return false;
    }

    // Si todas las validaciones pasan, retorna true
    return true;
}

// Función para guardar los cambios de la mitología
async function saveUpdate() {
    // Validar los datos del formulario antes de enviarlos
    if (!validateMythologyForm()) {
        return; // Detenemos el proceso si los datos no son válidos
    }

    // Obtenemos los datos del formulario
    const mythologyData = {
        idMythology: document.getElementById("txtMythologyId").value,
        name: document.getElementById("txtMythologyName").value,
    };

    try {
        // Realizamos una solicitud POST al servidor para actualizar la mitología
        let response = await fetch(urlApi.urlMythology, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            },
            body: JSON.stringify(mythologyData) // Convertimos los datos de la mitología a JSON
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Lanzamos un error con el código y mensaje
        }

        // Mostramos una alerta de éxito
        alertas("success", "Mitología actualizada", "La mitología ha sido actualizada correctamente.");

        // Cerramos el modal
        const updateMythologyModal = bootstrap.Modal.getInstance(document.getElementById("updateMythologyModal"));
        updateMythologyModal.hide();

        // Actualizamos la lista de mitologías
        getAllMythology();

    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al actualizar la mitología:", error);
        alertas("error", "Error al actualizar", "No se pudo actualizar la mitología.");
    }
}

// Asociamos el evento al botón "Guardar cambios"
const saveButton = document.getElementById("saveMythologyChanges");

if (saveButton) {
    saveButton.addEventListener("click", () => {
        saveUpdate(); // Llamamos a la función para guardar los cambios
    });
} else {
    // console.error("El botón 'saveMythologyChanges' no se encuentra en el DOM.");
}
