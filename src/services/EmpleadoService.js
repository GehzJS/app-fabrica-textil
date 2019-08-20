import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class EmpleadoService {
    constructor() {}

    /*  Función para obtener a los empleados paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return empleados -> Empleados obtenidos por consulta.
     */
    obtenerEmpleados(registros, pagina, cargo) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/filas/${registros}/cargo/${cargo}/?page=${pagina}`;
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

    /*  Función para obtener a un empleado en específico.
     *   @param id -> Identificador del empleado que se está consultando.
     *   @return empleado -> Empleado obtenido por consulta.
     */
    obtenerEmpleado(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/${id}`;
        // Petición a la API y obtención del resultado.
        let empleado =
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
        return empleado;
    }

    /*  Función para buscar empleados por su nombre.
     *   @param busqueda -> Datos introducidos por el empleado.
     *   @return resultado -> Empleados obtenidos tras la consulta.
     */
    buscarEmpleados(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/buscar/${campo}/?search=${busqueda}`;
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

    /*  Función para guardar empleados.
     *   @param empleado -> Datos del empleado que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarEmpleado(empleado) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/`;
        let nuevo = this.filtrar(empleado);
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

    /*  Función para editar empleados.
     *   @param empleado -> Datos del empleado que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarEmpleado(empleado) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/${empleado.id}`;
        let nuevo = this.filtrar(empleado);
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

    /*  Función para borrar empleados.
     *   @param id -> Identificador del empleado que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarEmpleado(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(empleado) {
        if (empleado.es_usuario == null || empleado.es_usuario == undefined) {
            empleado.es_usuario = 'no';
        }
        return {
            nombre: empleado.nombre,
            apellido_p: empleado.apellido_p,
            apellido_m: empleado.apellido_m,
            correo: empleado.correo,
            telefono: empleado.telefono,
            cargo: empleado.cargo,
            es_usuario: empleado.es_usuario
        };
    }
}