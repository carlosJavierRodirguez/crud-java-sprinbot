import { openUpdateCreatureModal } from "./updateCreature.js"; // Importamos la función para abrir el modal de actualización
import { deleteCreature } from "./deleteCreature.js"; // Importamos la función para eliminar una criatura
import { urlApi } from "../urlApis.js";

export async function getAllCreatures() {
    try {
        // Realizamos una solicitud GET al endpoint del backend
        let response = await fetch(urlApi.urlCreatures, {
            method: "GET",
            headers: {
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            }
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Lanzamos un error con el código y mensaje
        }

        // Convertimos la respuesta a JSON
        let data = await response.json();

        // Llamamos a la función para mostrar las criaturas en el DOM
        showCreature(data, "containerCreatures");

    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al obtener las criaturas:", error);
    }
}

export function showCreature(creatures, containerId) {
    // Obtenemos el contenedor donde se mostrarán las criaturas
    let contenedor = document.getElementById(containerId);

    // Limpiamos el contenido del contenedor antes de agregar nuevos datos
    contenedor.innerHTML = "";

    // Iteramos sobre cada criatura recibida
    creatures.forEach(creature => {
        // Creamos un elemento div para la tarjeta de la criatura
        let card = document.createElement("div");
        card.classList.add("col-lg-4", "col-md-6", "mb-4"); // Agregamos clases de Bootstrap

        // Definimos el contenido HTML de la tarjeta
        card.innerHTML = `
            <div class="card h-100 shadow border-0">
                <img src="${creature.imageCreature}" 
                    class="card-img-top" 
                    alt="${creature.name}" 
                    style="height: 220px; object-fit: cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;">
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold text-primary mb-2">${creature.name}</h5>
                    <p class="mb-1"><i class="fa-solid fa-dragon text-danger me-2"></i><strong>Tipo:</strong> ${creature.type}</p>
                    <p class="mb-1"><i class="fa-solid fa-skull-crossbones text-warning me-2"></i><strong>Peligro:</strong> ${creature.danger}</p>
                    <p class="mb-0"><i class="fa-solid fa-landmark text-success me-2"></i><strong>Mitología:</strong> ${creature.mythology?.name || "Desconocida"}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <!-- Botón para editar -->
                    <button class="btn btn-warning btn-sm edit-button rounded-1" data-id="${creature.id}">
                        <i class="fa-solid fa-pen-to-square"></i> Editar
                    </button>
                    <!-- Botón para borrar -->
                    <button class="btn btn-danger btn-sm delete-button rounded-1" data-id="${creature.id}">
                        <i class="fa-solid fa-trash"></i> Borrar
                    </button>
                </div>
            </div>
        `;

        // Agregamos la tarjeta al contenedor
        contenedor.appendChild(card);

        // Asociamos el evento click al botón de editar
        card.querySelector(".edit-button").addEventListener("click", () => {
            openUpdateCreatureModal(creature); // Llamamos a la función para abrir el modal con los datos de la criatura
        });

        // Asociamos el evento click al botón de borrar
        card.querySelector(".delete-button").addEventListener("click", (event) => {
            const creatureId = event.target.getAttribute("data-id");
            deleteCreature(creatureId); // Llamamos a la función para eliminar la criatura
        });
    });
}

// Llamamos a la función para obtener criaturas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("containerCreatures")) {
        getAllCreatures(); // Solo ejecuta si el ID existe
    }
});