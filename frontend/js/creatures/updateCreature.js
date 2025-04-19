import { alertas } from "../alertas/alertas.js";
import { getAllCreatures } from "./getDataCreature.js";
import { configureCreatureForm, openEditCreatureForm } from "./creatureForm.js";
import { urlApi } from "../urlApis.js";
import { clearInput } from "../input.js";

// Función para cargar las mitologías en el select
// Función para obtener todas las mitologías y llenar el select
export async function loadMythologies() {
    try {
        // Obtenemos el elemento select del formulario
        const mythologySelect = document.getElementById("txtCreatureMythology");

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

        // Iteramos sobre las mitologías y las agregamos como opciones
        mythologies.forEach(mythology => {
            const option = document.createElement("option");
            option.value = mythology.mythologyId; // El valor será el ID de la mitología
            option.textContent = mythology.name; // El texto será el nombre de la mitología
            mythologySelect.appendChild(option);
        });

        // Retornamos las mitologías para que puedan ser utilizadas por otras funciones
        return mythologies;
    } catch (error) {
        console.error("Error al cargar las mitologías:", error);
        alertas("error", "Error al cargar mitologías", "No se pudieron cargar las mitologías disponibles.");
        return [];
    }
}

// Función para abrir el modal de actualización
export async function openUpdateCreatureModal(creature) {
    // Usamos la función dedicada para abrir el formulario en modo edición
    await openEditCreatureForm(creature);
}

// Función para guardar los cambios de una criatura
export async function saveUpdate() {
    console.log("Actualizando criatura...");

    // Recopilamos los datos del formulario
    const creatureData = {
        idCreature: document.getElementById("txtCreatureId").value,
        name: document.getElementById("txtCreatureName").value,
        type: document.getElementById("txtCreatureType").value,
        danger: document.getElementById("txtCreatureDanger").value,
        mythologyId: document.getElementById("txtCreatureMythology").value,
        imageCreature: document.getElementById("txtCreatureImage").value
    };

    // Validamos que los campos requeridos tengan valor
    if (!creatureData.name || !creatureData.type || !creatureData.danger ||
        !creatureData.mythologyId || !creatureData.imageCreature) {
        alertas("error", "Datos incompletos", "Por favor complete todos los campos.");
        return;
    }

    try {
        // Enviamos los datos al servidor
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

        // Mostramos alerta de éxito
        alertas("success", "Criatura actualizada", "La criatura ha sido actualizada correctamente.");

        // Limpiamos el formulario
        clearInput(document.getElementById("txtCreatureId"));
        clearInput(document.getElementById("txtCreatureName"));
        clearInput(document.getElementById("txtCreatureType"));
        clearInput(document.getElementById("txtCreatureDanger"));
        clearInput(document.getElementById("txtCreatureImage"));
        clearInput(document.getElementById("txtCreatureMythology"));

        // Cerramos el modal
        const updateCreatureModal = bootstrap.Modal.getInstance(document.getElementById("modalCreature"));
        updateCreatureModal.hide();

        // Actualizamos la lista de criaturas
        getAllCreatures();
    } catch (error) {
        console.error("Error al actualizar la criatura:", error);
        alertas("error", "Error al actualizar", "No se pudo actualizar la criatura.");
    }
}