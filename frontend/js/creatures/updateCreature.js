import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllCreatures } from "./getDataCreature.js"; // Importamos la función para obtener todas las criaturas
import { urlApi } from "../urlApis.js";

// Función para abrir el modal y llenar el formulario con los datos de la mitología
export function openUpdateMythologyModal(mythology) {
    // Llenamos el formulario con los datos de la mitología
    document.getElementById("txtMythologyName").value = mythology.name;
    document.getElementById("txtMythologyId").value = mythology.mythologyId;

    // Mostramos el modal
    const updateMythologyModal = new bootstrap.Modal(document.getElementById("updateCreatureModal"));
    updateMythologyModal.show();
}

// Función para obtener todas las mitologías y llenar el select
export async function loadMythologies() {
    try {
        // Realizamos una solicitud GET al servidor para obtener las mitologías
        let response = await fetch(urlApi.urlCreatures, {
            method: "GET",
            headers: {
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            }
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Convertimos la respuesta a JSON
        let mythologies = await response.json();

        // Obtenemos el elemento select del formulario
        const mythologySelect = document.getElementById("txtCreatureMythology");

        // Limpiamos las opciones existentes
        mythologySelect.innerHTML = "";

        // Iteramos sobre las mitologías y las agregamos como opciones
        mythologies.forEach(mythology => {
            const option = document.createElement("option");
            option.value = mythology.mythologyId; // El valor será el ID de la mitología
            option.textContent = mythology.name; // El texto será el nombre de la mitología
            mythologySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar las mitologías:", error);
        alertas("error", "Error al cargar mitologías", "No se pudieron cargar las mitologías disponibles.");
    }
}

// Función para abrir el modal y llenar el formulario con los datos de la criatura
export async function openUpdateCreatureModal(creature) {
    // Llenamos el formulario con los datos de la criatura
    document.getElementById("txtCreatureName").value = creature.name;
    document.getElementById("txtCreatureType").value = creature.type;
    document.getElementById("txtCreatureDanger").value = creature.danger;
    document.getElementById("txtCreatureImage").value = creature.imageCreature;
    document.getElementById("txtCreatureId").value = creature.id;

    // Cargamos las mitologías en el select
    await loadMythologies();

    // Seleccionamos la mitología actual de la criatura en el select
    const mythologySelect = document.getElementById("txtCreatureMythology");
    mythologySelect.value = creature.mythology?.mythologyId || "";

    // Mostramos el modal
    const updateCreatureModal = new bootstrap.Modal(document.getElementById("updateCreatureModal"));
    updateCreatureModal.show();
}

async function saveUpdate() {
    // Obtenemos los datos del formulario
    const creatureData = {
        idCreature: document.getElementById("txtCreatureId").value,
        name: document.getElementById("txtCreatureName").value,
        type: document.getElementById("txtCreatureType").value,
        danger: document.getElementById("txtCreatureDanger").value,
        mythologyId: document.getElementById("txtCreatureMythology").value,// Obtenemos el ID de la mitología seleccionada
        imageCreature: document.getElementById("txtCreatureImage").value
    };

    try {
        // Realizamos una solicitud POST al servidor para actualizar la criatura
        let response = await fetch("http://localhost:8085/api/v1/creature/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            },
            body: JSON.stringify(creatureData) // Convertimos los datos de la criatura a JSON
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Mostramos una alerta de éxito
        alertas("success", "Criatura actualizada", "La criatura ha sido actualizada correctamente.");

        // Cerramos el modal
        const updateCreatureModal = bootstrap.Modal.getInstance(document.getElementById("updateCreatureModal"));
        updateCreatureModal.hide();

        // Actualizamos la lista de criaturas
        getAllCreatures();

    } catch (error) {
        console.error("Error al actualizar la criatura:", error);
        alertas("error", "Error al actualizar", "No se pudo actualizar la criatura.");
    }
}

// Asociamos el evento al botón "Guardar cambios"
document.getElementById("saveCreatureChanges").addEventListener("click", () => {
    saveUpdate(); // Llamamos a la función para guardar los cambios
});