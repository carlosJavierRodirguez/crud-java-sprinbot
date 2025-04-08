import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllMythology } from "./getDataMythology.js"; // Importamos la función para actualizar el DOM

// Función para realizar la solicitud DELETE al servidor
async function serverDelete(id) {
    try {
        // Realizamos una solicitud DELETE al endpoint del backend
        let response = await fetch(`http://localhost:8085/api/v1/mythology/${id}`, {
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
        alertas("success", "Mitología eliminada", "La mitología ha sido eliminada correctamente.");
        getAllMythology(); // Actualizamos la lista de mitologías
    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al eliminar la mitología:", error);
        alertas("error", "Error al eliminar", "No se pudo eliminar la mitología.");
    }
}

// Función para manejar la eliminación de la mitología
export function deleteMythology(id) {
    // Mostramos una alerta personalizada para confirmar la eliminación
    alertas(
        "warning", // Tipo de alerta
        "Confirmar eliminación", // Título de la alerta
        "¿Estás seguro de que deseas eliminar esta mitología?", // Mensaje de la alerta
        {
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelación
            showCancelButton: true, // Mostrar botón de cancelar
        }
    ).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, llamamos a la función para eliminar la mitología
            serverDelete(id);
        } else if (result.isDismissed) {
            // Si el usuario cancela, mostramos un mensaje opcional
            alertas("info", "Cancelado", "La eliminación de la mitología fue cancelada.");
        }
    });
}