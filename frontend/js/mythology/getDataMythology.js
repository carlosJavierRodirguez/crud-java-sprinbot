import { openUpdateMythologyModal } from "./updateMythology.js";
import { deleteMythology } from "./deleteMythology.js";
import { urlApi } from "../urlApis.js";
import { paginateData } from "../paginateData.js";

export async function getAllMythology() {
    try {
        let response = await fetch(urlApi.urlMythology, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        let data = await response.json();
        console.log("Datos obtenidos del backend:", data);

        paginateData({
            data,
            containerId: "containerMythology",
            paginationId: "paginationContainer",
            renderItemFn: (mythology) => renderMythologyCard(mythology), // 🔥 ahora retorna el nodo
            itemsPerPage: 6
        });
    } catch (error) {
        console.error("Error al obtener las mitologías:", error);
    }
}
export function showMythology(mythologies, containerId) {
    let contenedor = document.getElementById(containerId);
    contenedor.innerHTML = "";

    mythologies.forEach(mythology => {
        const card = renderMythologyCard(mythology);
        contenedor.appendChild(card);
    });
}
function renderMythologyCard(mythology) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

    card.innerHTML = `
        <div class="bg-white border rounded p-3 h-100">
            <ul class="list-unstyled m-0">
                <li class="d-flex justify-content-between align-items-center">
                    <span>
                        <i class="fa fa-angle-right text-primary mr-2"></i>
                        <strong>${mythology.name}</strong>
                    </span>
                    <span>
                        <i class="fa-solid fa-pen-to-square text-warning mx-2" title="Editar" data-id="${mythology.mythologyId}" style="cursor: pointer;"></i>
                        <i class="fa-solid fa-trash text-danger" title="Eliminar" data-id="${mythology.mythologyId}" style="cursor: pointer;"></i>
                    </span>
                </li>
            </ul>
        </div>
    `;

    // Eventos
    card.querySelector(".fa-trash").addEventListener("click", (event) => {
        const mythologyId = event.target.getAttribute("data-id");
        deleteMythology(mythologyId);
    });

    card.querySelector(".fa-pen-to-square").addEventListener("click", (event) => {
        openUpdateMythologyModal(mythology);
    });

    return card; // ✅ retorno correcto
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("containerMythology")) {
        getAllMythology();
    }
});
