import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class AdquisicionService {
    constructor() {}

    /*  Función para obtener a los adquisiciones paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return adquisiciones -> Adquisiciones obtenidos por consulta.
     */
    obtenerAdquisiciones(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisiciones/filas/${registros}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let adquisiciones =
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
        return adquisiciones;
    }

    /*  Función para obtener a un adquisicion en específico.
     *   @param id -> Identificador del adquisicion que se está consultando.
     *   @return adquisicion -> Adquisicion obtenido por consulta.
     */
    obtenerAdquisicion(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisiciones/${id}`;
        // Petición a la API y obtención del resultado.
        let adquisicion =
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
        return adquisicion;
    }

    /*  Función para buscar adquisiciones por su nombre.
     *   @param busqueda -> Datos introducidos por el adquisicion.
     *   @return resultado -> Adquisiciones obtenidos tras la consulta.
     */
    buscarAdquisiciones(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisiciones/buscar/?search=${busqueda}`;
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

    /*  Función para obtener a los proveedores paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return proveedores -> Usuarios obtenidos por consulta.
     */
    obtenerProveedores() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/listar`;
        // Petición a la API y obtención del resultado.
        let proveedores =
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
        return proveedores;
    }

    /*  Función para guardar adquisiciones.
     *   @param adquisicion -> Datos del adquisicion que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarAdquisicion(adquisicion) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisiciones/`;
        let nueva = this.filtrar(adquisicion);
        // Petición a la API y obtención del resultado.
        let estado =
            axios.post(URL, nueva)
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

    /*  Función para editar adquisiciones.
     *   @param adquisicion -> Datos del adquisicion que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarAdquisicion(adquisicion) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisiciones/${adquisicion.id}`;
        let nueva = this.filtrar(adquisicion);
        // Petición a la API y obtención del resultado.
        let estado =
            axios.put(URL, nueva)
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

    /*  Función para borrar adquisiciones.
     *   @param id -> Identificador del adquisicion que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarAdquisicion(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/adquisiciones/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => {
                if (respuesta.status == 200) {
                    return respuesta.data;
                } else {
                    return null;
                }
            })
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(adquisicion) {
        return {
            proveedor_id: adquisicion.proveedor_id,
            descripcion: adquisicion.descripcion,
            total: adquisicion.total,
            estado: adquisicion.estado
        };
    }
}