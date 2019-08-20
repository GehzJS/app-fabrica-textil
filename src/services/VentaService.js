import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class VentaService {
    constructor() {}

    /*  Función para obtener a los ventas paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return ventas -> Ventas obtenidos por consulta.
     */
    obtenerVentas(registros, pagina, estado) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/ventas/filas/${registros}/estado/${estado}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let ventas =
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
        return ventas;
    }

    /*  Función para obtener a un venta en específico.
     *   @param id -> Identificador del venta que se está consultando.
     *   @return venta -> Venta obtenido por consulta.
     */
    obtenerVenta(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/ventas/${id}`;
        // Petición a la API y obtención del resultado.
        let venta =
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
        return venta;
    }

    /*  Función para buscar ventas por su nombre.
     *   @param busqueda -> Datos introducidos por el venta.
     *   @return resultado -> Ventas obtenidos tras la consulta.
     */
    buscarVentas(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/ventas/buscar/${campo}/?search=${busqueda}`;
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
    obtenerClientes() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/clientes/listar`;
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

    /*  Función para guardar ventas.
     *   @param venta -> Datos del venta que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarVenta(venta) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/ventas/`;
        let nueva = this.filtrar(venta);
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

    /*  Función para editar ventas.
     *   @param venta -> Datos del venta que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarVenta(venta) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/ventas/${venta.id}`;
        let nueva = this.filtrar(venta);
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

    /*  Función para borrar ventas.
     *   @param id -> Identificador del venta que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarVenta(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/ventas/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(venta) {
        return {
            cliente_id: venta.cliente_id,
            descripcion: venta.descripcion,
            total: venta.total,
            estado: venta.estado
        };
    }
}