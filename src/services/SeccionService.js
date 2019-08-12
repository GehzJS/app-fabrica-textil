import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class SeccionService {
    constructor() {}

    /*  Función para obtener a los secciones paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return secciones -> Secciones obtenidos por consulta.
     */
    obtenerSecciones() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/secciones/listar`;
        // Petición a la API y obtención del resultado.
        let secciones =
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
        return secciones;
    }

    /*  Función para obtener a un seccion en específico.
     *   @param id -> Identificador del seccion que se está consultando.
     *   @return seccion -> Seccion obtenido por consulta.
     */
    obtenerSeccion(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/secciones/${id}`;
        // Petición a la API y obtención del resultado.
        let seccion =
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
        return seccion;
    }

    /*  Función para buscar secciones por su nombre.
     *   @param busqueda -> Datos introducidos por el seccion.
     *   @return resultado -> Secciones obtenidos tras la consulta.
     */
    buscarSecciones(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/secciones/buscar/?search=${busqueda}`;
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

    /*  Función para guardar secciones.
     *   @param seccion -> Datos del seccion que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarSeccion(seccion) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/secciones/`;
        let nuevo = this.filtrar(seccion);
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

    /*  Función para editar secciones.
     *   @param seccion -> Datos del seccion que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarSeccion(seccion) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/secciones/${seccion.id}`;
        let nuevo = this.filtrar(seccion);
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

    /*  Función para borrar secciones.
     *   @param id -> Identificador del seccion que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarSeccion(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/secciones/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(seccion) {
        return {
            nombre: seccion.nombre
        };
    }
}