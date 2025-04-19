import { configureCreatureForm } from "./creatureForm.js";

// Esta función se ejecutará cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos el botón por su ID
    const btnAddCreature = document.getElementById("btnAddCreature");

    // Este código se ejecutará antes de que se muestre el modal
    const modalCreature = document.getElementById("modalCreature");
    if (modalCreature) {
        modalCreature.addEventListener('show.bs.modal', function (event) {
            // Si el modal fue abierto por el botón de añadir
            if (event.relatedTarget && event.relatedTarget.id === "btnAddCreature") {
                // Configuramos el formulario en modo 'register'
                configureCreatureForm('register');
            }
            // No hacemos nada si fue abierto para editar, ya que ese caso lo maneja openUpdateCreatureModal
        });
    }
});