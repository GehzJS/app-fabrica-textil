import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class MaquinaService {
    constructor() {}

    /*  Función para obtener a los maquinas paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return maquinas -> Maquinas obtenidos por consulta.
     */
    obtenerMaquinas() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/maquinas/listar`;
        // Petición a la API y obtención del resultado.
        let maquinas =
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
        return maquinas;
    }

    /*  Función para obtener a un maquina en específico.
     *   @param id -> Identificador del maquina que se está consultando.
     *   @return maquina -> Maquina obtenido por consulta.
     */
    obtenerMaquina(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/maquinas/${id}`;
        // Petición a la API y obtención del resultado.
        let maquina =
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
        return maquina;
    }

    /*  Función para buscar maquinas por su nombre.
     *   @param busqueda -> Datos introducidos por el maquina.
     *   @return resultado -> Maquinas obtenidos tras la consulta.
     */
    buscarMaquinas(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/maquinas/buscar/?search=${busqueda}`;
        // Petición a la API y obtención del resultado.
        let resultado =
            axios.post(`${URL}`)
            .then(respuesta => {
                if (respuesta.status == 200) {
                    return respuesta.data;
                } else {
                    return null;
                }
            })
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return resultado;
    }

    /*  Función para guardar maquinas.
     *   @param maquina -> Datos del maquina que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarMaquina(maquina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/maquinas/`;
        let nuevo = this.filtrar(maquina);
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

    /*  Función para editar maquinas.
     *   @param maquina -> Datos del maquina que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarMaquina(maquina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/maquinas/${maquina.id}`;
        let nuevo = this.filtrar(maquina);
        // Petición a la API y obtención del resultado.
        let estado =
            axios.put(URL, nuevo)
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

    /*  Función para borrar maquinas.
     *   @param id -> Identificador del maquina que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarMaquina(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/maquinas/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(maquina) {
        return {
            nombre: maquina.nombre
        };
    }
}