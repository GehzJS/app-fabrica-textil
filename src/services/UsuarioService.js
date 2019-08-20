import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class UsuarioService {
    constructor() {}

    /*  Función para obtener a los usuarios paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return usuarios -> Usuarios obtenidos por consulta.
     */
    obtenerUsuarios(registros, pagina, rol) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios/filas/${registros}/rol/${rol}/?page=${pagina}`;
        // Petición a la API y obtención del resultado.
        let usuarios =
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
        return usuarios;
    }

    /*  Función para obtener a un usuario en específico.
     *   @param id -> Identificador del usuario que se está consultando.
     *   @return usuario -> Usuario obtenido por consulta.
     */
    obtenerUsuario(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios/${id}`;
        // Petición a la API y obtención del resultado.
        let usuario =
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
        return usuario;
    }

    /*  Función para buscar usuarios por su nombre.
     *   @param busqueda -> Datos introducidos por el usuario.
     *   @return resultado -> Usuarios obtenidos tras la consulta.
     */
    buscarUsuarios(busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios/buscar/usuario/?search=${busqueda}`;
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

    /*  Función para buscar usuarios por su nombre.
     *   @param busqueda -> Datos introducidos por el usuario.
     *   @return resultado -> Usuarios obtenidos tras la consulta.
     */
    buscarUsuariosPorEmpleado(campo, busqueda) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios/buscar/empleado/${campo}/?search=${busqueda}`;
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

    /*  Función para obtener a los empleados paginados.
     *   @param registros -> Número de registros por consulta.
     *   @param pagina -> Número de página actual.
     *   @return empleados -> Usuarios obtenidos por consulta.
     */
    obtenerEmpleados() {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/empleados/usuarios`;
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

    /*  Función para guardar usuarios.
     *   @param usuario -> Datos del usuario que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarUsuario(usuario) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios`;
        let nuevo = this.filtrar(usuario);
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

    /*  Función para editar usuarios.
     *   @param usuario -> Datos del usuario que se va a editar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    editarUsuario(usuario) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios/${usuario.id}`;
        let nuevo = this.filtrar(usuario);
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

    /*  Función para borrar usuarios.
     *   @param id -> Identificador del usuario que se va a borrar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    borrarUsuario(id) {
        // Ruta de la API a la que se va a realizar la petición.
        let URL = `${API_URL}/usuarios/${id}`;
        // Petición a la API y obtención del resultado.
        let estado =
            axios.delete(`${URL}`)
            .then(respuesta => respuesta.status)
            .catch(respuesta => respuesta.status);
        // Retorno del resultado.
        return estado;
    }

    filtrar(usuario) {
        return {
            usuario: usuario.usuario,
            contrasena: usuario.contrasena,
            rol: usuario.rol,
            empleado_id: usuario.empleado_id
        };
    }
}