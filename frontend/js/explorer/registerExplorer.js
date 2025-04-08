
import { alertas } from "../alertas/alertas.js"; // Función para mostrar alertas
import { getAllExplorer } from "./getDataExplorer.js"; // Función para actualizar el color del rango
import { clearInput } from "../input.js"; // Función para limpiar el input

// Función principal para registrar un explorador
async function registerExplorer() {
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
        let response = await fetch("http://localhost:8085/api/v1/explorer/", {
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
        // console.log("Explorador registrado:", data); 
      
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

document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("registerButton");
    if (filterButton) {
        filterButton.addEventListener("click", registerExplorer);
    }
});
