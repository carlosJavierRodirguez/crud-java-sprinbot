import { alertas } from "../alertas/alertas.js"; // Importamos la función para mostrar alertas
import { getAllCreatures } from "./getDataCreature.js"; // Importamos la función para obtener todas las criaturas
import { configureCreatureForm } from "./creatureForm.js"; // Importamos la función para configurar el formulario
import { urlApi } from "../urlApis.js"; // Importamos las URLs de la API

// Función para registrar una nueva criatura
export async function saveCreature() {
    console.log("Guardando criatura...")
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
        let response = await fetch(urlApi.urlCreatures, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            },
            body: JSON.stringify(creatureData) // Convertimos los datos de la criatura a JSON
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Mostramos una alerta de éxito
        alertas("success", "Criatura registrada", "La criatura ha sido registrada correctamente.");

        // Cerramos el modal
        const registerCreatureModal = bootstrap.Modal.getInstance(document.getElementById("modalCreature"));
        registerCreatureModal.hide();

        // Actualizamos la lista de criaturas
        getAllCreatures();

    } catch (error) {
        console.error("Error al registrar la criatura:", error);
        alertas("error", "Error al registrar", "No se pudo registrar la criatura.");
    }
}

// Función para abrir el modal en modo registro
export async function openRegisterCreatureModal() {

    // Configura todo el formulario, incluyendo el botón
    await configureCreatureForm("register",null);
}




