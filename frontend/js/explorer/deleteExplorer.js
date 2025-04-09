import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllExplorer } from "./getDataExplorer.js"; // Importamos la función para actualizar el DOM
import { urlApi } from "../urlApis.js";

// Función para realizar la solicitud DELETE al servidor
async function serverDelete(id) {
    try {
        // Realizamos una solicitud DELETE al endpoint del backend
        let response = await fetch(urlApi.urlExplorers + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            }
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Lanzamos un error con el código y mensaje
        }

        // Mostramos una alerta de éxito
        alertas("success", "Explorador eliminado", "El explorador ha sido eliminado correctamente.");
        getAllExplorer(); // Actualizamos la lista de exploradores
    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al eliminar el explorador:", error);
        alertas("error", "Error al eliminar", "No se pudo eliminar el explorador.");
    }
}

// Función para manejar la eliminación del explorador
export function deleteExplorer(id) {
    // Mostramos una alerta personalizada para confirmar la eliminación
    alertas(
        "warning", // Tipo de alerta
        "Confirmar eliminación", // Título de la alerta
        "¿Estás seguro de que deseas eliminar este explorador?", // Mensaje de la alerta
        {
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelación
            showCancelButton: true, // Mostrar botón de cancelar
        }
    ).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, llamamos a la función para eliminar el explorador
            serverDelete(id);

        } else if (result.isDismissed) {
            // Si el usuario cancela, mostramos un mensaje opcional
            alertas("info", "Cancelado", "La eliminación del explorador fue cancelada.");
        }
    });
}