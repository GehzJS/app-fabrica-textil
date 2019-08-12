import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class TipoService {
    constructor() {}

    /*  Función para obtener a los tipos paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return tipos -> Tipos obtenidos por consulta.
     */
    obtenerTipos() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tipos/listar`;
        // Petición a la API y obtención del resultado.
        let tipos =
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
        return tipos;
    }

    /*  Función para obtener a un tipo en específico.
     *   @param id -> Identificador del tipo que se está consultando.
     *   @return tipo -> Tipo obtenido por consulta.
     */
    obtenerTipo(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tipos/${id}`;
        // Petición a la API y obtención del resultado.
        let tipo =
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
        return tipo;
    }

    /*  Función para buscar tipos por su nombre.
     *   @param busqueda -> Datos introducidos por el tipo.
     *   @return resultado -> Tipos obtenidos tras la consulta.
     */
    buscarTipos(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tipos/buscar/?search=${busqueda}`;
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

    /*  Función para guardar tipos.
     *   @param tipo -> Datos del tipo que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarTipo(tipo) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tipos/`;
        let nuevo = this.filtrar(tipo);
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

    /*  Función para editar tipos.
     *   @param tipo -> Datos del tipo que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarTipo(tipo) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tipos/${tipo.id}`;
        let nuevo = this.filtrar(tipo);
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

    /*  Función para borrar tipos.
     *   @param id -> Identificador del tipo que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarTipo(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tipos/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(tipo) {
        return {
            nombre: tipo.nombre
        };
    }
}