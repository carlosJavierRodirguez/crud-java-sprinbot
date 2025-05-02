import { deleteResource } from "../generica/eliminarDato.js";
import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
//import { renderMysticLocationForm } from "./mysticLocationForm.js"; //
//import { alertas } from "../alertas/alertas.js";

// Función para recargar las localizaciones místicas
export const reloadMeeting = () => {
    const container = document.getElementById("containerMeeting");
    container.innerHTML = ""; // Limpia el contenedor
    fetchWithPagination({
        url: urlApi.urlMeeting,
        containerId: "containerMeeting",
        paginationId: "paginateMeeting",
        renderItemFn: renderMeetingCard,
        itemsPerPage: 3
    });
};

// Función para renderizar las tarjetas de 
export function renderMeetingCard(meeting) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

    card.innerHTML = `
    <div class="bg-white border rounded p-3 h-100 shadow">
      <div class="d-flex justify-content-end mb-2">
        <i class="fa-solid fa-pen-to-square text-warning mx-2 btn-edit" 
           title="Editar" 
           data-id="${meeting.id_Meeting}" 
           style="cursor: pointer;"></i>
        <i class="fa-solid fa-trash text-danger mx-2 btn-delete" 
           title="Eliminar" 
           data-id="${meeting.id_Meeting}" 
           style="cursor: pointer;"></i>
      </div>
      <ul class="list-unstyled m-0">
        <li class="mb-2">
          <i class="fa-solid fa-calendar-days text-success me-2"></i>
          <strong>Fecha:</strong> ${meeting.date_meeting || "No disponible"}
        </li>
        <li class="mb-2">
          <i class="fa-solid fa-hat-wizard text-info me-2"></i>
          <strong>Explorador:</strong> ${meeting.explorer?.name || "Sin explorador"}
        </li>
        <li class="mb-2">
          <i class="fa-solid fa-dragon text-danger me-2"></i>
          <strong>Criatura:</strong> ${meeting.creature?.name || "Sin criatura"}
        </li>
      </ul>
    </div>
  `;



    // Evento eliminar
    card.querySelector(".btn-delete").addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        deleteResource(id, urlApi.urlMeeting, "Encuentro", reloadMeeting);
    });

    // Evento editar (descomentado si quieres usarlo)
    // card.querySelector(".btn-edit").addEventListener("click", async (event) => {
    //     try {
    //         const adaptedDiscovery = {
    //             id: discovery.id,
    //             explorerId: discovery.explorer.id_explorer,
    //             locationId: discovery.mysticLocation.id,
    //             discoveryDate: discovery.date,
    //         };

    //         console.log(discovery.explorer.id_explorer);
    //         renderDiscoveryForm(adaptedDiscovery);
    //     } catch (error) {
    //         alertas("error", "Error al cargar el descubrimiento", error.message);
    //     }
    // });

    return card;
}

// Carga inicial de localizaciones al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    fetchWithPagination({
        url: urlApi.urlMeeting,
        containerId: "containerMeeting",
        paginationId: "paginateMeeting",
        renderItemFn: renderMeetingCard,
        itemsPerPage: 3
    });
});
