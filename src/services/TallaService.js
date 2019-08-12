import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class TallaService {
    constructor() {}

    /*  Función para obtener a los tallas paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return tallas -> Tallas obtenidos por consulta.
     */
    obtenerTallas() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tallas/listar`;
        // Petición a la API y obtención del resultado.
        let tallas =
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
        return tallas;
    }

    /*  Función para obtener a un talla en específico.
     *   @param id -> Identificador del talla que se está consultando.
     *   @return talla -> Talla obtenido por consulta.
     */
    obtenerTalla(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tallas/${id}`;
        // Petición a la API y obtención del resultado.
        let talla =
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
        return talla;
    }

    /*  Función para buscar tallas por su nombre.
     *   @param busqueda -> Datos introducidos por el talla.
     *   @return resultado -> Tallas obtenidos tras la consulta.
     */
    buscarTallas(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tallas/buscar/?search=${busqueda}`;
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

    /*  Función para guardar tallas.
     *   @param talla -> Datos del talla que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarTalla(talla) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tallas/`;
        let nuevo = this.filtrar(talla);
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

    /*  Función para editar tallas.
     *   @param talla -> Datos del talla que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarTalla(talla) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tallas/${talla.id}`;
        let nuevo = this.filtrar(talla);
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

    /*  Función para borrar tallas.
     *   @param id -> Identificador del talla que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarTalla(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/tallas/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(talla) {
        return {
            nombre: talla.nombre
        };
    }
}