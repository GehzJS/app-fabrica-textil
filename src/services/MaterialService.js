import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class MaterialService {
    constructor() {}

    /*  Función para obtener a los materiales paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return materiales -> Materiales obtenidos por consulta.
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

    /*  Función para obtener a un material en específico.
     *   @param id -> Identificador del material que se está consultando.
     *   @return material -> Material obtenido por consulta.
     */
    obtenerMaterial(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/materiales/${id}`;
        // Petición a la API y obtención del resultado.
        let material =
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
        return material;
    }

    /*  Función para buscar materiales por su nombre.
     *   @param busqueda -> Datos introducidos por el material.
     *   @return resultado -> Materiales obtenidos tras la consulta.
     */
    buscarMateriales(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/materiales/buscar/?search=${busqueda}`;
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

    /*  Función para guardar materiales.
     *   @param material -> Datos del material que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarMaterial(material) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/materiales/`;
        let nuevo = this.filtrar(material);
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

    /*  Función para editar materiales.
     *   @param material -> Datos del material que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarMaterial(material) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/materiales/${material.id}`;
        let nuevo = this.filtrar(material);
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

    /*  Función para borrar materiales.
     *   @param id -> Identificador del material que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarMaterial(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/materiales/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(material) {
        return {
            nombre: material.nombre
        };
    }
}