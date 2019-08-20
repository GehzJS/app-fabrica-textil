import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class TelaService {
    constructor() {}

    /*  Función para obtener a los telas paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return telas -> Telas obtenidos por consulta.
     */
    obtenerTelas(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/filas/${registros}/?page=${pagina}`;
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

    /*  Función para obtener a un tela en específico.
     *   @param id -> Identificador del tela que se está consultando.
     *   @return tela -> Tela obtenido por consulta.
     */
    obtenerTela(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/${id}`;
        // Petición a la API y obtención del resultado.
        let tela =
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
        return tela;
    }

    /*  Función para buscar telas por su nombre.
     *   @param busqueda -> Datos introducidos por el tela.
     *   @return resultado -> Telas obtenidos tras la consulta.
     */
    buscarTelas(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/buscar/${campo}/?search=${busqueda}`;
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

    /*  Función para guardar telas.
     *   @param tela -> Datos del tela que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarTela(tela) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/`;
        let nueva = this.filtrar(tela);
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

    /*  Función para editar telas.
     *   @param tela -> Datos del tela que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarTela(tela) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/${tela.id}`;
        let nueva = this.filtrar(tela);
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

    /*  Función para borrar telas.
     *   @param id -> Identificador del tela que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarTela(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/telas/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(tela) {
        return {
            nombre: tela.nombre,
            color: tela.color,
            caracteristicas: tela.caracteristicas,
            seccion: tela.seccion,
            stock: tela.stock,
            precio: tela.precio
        };
    }
}