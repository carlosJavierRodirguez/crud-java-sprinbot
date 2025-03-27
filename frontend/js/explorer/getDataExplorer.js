async function getAllExplorer() {
    try {
        let response = await fetch("http://localhost:8085/api/v1/explorer/", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        let data = await response.json(); // Convertimos la respuesta a JSON
        showExplorers(data); // Llamamos a la función para mostrarlos

    } catch (error) {
        console.error("Error al obtener los exploradores:", error);
    }
}

function showExplorers(exploradores) {
    let contenedor = document.getElementById("exploradoresContainer");
    contenedor.innerHTML = ""; // Limpiamos antes de agregar nuevos datos

    exploradores.forEach(explorador => {
        let card = document.createElement("div");
        card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "pb-1");

        card.innerHTML = `
            <div class="team-item bg-white mb-4">
                <div class="team-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="${explorador.imageExplorer}" alt="Imagen de ${explorador.name}">
                </div>
                <div class="text-center py-4">
                    <h5 class="text-truncate">${explorador.name}</h5>
                    <p class="m-0">Nacionalidad: ${explorador.nationality}</p>
                    <p class="m-0">Edad: ${explorador.age}</p>
                    <input type="range" class="form-range custom-range" id="range-${explorador.id_explorer}" 
                        min="0" max="100" value="${explorador.reputation}" disabled>
                </div>
            </div>
        `;

        contenedor.appendChild(card);

        // Aplicar color al range
        let inputRange = document.getElementById(`range-${explorador.id_explorer}`);
        updateRangeColor(inputRange);
    });
}

// Función para cambiar el color del input range
function updateRangeColor(rangeInput) {
    let value = rangeInput.value;
    let percent = value / 100; // Convertir a porcentaje (0 a 1)

    let red = Math.round(255 * (1 - percent)); // Más cerca de 0, más rojo
    let green = Math.round(255 * percent);     // Más cerca de 100, más verde

    rangeInput.style.background = `linear-gradient(to right, rgb(${red}, ${green}, 0) ${value}%, #ddd ${value}%)`;
}

// Llamar la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    getAllExplorer();
});