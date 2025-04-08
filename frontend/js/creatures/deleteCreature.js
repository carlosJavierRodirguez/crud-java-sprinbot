import { getAllCreatures } from "./getDataCreature.js"; // Importamos la función para obtener todas las criaturas
import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas

// Función para realizar la solicitud DELETE al servidor
export async function serverCreature(id) {
    try {
        // Realizamos la solicitud DELETE al servidor
        let response = await fetch(`http://localhost:8085/api/v1/creature/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Mostramos una alerta de éxito
        alertas("success", "Criatura eliminada", "La criatura ha sido eliminada correctamente.");

        // Actualizamos la lista de criaturas
        getAllCreatures();
    } catch (error) {
        // Mostramos una alerta de error si ocurre algún problema
        console.error("Error al eliminar la criatura:", error);
        alertas("error", "Error al eliminar", "Ocurrió un error al intentar eliminar la criatura.");
    }
}

// Función para confirmar y eliminar una criatura
export function deleteCreature(id) {
    // Mostramos una alerta personalizada para confirmar la eliminación
    alertas(
        "warning", // Tipo de alerta
        "Confirmar eliminación", // Título de la alerta
        "¿Estás seguro de que deseas eliminar esta criatura?", // Mensaje de la alerta
        {
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelación
            showCancelButton: true, // Mostrar botón de cancelar
        }
    ).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, llamamos a la función para eliminar la criatura
            serverCreature(id);
        } else if (result.isDismissed) {
            // Si el usuario cancela, mostramos un mensaje opcional
            alertas("info", "Cancelado", "La eliminación de la criatura fue cancelada.");
        }
    });
}