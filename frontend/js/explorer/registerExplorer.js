// Importamos las funciones necesarias desde otros módulos
import { alertas } from "../alertas/alertas.js"; // Función para mostrar alertas
import { updateRangeColor } from "./getDataExplorer.js"; // Función para actualizar el color del rango

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
        console.log("Explorador registrado:", data); // Mostramos en la consola el explorador registrado

        // Convertimos el cuerpo de la solicitud a un objeto y lo pasamos al DOM
        let explorador = JSON.parse(bodyContent); // Convertimos el string JSON a un objeto
        agregarExploradorAlDOM(explorador); // Agregamos el explorador al DOM

        // Mostramos una alerta de éxito
        alertas("success", "¡Registro exitoso!", "El explorador se ha guardado correctamente.");

    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el proceso
        console.error("Error:", error); // Mostramos el error en la consola
        alertas("error", "Error de conexión", error.message); // Mostramos una alerta de error
    }
}

// Función para agregar un explorador al DOM
function agregarExploradorAlDOM(explorador) {
    // Obtenemos el contenedor donde se mostrarán los exploradores
    let contenedor = document.getElementById("exploradoresContainer");

    // Creamos un elemento div para la tarjeta del explorador
    let card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "pb-1"); // Agregamos clases de Bootstrap para el diseño

    // Definimos el contenido HTML de la tarjeta del explorador
    card.innerHTML = `
    <div class="team-item bg-white mb-4">
        <div class="team-img position-relative overflow-hidden">
            <img class="img-fluid w-100 largo-imagen" src="${explorador.image_explorer}" alt="Imagen de ${explorador.name}">
        </div>
        <div class="text-center py-4 p-3">
            <h5 class="text-truncate">${explorador.name}</h5>
            <p class="m-0"><i class="fas fa-flag"></i> ${explorador.nationality}</p>
            <p class="m-0"><i class="fas fa-birthday-cake"></i> Edad: ${explorador.age}</p>
             <p class="m-0"><i class="fa-solid fa-star"></i> Reputación </p>

           <div class="progress rounded-pill border border-black">
             <div class="progress-bar rounded-pill" role="progressbar" style="width: ${explorador.reputation}%; background: ${updateRangeColor(explorador.reputation)};">
             ${explorador.reputation}%
           </div>
        </div>
    </div>
`;

    // Agregamos la tarjeta al contenedor
    contenedor.appendChild(card);

}

// Hacemos la función accesible globalmente para que pueda ser llamada desde el HTML
window.registerExplorer = registerExplorer;