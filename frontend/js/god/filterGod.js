import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderGodCard } from "./getDataGod.js"; 
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searchGod",
        btnSearchId: "btnSearchGod",
        btnClearId: "btnClearGod",
        containerId: "containerGods",
        paginationId: "paginateGods",
        baseUrl: urlApi.urlGods + "filter/",
        renderItemFn: renderGodCard,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlGods,
            containerId: "containerGods",
            paginationId: "paginateGods",
            renderItemFn: renderGodCard,
            itemsPerPage: 3
        })
    });
});
