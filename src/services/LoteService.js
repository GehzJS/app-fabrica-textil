import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class LoteService {
    constructor() {}

    /*  Función para obtener a los lotes paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return lotes -> Lotes obtenidos por consulta.
     */
    obtenerLotes(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/lotes/filas/${registros}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let lotes =
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
        return lotes;
    }

    /*  Función para obtener a un lote en específico.
     *   @param id -> Identificador del lote que se está consultando.
     *   @return lote -> Lote obtenido por consulta.
     */
    obtenerLote(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/lotes/${id}`;
        // Petición a la API y obtención del resultado.
        let lote =
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
        return lote;
    }

    /*  Función para buscar lotes por su nombre.
     *   @param busqueda -> Datos introducidos por el lote.
     *   @return resultado -> Lotes obtenidos tras la consulta.
     */
    buscarLotes(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/lotes/buscar/${campo}/?search=${busqueda}`;
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

    /*  Función para guardar lotes.
     *   @param lote -> Datos del lote que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarLote(lote) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/lotes/`;
        let nuevo = this.filtrar(lote);
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

    /*  Función para editar lotes.
     *   @param lote -> Datos del lote que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarLote(lote) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/lotes/${lote.id}`;
        let nuevo = this.filtrar(lote);
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

    /*  Función para borrar lotes.
     *   @param id -> Identificador del lote que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarLote(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/lotes/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(lote) {
        return {
            cantidad: lote.cantidad,
            descripcion: lote.descripcion,
            modelo_id: lote.modelo_id
        };
    }
}