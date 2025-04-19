import { loadMythologies } from "./updateCreature.js";
import { saveUpdate } from "./updateCreature.js";
import { saveCreature } from "./registerCreature.js";

/**
 * Configura el formulario de criaturas según el modo (register o edit)
 * @param {string} mode - 'register' o 'edit'
 * @param {Object} creature - Datos de la criatura (opcional, solo para modo edit)
 */
export async function configureCreatureForm(mode, creature = null) {
    console.log(`Configurando formulario en modo: ${mode}`);
    console.log("Datos de la criatura:", creature);

    // Limpia los campos del formulario
    document.getElementById("txtCreatureName").value = creature?.name || "";
    document.getElementById("txtCreatureType").value = creature?.type || "";
    document.getElementById("txtCreatureDanger").value = creature?.danger || "";
    document.getElementById("txtCreatureImage").value = creature?.imageCreature || "";

    // El ID solo se usa en modo edición
    const idField = document.getElementById("txtCreatureId");
    idField.value = creature?.id || "";

    // Carga las mitologías en el select
    const mythologySelect = document.getElementById("txtCreatureMythology");

    // Limpia las opciones existentes antes de cargar nuevas
    mythologySelect.innerHTML = '<option value="">Selecciona una mitología</option>';

    // Carga las mitologías
    const mythologies = await loadMythologies();

    // Establece la mitología seleccionada si estamos en modo edición
    if (mode === "edit" && creature?.mythology) {
        console.log("Mitología a seleccionar:", creature.mythology);

        // Busca si la mitología actual está en la lista y selecciónala
        const options = mythologySelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value == creature.mythologyId ||
                options[i].textContent === creature.mythology.name) {
                mythologySelect.selectedIndex = i;
                break;
            }
        }

        // Si no se encontró la mitología en la lista, agrega una opción para ella
        if (mythologySelect.selectedIndex === 0 && creature.mythology.name) {
            const option = document.createElement("option");
            option.value = creature.mythologyId;
            option.textContent = creature.mythology.name;
            mythologySelect.appendChild(option);

            // Selecciona esta nueva opción
            mythologySelect.value = creature.mythologyId;
        }
    }

    // Configura el título del modal
    const modalTitle = document.getElementById("modalCreatureTitle");
    modalTitle.textContent = mode === "edit" ? "Editar Criatura" : "Registrar Criatura";

    // Configura el botón de acción
    const actionButton = document.getElementById("saveCreature");

    // Elimina eventos anteriores para evitar duplicaciones
    actionButton.replaceWith(actionButton.cloneNode(true));

    // Obtenemos la referencia al botón clonado
    const newActionButton = document.getElementById("saveCreature");

    // Configuramos el texto y la acción del botón según el modo
    if (mode === "edit") {
        newActionButton.textContent = "Guardar Cambios";
        newActionButton.addEventListener("click", saveUpdate);
    } else {
        newActionButton.textContent = "Registrar";
        newActionButton.addEventListener("click", saveCreature);
    }
}

// Exponemos una función específica para editar que también muestra el modal
export async function openEditCreatureForm(creature) {
    await configureCreatureForm("edit", creature);

    // Mostramos el modal explícitamente
    const modal = new bootstrap.Modal(document.getElementById("modalCreature"));
    modal.show();
}