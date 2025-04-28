import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderArtefatc } from "./getDataArtefact.js";
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searcArtefact",
        btnSearchId: "btnSearcArtefact",
        btnClearId: "btnClearArtefact",
        containerId: "containerArtefact",
        paginationId: "paginateArtefact",
        baseUrl: urlApi.urlArtefacts + "filter/",
        renderItemFn: renderArtefatc,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlArtefacts,
            containerId: "containerArtefact",
            paginationId: "paginateArtefact",
            renderItemFn: renderArtefatc,
            itemsPerPage: 3
        })
    });
});