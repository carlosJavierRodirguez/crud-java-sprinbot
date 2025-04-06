import { alertas } from "../alertas/alertas";
async function serverDelete() {
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
function deleteExplorer(id) {

}