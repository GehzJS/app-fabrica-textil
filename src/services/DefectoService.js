import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class DefectoService {
    constructor() {}

    /*  Función para obtener a los defectos paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return defectos -> Defectos obtenidos por consulta.
     */
    obtenerDefectos(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/filas/${registros}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let defectos =
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
        return defectos;
    }

    /*  Función para obtener a un defecto en específico.
     *   @param id -> Identificador del defecto que se está consultando.
     *   @return defecto -> Defecto obtenido por consulta.
     */
    obtenerDefecto(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/${id}`;
        // Petición a la API y obtención del resultado.
        let defecto =
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
        return defecto;
    }

    /*  Función para buscar defectos por su nombre.
     *   @param busqueda -> Datos introducidos por el defecto.
     *   @return resultado -> Defectos obtenidos tras la consulta.
     */
    buscarDefectosPorEmpleado(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/buscar/empleado/${campo}/?search=${busqueda}`;
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

    /*  Función para buscar defectos por su nombre.
     *   @param busqueda -> Datos introducidos por el defecto.
     *   @return resultado -> Defectos obtenidos tras la consulta.
     */
    buscarDefectosPorModelo(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/buscar/modelo/${campo}/?search=${busqueda}`;
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

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return modelos -> Usuarios obtenidos por consulta.
     */
    obtenerModelos() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/listar`;
        // Petición a la API y obtención del resultado.
        let defectos =
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
        return defectos;
    }

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return modelos -> Usuarios obtenidos por consulta.
     */
    obtenerEmpleados() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/listar`;
        // Petición a la API y obtención del resultado.
        let empleados =
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
        return empleados;
    }

    /*  Función para guardar defectos.
     *   @param defecto -> Datos del defecto que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarDefecto(defecto) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/`;
        let nuevo = this.filtrar(defecto);
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

    /*  Función para editar defectos.
     *   @param defecto -> Datos del defecto que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarDefecto(defecto) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/${defecto.id}`;
        let nuevo = this.filtrar(defecto);
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

    /*  Función para borrar defectos.
     *   @param id -> Identificador del defecto que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarDefecto(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/defectos/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(defecto) {
        return {
            cantidad: defecto.cantidad,
            descripcion: defecto.descripcion,
            empleado_id: defecto.empleado_id,
            modelo_id: defecto.modelo_id
        };
    }
}