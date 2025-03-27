import { alertas } from "../alertas/alertas.js";

async function registerExplorer() {
    try {
        let bodyContent = JSON.stringify({
            name: document.getElementById("txtNombre").value,
            nationality: document.getElementById("txtNacionalidad").value,
            age: document.getElementById("txtEdad").value,
            reputation: document.getElementById("txtReputacion").value,
            image_explorer: document.getElementById("txtImagen").value
        });

        let response = await fetch("http://localhost:8085/api/v1/explorer/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "User-Agent": "web",
                "Content-Type": "application/json"
            },
            body: bodyContent
        });

        if (!response.ok) {
            throw new Error("No se pudo guardar el explorador.");
        }

        let data = await response.json(); // Convertir la respuesta a JSON
        console.log("Explorador registrado:", data);

        agregarExploradorAlDOM(data); // Se pasa directamente el objeto recibido

        alertas("success", "¡Registro exitoso!", "El explorador se ha guardado correctamente.");

    } catch (error) {
        console.error("Error:", error);
        alertas("error", "Error de conexión", error.message);
    }
}

function agregarExploradorAlDOM(explorador) {
    let contenedor = document.getElementById("exploradoresContainer");

    let card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "pb-1");

    card.innerHTML = `
        <div class="team-item bg-white mb-4">
            <div class="team-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="${explorador.image_explorer}" alt="Imagen de ${explorador.name}">
            </div>
            <div class="text-center py-4">
                <h5 class="text-truncate">${explorador.name}</h5>
                <p class="m-0">Nacionalidad: ${explorador.nationality}</p>
                <p class="m-0">Edad: ${explorador.age}</p>
                <input type="range" class="form-range custom-range" id="range-${explorador.id}" 
                    min="0" max="100" value="${explorador.reputation}" disabled>
            </div>
        </div>
    `;

    contenedor.appendChild(card);
}


// Hacer la función accesible globalmente
window.registerExplorer = registerExplorer;
