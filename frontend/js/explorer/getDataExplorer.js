// Función para obtener todos los exploradores desde el backend
export async function getAllExplorer() {
    try {
        // Realizamos una solicitud GET al endpoint del backend
        let response = await fetch("http://localhost:8085/api/v1/explorer/", {
            method: "GET",
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

        // Llamamos a la función para mostrar los exploradores en el DOM
        showExplorers(data, "exploradoresContainer");

    } catch (error) {
        // Mostramos el error en la consola si ocurre algún problema
        console.error("Error al obtener los exploradores:", error);
    }
}

//Función que obtene los mejores 4 exploradores
async function getTopExplorer() {
    try {
        // Realizamos una solicitud GET al endpoint del backend
        let response = await fetch("http://localhost:8085/api/v1/explorer/top", {
            method: "GET",
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

        // Llamamos a la función para mostrar los exploradores en el DOM
        showExplorers(data, "topExplorersContainer");


    } catch (error) {
        console.error("Error al obtener los mejores exploradores:", error);

    }
}

// Función para mostrar los exploradores en el DOM
export function showExplorers(exploradores, containerId) {
    // Obtenemos el contenedor donde se mostrarán los exploradores
    let contenedor = document.getElementById(containerId);

    // Limpiamos el contenido del contenedor antes de agregar nuevos datos
    contenedor.innerHTML = "";

    // Iteramos sobre cada explorador recibido
    exploradores.forEach(explorador => {
        // Creamos un elemento div para la tarjeta del explorador
        let card = document.createElement("div");
        card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "pb-1"); // Agregamos clases de Bootstrap

        // Definimos el contenido HTML de la tarjeta
        card.innerHTML = `
        <div class="team-item bg-white mb-4">
            <div class="team-img position-relative overflow-hidden">
               <!-- Botones de acción -->
                <div class="icon position-absolute top-0 end-0 m-2 d-flex gap-4">
                    <!-- Botón de borrar -->
                    <button class="btn btn-danger btn-sm rounded-circle" title="Borrar">
                        <i class="fa-solid fa-trash text-white p-2"></i>
                    </button>
                    <!-- Botón de editar -->
                    <button class="btn btn-primary btn-sm rounded-circle" title="Editar">
                        <i class="fa-solid fa-pen text-white p-2"></i>
                    </button>
                </div>
                <!-- Imagen del explorador -->
                <img class="img-fluid w-100 largo-imagen" src="${explorador.imageExplorer}" alt="Imagen de ${explorador.name}">
            </div>
            <div class="text-center py-4 p-3">
                <h5 class="text-truncate">${explorador.name}</h5>
                <p class="m-0"><i class="fas fa-flag"></i> ${explorador.nationality}</p>
                <p class="m-0"><i class="fas fa-birthday-cake"></i> Edad: ${explorador.age}</p>
                <p class="m-0"><i class="fa-solid fa-star"></i> Reputación </p>
                
               <div class="progress rounded-pill border border-black">
                 <div class="progress-bar rounded-pill" role="progressbar" style="width: ${explorador.reputation}%; background: ${updateRangeColor(explorador.reputation)};">
                 ${explorador.reputation}%
               </div>
            </div>
        </div>
    `;
        // Agregamos la tarjeta al contenedor
        contenedor.appendChild(card);
    });
}

// Función para cambiar el color del input range
export function updateRangeColor(reputation) {
    // Calculamos el porcentaje (0 a 1) basado en la reputación
    let percent = reputation / 100;

    // Calculamos los valores de rojo y verde según el porcentaje
    let red = Math.round(255 * (1 - percent)); // Más cerca de 0, más rojo
    let green = Math.round(255 * percent);     // Más cerca de 100, más verde

    // Devolvemos el degradado en formato CSS
    return `linear-gradient(to right, rgb(${red}, ${green}, 0), rgb(${red}, ${green}, 0))`;
}

// Llamamos a la función para obtener exploradores al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("exploradoresContainer")) {
        getAllExplorer(); // Solo ejecuta si el ID existe
    }

    if (document.getElementById("topExplorersContainer")) {
        getTopExplorer(); // Solo ejecuta si el ID existe
    }

});
