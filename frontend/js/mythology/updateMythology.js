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

async function saveUpdate() {
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
document.getElementById("saveMythologyChanges").addEventListener("click", () => {
    saveUpdate(); // Llamamos a la función para guardar los cambios
});