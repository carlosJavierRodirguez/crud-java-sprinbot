import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllExplorer } from "./getDataExplorer.js"; // Importamos la función para obtener todos los exploradores

// Función para abrir el modal y llenar el formulario con los datos del explorador
export function openUpdateExplorerModal(explorer) {
    // Llenamos el formulario con los datos del explorador
    document.getElementById("explorerName").value = explorer.name;
    document.getElementById("explorerAge").value = explorer.age;
    document.getElementById("explorerNationality").value = explorer.nationality;
    document.getElementById("explorerId").value = explorer.id_explorer;
    document.getElementById("explorerReputation").value = explorer.reputation;
    document.getElementById("explorerImage").value = explorer.imageExplorer;

    // Mostramos el modal
    const updateExplorerModal = new bootstrap.Modal(document.getElementById("updateExplorerModal"));
    updateExplorerModal.show();
}

async function saveUpdate() {
    // Obtenemos los datos del formulario
    const explorerData = {
        id: document.getElementById("explorerId").value,
        name: document.getElementById("explorerName").value,
        age: document.getElementById("explorerAge").value,
        nationality: document.getElementById("explorerNationality").value,
        reputation: document.getElementById("explorerReputation").value,
        image_explorer: document.getElementById("explorerImage").value, // Cambiado a "image_explorer"
    };

    try {
        // Realizamos una solicitud POST al servidor para actualizar el explorador
        let response = await fetch("http://localhost:8085/api/v1/explorer/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            },
            body: JSON.stringify(explorerData) // Convertimos los datos del explorador a JSON
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Lanzamos un error con el código y mensaje
        }

        // Mostramos una alerta de éxito
        alertas("success", "Explorador actualizado", "El explorador ha sido actualizado correctamente.");

        // Cerramos el modal
        const updateExplorerModal = bootstrap.Modal.getInstance(document.getElementById("updateExplorerModal"));
        updateExplorerModal.hide();

        // Actualizamos la lista de exploradores
        getAllExplorer();

    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al actualizar el explorador:", error);
        alertas("error", "Error al actualizar", "No se pudo actualizar el explorador.");
    }
}



// Asociamos el evento al botón "Guardar cambios"
document.getElementById("saveExplorerChanges").addEventListener("click", () => {
    saveUpdate(); // Llamamos a la función para guardar los cambios
});