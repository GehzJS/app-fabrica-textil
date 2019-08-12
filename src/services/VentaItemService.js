import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class VentaItemService {
    constructor() {}

    /*  Función para obtener a los modelos paginadas.
     *   @return modelos -> Modelos obtenidos por consulta.
     */
    obtenerModelos() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/listar`;
        // Petición a la API y obtención del resultado.
        let modelos =
            axios.get(`${URL}`)
            .then(respuesta => {
                if (respuesta.status == 200) {
                    return respuesta.data;
                } else {
                    return null;
                }
            })
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return modelos;
    }

    /*  Función para guardar items.
     *   @param item -> Datos del item que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarItem(item) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/venta-items`;
        let nuevo = this.filtrar(item);
        // Petición a la API y obtención del resultado.
        let estado =
            axios.post(URL, nuevo)
            .then(respuesta => {
                if (respuesta.status == 201) {
                    return respuesta.data;
                } else {
                    return null;
                }
            })
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    /*  Función para borrar items.
     *   @param id -> Identificador del item que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarItem(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/venta-items/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(item) {
        return {
            cantidad: item.cantidad,
            precio: item.precio,
            venta_id: item.venta_id,
            modelo_id: item.modelo_id,
            modelo: item.modelo
        };
    }
}