import { fetchWithPagination } from "../generica/obtenerDatos.js";
import { urlApi } from "../urlApis.js";
import { renderLanguageCard } from "./getDatalanguage.js";
import { setupGenericFilter } from "../generica/filtrarDatos.js";

document.addEventListener("DOMContentLoaded", () => {
    setupGenericFilter({
        inputId: "searcLanguage",
        btnSearchId: "btnSearcLanguage",
        btnClearId: "btnClearLanguage",
        containerId: "containerLanguage",
        paginationId: "paginateLanguage",
        baseUrl: urlApi.urlLanguages + "filter/",
        renderItemFn: renderLanguageCard,
        fetchAllFn: () => fetchWithPagination({
            url: urlApi.urlLanguages,
            containerId: "containerLanguage",
            paginationId: "paginateLanguage",
            renderItemFn: renderLanguageCard,
            itemsPerPage: 2
        })
    });
});
