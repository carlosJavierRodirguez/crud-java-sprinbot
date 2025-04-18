import { openUpdateCreatureModal } from "./updateCreature.js";
import { deleteCreature } from "./deleteCreature.js";
import { urlApi } from "../urlApis.js";
import { paginateData } from "../paginateData.js";

export async function getAllCreatures() {
    try {
        const response = await fetch(urlApi.urlCreatures, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        paginateData({
            data,
            containerId: "containerCreatures",
            paginationId: "paginateCreatures",
            renderItemFn: (creature) => renderCreatureCard(creature),
            itemsPerPage: 3, 
        });

    } catch (error) {
        console.error("Error al obtener las criaturas:", error);
    }
}

// Función para uso interno de paginación
function renderCreatureCard(creature) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

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
                <button class="btn btn-warning btn-sm edit-button rounded-1" data-id="${creature.id}">
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm delete-button rounded-1" data-id="${creature.id}">
                    <i class="fa-solid fa-trash"></i> Borrar
                </button>
            </div>
        </div>
    `;

    card.querySelector(".edit-button").addEventListener("click", () => {
        openUpdateCreatureModal(creature);
    });

    card.querySelector(".delete-button").addEventListener("click", (event) => {
        const creatureId = event.target.getAttribute("data-id");
        deleteCreature(creatureId);
    });

    return card;
}

// Función pública que se mantiene para otros módulos
export function showCreature(creatures, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    creatures.forEach(creature => {
        const card = renderCreatureCard(creature);
        container.appendChild(card);
    });
}

// Ejecutamos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("containerCreatures")) {
        getAllCreatures();
    }
});
