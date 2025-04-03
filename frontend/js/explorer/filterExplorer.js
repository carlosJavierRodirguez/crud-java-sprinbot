// Importamos la función showExplorers desde el archivo getDataExplorer.js
import { showExplorers } from "./getDataExplorer.js";

/**
 * Genera la URL con el filtro seleccionado
 * Esta función construye dinámicamente la URL del endpoint según el filtro ingresado por el usuario.
 */
function getFilterUrl() {
    const baseUrl = "http://localhost:8085/api/v1/explorer/filter/"; // URL base del endpoint de filtros

    // Obtenemos los valores de los inputs de filtro
    const name = document.getElementById("filterName")?.value.trim(); // Filtro por nombre
    const age = document.getElementById("filterAge")?.value.trim(); // Filtro por edad
    const nationality = document.getElementById("filterNationality")?.value.trim(); // Filtro por nacionalidad
    const reputation = document.getElementById("filterReputation")?.value.trim(); // Filtro por reputación

    // Construimos la URL según el filtro ingresado
    if (name) return `${baseUrl}${encodeURIComponent(name)}`; // Filtro por nombre
    if (age) return `${baseUrl}age/${encodeURIComponent(age)}`; // Filtro por edad
    if (nationality) return `${baseUrl}nationality/${encodeURIComponent(nationality)}`; // Filtro por nacionalidad
    if (reputation) return `${baseUrl}reputation/${encodeURIComponent(reputation)}`; // Filtro por reputación

    return null; // Si no se ingresó ningún filtro, retornamos null
}

/**
 * Realiza la petición a la API y muestra los resultados en el DOM
 * Esta función se encarga de conectar con el backend, obtener los datos filtrados y mostrarlos en el DOM.
 */
async function fetchExplorers() {
    try {
        // Obtenemos la URL generada por la función getFilterUrl
        const url = getFilterUrl();

        // Si no hay URL (es decir, no se ingresaron filtros), mostramos una alerta y detenemos la ejecución
        if (!url) {
            alert("Por favor, ingresa al menos un valor para filtrar.");
            return;
        }

        console.log("URL de la petición:", url); // Depuración: mostramos la URL generada en la consola

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
        console.log("Exploradores filtrados:", data); // Depuración: mostramos los datos obtenidos en la consola

        // Obtenemos el contenedor donde se mostrarán los exploradores
        let contenedor = document.getElementById("exploradoresContainer");

        // Si el contenedor no existe en el DOM, mostramos una advertencia en la consola y detenemos la ejecución
        if (!contenedor) {
            console.warn("No se encontró el contenedor 'exploradoresContainer' en el DOM.");
            return;
        }

        // Si no hay resultados, mostramos un mensaje en el contenedor
        if (data.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron exploradores con los filtros aplicados.</p>";
            return;
        }

        // Si hay resultados, llamamos a la función showExplorers para mostrarlos en el DOM
        showExplorers(data, "exploradoresContainer");

    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el proceso
        console.error("Error al filtrar exploradores:", error); // Mostramos el error en la consola
        alert("Ocurrió un error al filtrar exploradores. Inténtalo de nuevo más tarde."); // Mostramos una alerta al usuario
    }
}

// Hacemos la función fetchExplorers accesible desde el HTML
window.filterExplorer = fetchExplorers;
