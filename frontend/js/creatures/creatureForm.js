import { loadMythologies } from "./updateCreature.js"; // Función para cargar mitologías
import { saveUpdate } from "./updateCreature.js";
import { saveCreature } from "./registerCreature.js";

// Función para configurar el formulario dinámicamente
export async function configureCreatureForm(mode, creature = null) {
    // Limpia los campos del formulario
    document.getElementById("txtCreatureName").value = creature?.name || "";
    document.getElementById("txtCreatureType").value = creature?.type || "";
    document.getElementById("txtCreatureDanger").value = creature?.danger || "";
    document.getElementById("txtCreatureImage").value = creature?.imageCreature || "";
    document.getElementById("txtCreatureId").value = creature?.id || ""; // Solo se usa en modo edición

    // Carga las mitologías en el select
    await loadMythologies();
    
    // Establece la mitología seleccionada SOLO si estamos editando
    const mythologySelect = document.getElementById("txtCreatureMythology");
    if (mode === "edit" && creature?.mythologyId) {
        mythologySelect.value = creature.mythologyId;
    } else {
        mythologySelect.selectedIndex = 0; // O puedes poner un placeholder como "Selecciona una mitología"
    }

    // Configura el título del modal
    const modalTitle = document.getElementById("modalCreatureTitle");
    modalTitle.textContent = mode === "edit" ? "Editar Criatura" : "Registrar Criatura";

    // Configura el botón de acción
    const actionButton = document.getElementById("saveCreature");
    actionButton.onclick = null; // Limpia eventos previos

    if (mode === "edit") {
        actionButton.textContent = "Guardar Cambios";
        actionButton.onclick = () => saveUpdate(); // Asocia la función de actualizar
    } else if (mode === "register") {
        actionButton.textContent = "Registrar";
        actionButton.onclick = () => saveCreature(); // Asocia la función de registrar
    }

    // Muestra el modal
    const creatureModal = new bootstrap.Modal(document.getElementById("modalCreature"));
    creatureModal.show();
}