import { alertas } from "../alertas/alertas.js"; // Función para mostrar alertas
import { clearInput } from "../input.js"; // Función para limpiar el input
import { getAllMythology } from "./getDataMythology.js";
import { urlApi } from "../urlApis.js";

// Función para validar los datos del formulario
function validateMythologyForm() {
    const name = document.getElementById("txtNombre").value.trim();

    // Validar el campo Nombre
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alertas("error", "Error en el formulario", "El nombre solo puede contener letras y espacios.");
        return false;
    }

    // Si todas las validaciones pasan, retorna true
    return true;
}

// Función principal para registrar una mitología
async function registerMythology() {
    // Validar los datos del formulario antes de enviarlos
    if (!validateMythologyForm()) {
        return; // Detenemos el proceso si los datos no son válidos
    }

    try {
        // Creamos un objeto JSON con los datos del formulario
        let bodyContent = JSON.stringify({
            name: document.getElementById("txtNombre").value // Nombre de la mitología
        });

        // Realizamos una solicitud POST al backend para registrar la mitología
        let response = await fetch(urlApi.urlMythology, {
            method: "POST", // Método HTTP POST
            headers: {
                "Accept": "application/json", // Indicamos que esperamos una respuesta en formato JSON
                "Content-Type": "application/json" // Indicamos que el cuerpo de la solicitud está en formato JSON
            },
            body: bodyContent // Enviamos los datos de la mitología en el cuerpo de la solicitud
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error("No se pudo guardar la mitología."); // Lanzamos un error si la solicitud falla
        }

        // Convertimos la respuesta del backend a un objeto JSON
        let data = await response.json();
        console.log("Mitología registrada:", data);

        getAllMythology(); // Agregamos la mitología al DOM

        // Mostramos una alerta de éxito
        alertas("success", "¡Registro exitoso!", "La mitología se ha guardado correctamente.");

        // Cerramos el modal
        const modalAddMythology = bootstrap.Modal.getInstance(document.getElementById("modalAddMythology"));
        modalAddMythology.hide();

        // Limpiamos los inputs del formulario
        clearInput(document.getElementById("txtNombre"));

    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el proceso
        console.error("Error:", error); // Mostramos el error en la consola
        alertas("error", "Error de conexión", error.message); // Mostramos una alerta de error
    }
}

// Asociamos el evento al botón de registro
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");
    if (registerButton) {
        registerButton.addEventListener("click", registerMythology);
    }
});
