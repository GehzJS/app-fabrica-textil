import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class AdquisicionItemService {
    constructor() {}

    /*  Función para obtener a los telas paginadas.
     *   @return telas -> Telas obtenidos por consulta.
     */
    obtenerTelas() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/listar`;
        // Petición a la API y obtención del resultado.
        let telas =
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
        return telas;
    }

    /*  Función para guardar items.
     *   @param item -> Datos del item que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarItem(item) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisicion-items`;
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
        let URL = `${API_URL}/adquisicion-items/${id}`;
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
            adquisicion_id: item.adquisicion_id,
            tela_id: item.tela_id,
            tela: item.tela
        };
    }
}