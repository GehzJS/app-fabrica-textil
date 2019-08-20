import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class ModeloService {
    constructor() {}

    /*  Función para obtener a los modelos paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return modelos -> Modelos obtenidos por consulta.
     */
    obtenerModelos(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/filas/${registros}/?page=${pagina}`;
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

    /*  Función para obtener a un modelo en específico.
     *   @param id -> Identificador del modelo que se está consultando.
     *   @return modelo -> Modelo obtenido por consulta.
     */
    obtenerModelo(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/${id}`;
        // Petición a la API y obtención del resultado.
        let modelo =
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
        return modelo;
    }

    /*  Función para buscar modelos por su nombre.
     *   @param busqueda -> Datos introducidos por el modelo.
     *   @return resultado -> Modelos obtenidos tras la consulta.
     */
    buscarModelos(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/buscar/${campo}/?search=${busqueda}`;
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
    obtenerMateriales() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/materiales/listar`;
        // Petición a la API y obtención del resultado.
        let materiales =
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
        return materiales;
    }

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return modelos -> Usuarios obtenidos por consulta.
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

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return modelos -> Usuarios obtenidos por consulta.
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

    /*  Función para guardar modelos.
     *   @param modelo -> Datos del modelo que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarModelo(modelo) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/`;
        let nuevo = this.filtrar(modelo);
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

    /*  Función para editar modelos.
     *   @param modelo -> Datos del modelo que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarModelo(modelo) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/${modelo.id}`;
        let nuevo = this.filtrar(modelo);
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

    /*  Función para borrar modelos.
     *   @param id -> Identificador del modelo que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarModelo(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/modelos/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(modelo) {
        return {
            nombre: modelo.nombre,
            descripcion: modelo.descripcion,
            tipo: modelo.tipo,
            material: modelo.material,
            para: modelo.para,
            talla: modelo.talla,
            stock: modelo.stock,
            precio: modelo.precio
        };
    }
}