import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class ClienteService {
    constructor() {}

    /*  Función para obtener a los clientes paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return clientes -> Clientes obtenidos por consulta.
     */
    obtenerClientes(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/filas/${registros}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let clientes =
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
        return clientes;
    }

    /*  Función para obtener a un cliente en específico.
     *   @param id -> Identificador del cliente que se está consultando.
     *   @return cliente -> Cliente obtenido por consulta.
     */
    obtenerCliente(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/${id}`;
        // Petición a la API y obtención del resultado.
        let cliente =
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
        return cliente;
    }

    /*  Función para buscar clientes por su nombre.
     *   @param busqueda -> Datos introducidos por el cliente.
     *   @return resultado -> Clientes obtenidos tras la consulta.
     */
    buscarClientes(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/buscar/?search=${busqueda}`;
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

    /*  Función para guardar clientes.
     *   @param cliente -> Datos del cliente que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarCliente(cliente) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/`;
        let nuevo = this.filtrar(cliente);
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

    /*  Función para editar clientes.
     *   @param cliente -> Datos del cliente que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarCliente(cliente) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/${cliente.id}`;
        let nuevo = this.filtrar(cliente);
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

    /*  Función para borrar clientes.
     *   @param id -> Identificador del cliente que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarCliente(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(cliente) {
        return {
            nombre: cliente.nombre,
            apellido_p: cliente.apellido_p,
            apellido_m: cliente.apellido_m,
            correo: cliente.correo,
            telefono: cliente.telefono
        };
    }
}