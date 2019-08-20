import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class ProveedorService {
    constructor() {}

    /*  Función para obtener a los proveedores paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return proveedores -> Proveedores obtenidos por consulta.
     */
    obtenerProveedores(registros, pagina) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/filas/${registros}/?page=${pagina}`;
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

    /*  Función para obtener a un proveedor en específico.
     *   @param id -> Identificador del proveedor que se está consultando.
     *   @return proveedor -> Proveedor obtenido por consulta.
     */
    obtenerProveedor(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/${id}`;
        // Petición a la API y obtención del resultado.
        let proveedor =
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
        return proveedor;
    }

    /*  Función para buscar proveedores por su nombre.
     *   @param busqueda -> Datos introducidos por el proveedor.
     *   @return resultado -> Proveedores obtenidos tras la consulta.
     */
    buscarProveedores(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/buscar/${campo}/?search=${busqueda}`;
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

    /*  Función para guardar proveedores.
     *   @param proveedor -> Datos del proveedor que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarProveedor(proveedor) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/`;
        let nuevo = this.filtrar(proveedor);
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

    /*  Función para editar proveedores.
     *   @param proveedor -> Datos del proveedor que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarProveedor(proveedor) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/${proveedor.id}`;
        let nuevo = this.filtrar(proveedor);
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

    /*  Función para borrar proveedores.
     *   @param id -> Identificador del proveedor que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarProveedor(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/proveedores/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(proveedor) {
        return {
            nombre: proveedor.nombre,
            apellido_p: proveedor.apellido_p,
            apellido_m: proveedor.apellido_m,
            correo: proveedor.correo,
            telefono: proveedor.telefono
        };
    }
}