import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderMeetingCard } from "./getDataMeeting.js"; // Tu función para renderizar cada leyenda
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searcMeeting",
        btnSearchId: "btnSearcMeeting",
        btnClearId: "btnClearMeeting",
        containerId: "containerMeeting",
        paginationId: "paginateMeeting",
        baseUrl: urlApi.urlMeeting + "filter/",
        renderItemFn: renderMeetingCard,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlMeeting,
            containerId: "containerMeeting",
            paginationId: "paginateMeeting",
            renderItemFn: renderMeetingCard,
            itemsPerPage: 3
        })
    });
});