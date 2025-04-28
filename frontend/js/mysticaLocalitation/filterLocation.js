import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderMysticLocationCard } from "./getDataLocalitation.js";
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searcLocalitation",
        btnSearchId: "btnSearcLocalitation",
        btnClearId: "btnClearLocalitation",
        containerId: "containerMysticasLocation",
        paginationId: "paginateMysticasLocation",
        baseUrl: urlApi.urlMysticLocation + "filter/",
        renderItemFn: renderMysticLocationCard,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlMysticLocation,
            containerId: "containerMysticasLocation",
            paginationId: "paginateMysticasLocation",
            renderItemFn: renderMysticLocationCard,
            itemsPerPage: 4
        })
    });
});
