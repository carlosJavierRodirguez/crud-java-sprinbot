import { alertas } from "../alertas/alertas.js";
import { getAllCreatures } from "./getDataCreature.js";
import { urlApi } from "../urlApis.js";
import { clearInput } from "../input.js";

// Función para registrar una nueva criatura
export async function saveCreature() {
    console.log("Registrando criatura...");

    // Recopilamos los datos del formulario
    const creatureData = {
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
        alertas("success", "Criatura registrada", "La criatura ha sido registrada correctamente.");

        // Limpiamos el formulario
        clearInput(document.getElementById("txtCreatureName"));
        clearInput(document.getElementById("txtCreatureType"));
        clearInput(document.getElementById("txtCreatureDanger"));
        clearInput(document.getElementById("txtCreatureImage"));
        clearInput(document.getElementById("txtCreatureMythology"));

        // Cerramos el modal
        const creatureModal = bootstrap.Modal.getInstance(document.getElementById("modalCreature"));
        creatureModal.hide();

        // Actualizamos la lista de criaturas
        getAllCreatures();
    } catch (error) {
        console.error("Error al registrar la criatura:", error);
        alertas("error", "Error al registrar", "No se pudo registrar la criatura.");
    }
}


