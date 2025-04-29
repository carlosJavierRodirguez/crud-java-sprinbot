import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderDiscoveryCard } from "./getDataDiscovery.js"; 
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searcdiscovery",
        btnSearchId: "btnSearcdiscovery",
        btnClearId: "btnCleardiscovery",
        containerId: "containerdiscovery",
        paginationId: "paginatediscovery",
        baseUrl: urlApi.urlDiscovery + "filter/",
        renderItemFn: renderDiscoveryCard,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlDiscovery,
            containerId: "containerdiscovery",
            paginationId: "paginatediscovery",
            renderItemFn: renderDiscoveryCard,
            itemsPerPage: 6
        })
    });
});
