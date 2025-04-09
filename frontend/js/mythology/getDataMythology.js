import { openUpdateMythologyModal } from "./updateMythology.js"; // Importamos la función para abrir el modal de actualización
import { deleteMythology } from "./deleteMythology.js";
import { urlApi } from "../urlApis.js";

export async function getAllMythology() {
    try {
        // Realizamos una solicitud GET al endpoint del backend
        let response = await fetch(urlApi.urlMythology, {
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

        // Llamamos a la función para mostrar los exploradores en el DOM
        showMythology(data, "containerMythology");

    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al obtener los exploradores:", error);
    }
}

export function showMythology(mythologies, containerId) {
    // Obtenemos el contenedor donde se mostrarán las mitologías
    let contenedor = document.getElementById(containerId);

    // Limpiamos el contenido del contenedor antes de agregar nuevos datos
    contenedor.innerHTML = "";

    // Iteramos sobre cada mitología recibida
    mythologies.forEach(mythology => {
        // Creamos un elemento div para la tarjeta de la mitología
        let card = document.createElement("div");
        card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4"); // Agregamos clases de Bootstrap

        // Definimos el contenido HTML de la tarjeta
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

        // Agregamos la tarjeta al contenedor
        contenedor.appendChild(card);

        // Asociamos el evento click al ícono de borrar
        card.querySelector(".fa-trash").addEventListener("click", (event) => {
            const mythologyId = event.target.getAttribute("data-id");
            deleteMythology(mythologyId); // Llamamos a la función para eliminar la mitología
        });

        // Asociamos el evento click al ícono de editar
        card.querySelector(".fa-pen-to-square").addEventListener("click", (event) => {
            openUpdateMythologyModal(mythology); // Llamamos a la función para abrir el modal con los datos de la mitología
        });
    });
}

// Llamamos a la función para obtener exploradores al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("containerMythology")) {
        getAllMythology(); // Solo ejecuta si el ID existe
    }
});