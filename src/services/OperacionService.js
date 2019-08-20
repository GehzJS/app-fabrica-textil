import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class OperacionService {
    constructor() {}

    /*  Función para obtener a los operaciones paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return operaciones -> Operaciones obtenidos por consulta.
     */
    obtenerOperaciones(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/filas/${registros}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let operaciones =
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
        return operaciones;
    }

    /*  Función para obtener a un operacion en específico.
     *   @param id -> Identificador del operacion que se está consultando.
     *   @return operacion -> Operacion obtenido por consulta.
     */
    obtenerOperacion(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/${id}`;
        // Petición a la API y obtención del resultado.
        let operacion =
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
        return operacion;
    }

    /*  Función para buscar operaciones por su nombre.
     *   @param busqueda -> Datos introducidos por el operacion.
     *   @return resultado -> Operaciones obtenidos tras la consulta.
     */
    buscarOperaciones(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/buscar/operacion/${campo}/?search=${busqueda}`;
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

    /*  Función para buscar operaciones por su nombre.
     *   @param busqueda -> Datos introducidos por el operacion.
     *   @return resultado -> Operaciones obtenidos tras la consulta.
     */
    buscarOperacionesPorModelo(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/buscar/modelo/${campo}/?search=${busqueda}`;
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

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return modelos -> Usuarios obtenidos por consulta.
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

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return telas -> Usuarios obtenidos por consulta.
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

    /*  Función para guardar operaciones.
     *   @param operacion -> Datos del operacion que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarOperacion(operacion) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/`;
        let nueva = this.filtrar(operacion);
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

    /*  Función para editar operaciones.
     *   @param operacion -> Datos del operacion que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarOperacion(operacion) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/${operacion.id}`;
        let nueva = this.filtrar(operacion);
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

    /*  Función para borrar operaciones.
     *   @param id -> Identificador del operacion que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarOperacion(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/operaciones/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(operacion) {
        return {
            nombre: operacion.nombre,
            precio: operacion.precio,
            maquina: operacion.maquina,
            necesario: operacion.necesario,
            color: operacion.color,
            descripcion: operacion.descripcion,
            modelo_id: operacion.modelo_id,
            tela_id: operacion.tela_id
        };
    }
}