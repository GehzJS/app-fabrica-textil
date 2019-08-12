import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class NominaService {
    constructor() {}

    /*  Función para obtener a los nominas paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return nominas -> Nominas obtenidos por consulta.
     */
    obtenerNominas(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/nominas/filas/${registros}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let nominas =
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
        return nominas;
    }

    /*  Función para obtener a un nomina en específico.
     *   @param id -> Identificador del nomina que se está consultando.
     *   @return nomina -> Nomina obtenido por consulta.
     */
    obtenerNomina(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/nominas/${id}`;
        // Petición a la API y obtención del resultado.
        let nomina =
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
        return nomina;
    }

    /*  Función para buscar nominas por su nombre.
     *   @param busqueda -> Datos introducidos por el nomina.
     *   @return resultado -> Nominas obtenidos tras la consulta.
     */
    buscarNominas(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/nominas/buscar/?search=${busqueda}`;
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

    /*  Función para guardar nominas.
     *   @param nomina -> Datos del nomina que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarNomina(nomina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/nominas/`;
        let nueva = this.filtrar(nomina);
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

    /*  Función para editar nominas.
     *   @param nomina -> Datos del nomina que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarNomina(nomina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/nominas/${nomina.id}`;
        let nueva = this.filtrar(nomina);
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

    /*  Función para borrar nominas.
     *   @param id -> Identificador del nomina que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarNomina(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/nominas/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(nomina) {
        return {
            empleado_id: nomina.empleado_id,
            descripcion: nomina.descripcion,
            total: nomina.total,
            estado: nomina.estado
        };
    }
}