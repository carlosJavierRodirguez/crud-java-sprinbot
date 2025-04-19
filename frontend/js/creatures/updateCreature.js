import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllCreatures } from "./getDataCreature.js"; // Importamos la función para obtener todas las criaturas
import { configureCreatureForm } from "./creatureForm.js"; // Importamos la función para configurar el formulario
import { urlApi } from "../urlApis.js"; // Importamos las URLs de la API
import { clearInput } from "../input.js"; // Importamos la función para limpiar los inputs

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
        let response = await fetch(urlApi.urlMythology, {
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
    // Configuramos el formulario en modo edición
    await configureCreatureForm("edit", creature);
    const actionButton = document.getElementById("saveCreature");
    actionButton.textContent = "Guardar Cambios";
    actionButton.onclick = () => saveUpdate(); // Asociamos la función de actualizar
}

// Función para actualizar una criatura existente
export async function saveUpdate() {
    console.log("Actualizando criatura...");
    const creatureData = {
        idCreature: document.getElementById("txtCreatureId").value,
        name: document.getElementById("txtCreatureName").value,
        type: document.getElementById("txtCreatureType").value,
        danger: document.getElementById("txtCreatureDanger").value,
        mythologyId: document.getElementById("txtCreatureMythology").value,
        imageCreature: document.getElementById("txtCreatureImage").value
    };

    try {
        let response = await fetch(urlApi.urlCreatures, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(creatureData)
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        alertas("success", "Criatura actualizada", "La criatura ha sido actualizada correctamente.");
        clearInput(document.getElementById("txtCreatureId"));
        clearInput(document.getElementById("txtCreatureName"));
        clearInput(document.getElementById("txtCreatureType"));
        clearInput(document.getElementById("txtCreatureDanger"));
        clearInput(document.getElementById("txtCreatureImage"));
        clearInput(document.getElementById("txtCreatureMythology"));
        const updateCreatureModal = bootstrap.Modal.getInstance(document.getElementById("modalCreature"));
        updateCreatureModal.hide();

        getAllCreatures();
    } catch (error) {
        console.error("Error al actualizar la criatura:", error);
        alertas("error", "Error al actualizar", "No se pudo actualizar la criatura.");
    }
}