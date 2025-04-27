import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderLegendCard } from "./getDataLegend.js"; // Tu función para renderizar cada leyenda
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searchLegend",
        btnSearchId: "btnSearchLegend",
        btnClearId: "btnClearLegend",
        containerId: "containerLegends",
        paginationId: "paginateLegends",
        baseUrl: urlApi.urlLegends + "filter/",
        renderItemFn: renderLegendCard,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlLegends,
            containerId: "containerLegends",
            paginationId: "paginateLegends",
            renderItemFn: renderLegendCard,
            itemsPerPage: 2
        })
    });
});
