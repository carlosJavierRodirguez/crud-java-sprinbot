import { alertas } from "../alertas/alertas.js"; // Función para mostrar alertas
import { getAllExplorer } from "./getDataExplorer.js"; // Función para actualizar el color del rango
import { clearInput } from "../input.js"; // Función para limpiar el input
import { urlApi } from "../urlApis.js";

// Función para validar los datos del formulario
function validateExplorerForm() {
    const nombre = document.getElementById("txtNombre").value.trim();
    const nacionalidad = document.getElementById("txtNacionalidad").value.trim();
    const edad = document.getElementById("txtEdad").value.trim();
    const reputacion = document.getElementById("txtReputacion").value.trim();
    const imagen = document.getElementById("txtImagen").value.trim();

    // Validar el campo Nombre
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alertas("error", "Error en el formulario", "El nombre solo puede contener letras y espacios.");
        return false;
    }

    // Validar el campo Nacionalidad
    if (!/^[a-zA-Z\s]+$/.test(nacionalidad)) {
        alertas("error", "Error en el formulario", "La nacionalidad solo puede contener letras y espacios.");
        return false;
    }

    // Validar el campo Edad
    if (!/^\d+$/.test(edad) || parseInt(edad) < 1 || parseInt(edad) > 100) {
        alertas("error", "Error en el formulario", "La edad debe ser un número entre 1 y 100.");
        return false;
    }

    // Validar el campo Reputación
    if (!/^\d+$/.test(reputacion) || parseInt(reputacion) < 0 || parseInt(reputacion) > 100) {
        alertas("error", "Error en el formulario", "La reputación debe ser un número entre 0 y 100.");
        return false;
    }

    // Validar el campo Imagen
    if (!/^https?:\/\/.+\..+/.test(imagen)) {
        alertas("error", "Error en el formulario", "La URL de la imagen debe ser válida y comenzar con http:// o https://.");
        return false;
    }

    // Si todas las validaciones pasan, retorna true
    return true;
}

// Función principal para registrar un explorador
async function registerExplorer() {
    // Validar los datos del formulario antes de enviarlos
    if (!validateExplorerForm()) {
        return; // Detenemos el proceso si los datos no son válidos
    }

    try {
        // Creamos un objeto JSON con los datos del formulario
        let bodyContent = JSON.stringify({
            name: document.getElementById("txtNombre").value, // Nombre del explorador
            nationality: document.getElementById("txtNacionalidad").value, // Nacionalidad del explorador
            age: document.getElementById("txtEdad").value, // Edad del explorador
            reputation: document.getElementById("txtReputacion").value, // Reputación del explorador
            image_explorer: document.getElementById("txtImagen").value // URL de la imagen del explorador
        });

        // Realizamos una solicitud POST al backend para registrar el explorador
        let response = await fetch(urlApi.urlExplorers, {
            method: "POST", // Método HTTP POST
            headers: {
                "Accept": "application/json", // Indicamos que esperamos una respuesta en formato JSON
                "User-Agent": "web", // Indicamos que la solicitud proviene de un cliente web
                "Content-Type": "application/json" // Indicamos que el cuerpo de la solicitud está en formato JSON
            },
            body: bodyContent // Enviamos los datos del explorador en el cuerpo de la solicitud
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error("No se pudo guardar el explorador."); // Lanzamos un error si la solicitud falla
        }

        // Convertimos la respuesta del backend a un objeto JSON
        let data = await response.json();

        getAllExplorer(); // Agregamos el explorador al DOM

        // Mostramos una alerta de éxito
        alertas("success", "¡Registro exitoso!", "El explorador se ha guardado correctamente.");

        // Limpiamos los inputs del formulario
        clearInput(document.getElementById("txtNombre"));
        clearInput(document.getElementById("txtNacionalidad"));
        clearInput(document.getElementById("txtEdad"));
        clearInput(document.getElementById("txtReputacion"));
        clearInput(document.getElementById("txtImagen"));

    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el proceso
        console.error("Error:", error); // Mostramos el error en la consola
        alertas("error", "Error de conexión", error.message); // Mostramos una alerta de error
    }
}

// Agregar el evento al botón de registro cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("registerButton");
    if (filterButton) {
        filterButton.addEventListener("click", registerExplorer);
    }
});
