import { deleteExplorer } from "./deleteExplorer.js";
import { openUpdateExplorerModal } from "./updateExplorer.js";
import { urlApi } from "../urlApis.js";
import { paginateData } from "../generica/paginateData.js";

// Función para obtener todos los exploradores desde el backend
export async function getAllExplorer() {
    try {
        let response = await fetch(urlApi.urlExplorers, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        let data = await response.json();

        paginateData({
            data,
            containerId: "exploradoresContainer",
            paginationId: "paginationExplorers",
            renderItemFn: renderExplorerCard,
            itemsPerPage: 4
        });
        return data;
    } catch (error) {
        console.error("Error al obtener los exploradores:", error);
        return [];
    }
}

// Función para obtener los mejores exploradores (sin paginación)
async function getTopExplorer() {
    try {
        let response = await fetch(urlApi.urlExplorers + "top", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        let data = await response.json();

        const container = document.getElementById("topExplorersContainer");
        if (!container) return;

        container.innerHTML = "";
        data.forEach(explorer => {
            const card = renderExplorerCard(explorer, true);
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error al obtener los mejores exploradores:", error);
    }
}

// Función para renderizar una tarjeta de explorador
function renderExplorerCard(explorador, isTop = false) {
    const card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "pb-1");

    card.innerHTML = `
        <div class="team-item bg-white mb-4">
            <div class="team-img position-relative overflow-hidden">
                ${!isTop ? `
                    <div class="icon position-absolute top-0 end-0 m-2 d-flex gap-1">
                        <button class="btn btn-danger btn-sm rounded-circle" title="Borrar" data-id="${explorador.id_explorer}">
                            <i class="fa-solid fa-trash text-white p-1"></i>
                        </button>
                        <button class="btn btn-primary btn-sm rounded-circle" title="Editar" data-id="${explorador.id_explorer}">
                            <i class="fa-solid fa-pen text-white p-1"></i>
                        </button>
                    </div>` : ""
        }
                <img class="img-fluid w-100 largo-imagen" src="${explorador.imageExplorer}" alt="Imagen de ${explorador.name}">
            </div>
            <div class="text-center py-4 p-3">
                <h5 class="text-truncate">${explorador.name}</h5>
                <p class="m-0"><i class="fas fa-flag"></i> ${explorador.nationality}</p>
                <p class="m-0"><i class="fas fa-birthday-cake"></i> Edad: ${explorador.age}</p>
                <p class="m-0"><i class="fa-solid fa-star"></i> Reputación</p>
                <div class="progress rounded-pill border border-black">
                    <div class="progress-bar rounded-pill" role="progressbar" style="width: ${explorador.reputation}%; background: ${updateRangeColor(explorador.reputation)};">
                        ${explorador.reputation}%
                    </div>
                </div>
            </div>
        </div>
    `;

    if (!isTop) {
        card.querySelector(".btn-danger").addEventListener("click", (event) => {
            const id = event.target.closest("button").getAttribute("data-id");
            deleteExplorer(id);
        });

        card.querySelector(".btn-primary").addEventListener("click", () => {
            openUpdateExplorerModal(explorador);
        });
    }

    return card;
}

export function showExplorers(data, containerId) {
    paginateData({
        data,
        containerId,
        paginationId: "paginationExplorers",
        renderItemFn: (explorador) => renderExplorerCard(explorador, containerId),
        itemsPerPage: 4
    });
}
// Función para cambiar el color del input range
export function updateRangeColor(reputation) {
    let percent = reputation / 100;
    let red = Math.round(255 * (1 - percent));
    let green = Math.round(255 * percent);
    return `linear-gradient(to right, rgb(${red}, ${green}, 0), rgb(${red}, ${green}, 0))`;
}

// Al cargar el DOM, iniciamos
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("exploradoresContainer")) {
        getAllExplorer();
    }

    if (document.getElementById("topExplorersContainer")) {
        getTopExplorer();
    }
});
