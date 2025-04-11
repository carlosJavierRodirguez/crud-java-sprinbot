import { showMythology } from "./getDataMythology.js"; // Función para mostrar mitologías en el DOM
import { getAllMythology } from "./getDataMythology.js"; // Función para obtener todas las mitologías
import { clearInput } from "../input.js"; // Función para limpiar los inputs
import { alertas } from "../alertas/alertas.js";
import { urlApi } from "../urlApis.js";

/**
 * Valida el valor ingresado en el filtro
 * Esta función verifica que el valor del filtro sea válido antes de construir la URL.
 */
function validateFilter() {
    const name = document.getElementById("searchMythology")?.value.trim();

    // Validar el campo Nombre
    if (!name) {
        alertas("info", "Campo vacío", "Por favor, ingresa un nombre para filtrar.");
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alertas("error", "Error en el filtro", "El nombre solo puede contener letras y espacios.");
        return false;
    }

    // Si todas las validaciones pasan, retorna true
    return true;
}

/**
 * Genera la URL con el filtro seleccionado
 * Esta función construye dinámicamente la URL del endpoint según el filtro ingresado por el usuario.
 */
function getFilterUrl() {
    const baseUrl = urlApi.urlMythology + "filter/"; // URL base del endpoint de filtros

    // Obtenemos el valor del input de filtro por nombre
    const name = document.getElementById("searchMythology")?.value.trim(); // Filtro por nombre

    // Construimos la URL según el filtro ingresado
    if (name) return `${baseUrl}${encodeURIComponent(name)}`; // Filtro por nombre

    return null; // Si no se ingresó ningún filtro, retornamos null
}

/**
 * Realiza la petición a la API y muestra los resultados en el DOM
 * Esta función se encarga de conectar con el backend, obtener los datos filtrados y mostrarlos en el DOM.
 */
async function fetchMythology() {
    try {
        // Validar el filtro antes de construir la URL
        if (!validateFilter()) {
            return; // Detenemos el proceso si el filtro no es válido
        }

        // Obtenemos la URL generada por la función getFilterUrl
        const url = getFilterUrl();

        // Si no hay URL (es decir, no se ingresaron filtros), mostramos una alerta y detenemos la ejecución
        if (!url) {
            alertas("info", "Sin datos", "Por favor, ingresa un nombre para filtrar.");
            return;
        }

        // Realizamos la solicitud GET al backend
        let response = await fetch(url, {
            method: "GET", // Método HTTP GET
            headers: {
                "Accept": "application/json" // Indicamos que esperamos una respuesta en formato JSON
            }
        });

        // Verificamos si la respuesta no es exitosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Lanzamos un error con el código y mensaje
        }

        // Convertimos la respuesta a JSON
        let data = await response.json();

        // Obtenemos el contenedor donde se mostrarán las mitologías
        let contenedor = document.getElementById("containerMythology");

        // Si el contenedor no existe en el DOM, mostramos una advertencia en la consola y detenemos la ejecución
        if (!contenedor) {
            console.warn("No se encontró el contenedor 'containerMythology' en el DOM.");
            return;
        }

        // Si no hay resultados, mostramos un mensaje en el contenedor
        if (data.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron mitologías con el nombre ingresado.</p>";
            return;
        }

        // Si hay resultados, llamamos a la función showMythology para mostrarlos en el DOM
        showMythology(data, "containerMythology");

    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el proceso
        console.error("Error al filtrar mitologías:", error); // Mostramos el error en la consola
        alertas("error", "Error al filtrar", "Ocurrió un error al filtrar mitologías. Inténtalo de nuevo más tarde.");
    }
}

// Función para eliminar los filtros
function deleteFilters() {
    // Obtenemos el input de filtro por nombre
    let nameInput = document.getElementById("searchMythology");

    // Limpiamos el valor del input
    clearInput(nameInput);

    // Llamamos a la función para mostrar todas las mitologías sin filtros
    getAllMythology();
}

// Asociamos los eventos a los botones después de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Botón para aplicar el filtro
    const filterButton = document.getElementById("btnSearch");
    if (filterButton) {
        filterButton.addEventListener("click", fetchMythology);
    }

    // Botón para borrar los filtros
    const deleteFiltersButton = document.getElementById("btnClear");
    if (deleteFiltersButton) {
        deleteFiltersButton.addEventListener("click", deleteFilters);
    }
});