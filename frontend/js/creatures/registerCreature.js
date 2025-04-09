import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllCreatures } from "./getDataCreature.js"; // Importamos la función para obtener todas las criaturas
import { loadMythologies } from "./updateCreature.js"; // Importamos la función para cargar mitologías
import { urlApi } from "../urlApis.js";

// Función para registrar una criatura
async function registerCreature() {
    try {
        const bodyContent = JSON.stringify({
            name: document.getElementById("txtCreatureName").value,
            type: document.getElementById("txtCreatureType").value,
            danger: document.getElementById("txtCreatureDanger").value,
            mythologyId: document.getElementById("txtCreatureMythology").value,
            imageCreature: document.getElementById("txtCreatureImage").value
        });

        const response = await fetch(urlApi.urlCreatures, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: bodyContent
        });

        if (!response.ok) {
            throw new Error("No se pudo guardar la criatura.");
        }

        const data = await response.json();
        console.log("Criatura registrada:", data);

        getAllCreatures(); // Actualiza el listado
        alertas("success", "¡Registro exitoso!", "La criatura se ha guardado correctamente.");

        const modal = bootstrap.Modal.getInstance(document.getElementById("modalAddCreature"));
        modal.hide();

    } catch (error) {
        console.error("Error:", error);
        alertas("error", "Error de conexión", error.message);
    }
}

// Función para abrir el modal y llenar el formulario con los datos de la criatura
async function openCreatureModal(creature) {
    // Cargamos las mitologías en el select
    await loadMythologies();

    // Seleccionamos la mitología actual de la criatura en el select
    const mythologySelect = document.getElementById("txtSelectCreatureMythology");
    mythologySelect.value = creature.mythology?.mythologyId || "";

    // Mostramos el modal
    const updateCreatureModal = new bootstrap.Modal(document.getElementById("updateCreatureModal"));
    updateCreatureModal.show();
}

async function saveCreature() {
    // Obtenemos los datos del formulario
    const creatureData = {
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

// Función para abrir el modal y preparar el formulario para registrar una nueva criatura
export async function openRegisterCreatureModal() {
    // Limpiamos los campos del formulario
    document.getElementById("txtCreatureName").value = "";
    document.getElementById("txtCreatureType").value = "";
    document.getElementById("txtCreatureDanger").value = "";
    document.getElementById("txtCreatureImage").value = "";

    // Cargamos las mitologías en el select
    await loadMythologies();

    // Mostramos el modal
    const registerCreatureModal = new bootstrap.Modal(document.getElementById("modalAddCreature"));
    registerCreatureModal.show();
}

// Función para registrar una nueva criatura
async function saveCreature() {
    // Obtenemos los datos del formulario
    const creatureData = {
        name: document.getElementById("txtCreatureName").value,
        type: document.getElementById("txtCreatureType").value,
        danger: document.getElementById("txtCreatureDanger").value,
        mythologyId: document.getElementById("txtCreatureMythology").value, // Obtenemos el ID de la mitología seleccionada
        imageCreature: document.getElementById("txtCreatureImage").value
    };

    try {
        // Realizamos una solicitud POST al servidor para registrar la criatura
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
        alertas("success", "Criatura registrada", "La criatura ha sido registrada correctamente.");

        // Cerramos el modal
        const registerCreatureModal = bootstrap.Modal.getInstance(document.getElementById("modalAddCreature"));
        registerCreatureModal.hide();

        // Actualizamos la lista de criaturas
        getAllCreatures();

    } catch (error) {
        console.error("Error al registrar la criatura:", error);
        alertas("error", "Error al registrar", "No se pudo registrar la criatura.");
    }
}

// Asociamos el evento al botón "Guardar"
document.getElementById("saveCreature").addEventListener("click", () => {
    saveCreature(); // Llamamos a la función para guardar la nueva criatura
});

// Asociar evento al botón
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("regsiterCreature");
    if (registerButton) {
        registerButton.addEventListener("click", saveCreature);
    }
});

