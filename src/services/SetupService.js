import axios from 'axios';

// Ruta principal de la API REST
const API_URL = 'http://localhost:8001/api';

export class SetupService {
    constructor() {}

    /*  Función para guardar empleados.
     *   @param empleado -> Datos del empleado que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    contarEmpleados() {
        let URL = `${API_URL}/empleados/contar`;
        let estado =
            axios.get(URL)
            .then(respuesta => {
                if (respuesta.status == 200) {
                    return respuesta.data;
                } else {
                    return null;
                }
            })
            .catch(respuesta => respuesta.status);
        return estado;
    }

    /*  Función para guardar empleados.
     *   @param empleado -> Datos del empleado que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarEmpleado(empleado) {
        let URL = `${API_URL}/empleados`;
        let nuevo = this.filtrarEmpleado(empleado);
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
        return estado;
    }

    /*  Función para guardar usuarios.
     *   @param usuario -> Datos del usuario que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarUsuario(usuario) {
        let URL = `${API_URL}/usuarios`;
        let nuevo = this.filtrarUsuario(usuario);
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
        return estado;
    }

    /*  Función para guardar clientes.
     *   @param cliente -> Datos del cliente que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarCliente(cliente) {
        let URL = `${API_URL}/clientes`;
        let nuevo = this.filtrarCliente(cliente);
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
        return estado;
    }

    /*  Función para guardar proveedores.
     *   @param proveedor -> Datos del proveedor que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarProveedor(proveedor) {
        let URL = `${API_URL}/proveedores`;
        let nuevo = this.filtrarProveedor(proveedor);
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
        return estado;
    }

    /*  Función para guardar telas.
     *   @param tela -> Datos del tela que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarTela(tela) {
        let URL = `${API_URL}/telas`;
        let nueva = this.filtrarTela(tela);
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
        return estado;
    }

    /*  Función para guardar modelos.
     *   @param modelo -> Datos del modelo que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarModelo(modelo) {
        let URL = `${API_URL}/modelos`;
        let nuevo = this.filtrarModelo(modelo);
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
        return estado;
    }

    /*  Función para guardar secciones.
     *   @param seccion -> Datos del seccion que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarSeccion(seccion) {
        let URL = `${API_URL}/secciones`;
        let nueva = this.filtrarGenerico(seccion);
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
        return estado;
    }

    /*  Función para guardar tallas.
     *   @param talla -> Datos del talla que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarTalla(talla) {
        let URL = `${API_URL}/tallas`;
        let nueva = this.filtrarGenerico(talla);
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
        return estado;
    }

    /*  Función para guardar tipos.
     *   @param tipo -> Datos del tipo que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarTipo(tipo) {
        let URL = `${API_URL}/tipos`;
        let nuevo = this.filtrarGenerico(tipo);
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
        return estado;
    }

    /*  Función para guardar materiales.
     *   @param material -> Datos del material que se va a guardar.
     *   @return estado -> Resultados tras la petición al servidor.
     */
    guardarMaterial(material) {
        let URL = `${API_URL}/materiales`;
        let nuevo = this.filtrarGenerico(material);
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
        return estado;
    }


    filtrarEmpleado(empleado) {
        return {
            nombre: empleado.nombre,
            apellido_p: empleado.apellido_p,
            apellido_m: empleado.apellido_m,
            correo: empleado.correo,
            telefono: empleado.telefono,
            cargo: empleado.cargo,
            es_usuario: 'No'
        };
    }

    filtrarUsuario(usuario) {
        return {
            usuario: usuario.usuario,
            contrasena: usuario.contrasena,
            rol: usuario.rol,
            empleado_id: usuario.empleado_id
        };
    }

    filtrarCliente(cliente) {
        return {
            nombre: cliente.nombre,
            apellido_p: cliente.apellido_p,
            apellido_m: cliente.apellido_m,
            correo: cliente.correo,
            telefono: cliente.telefono
        };
    }

    filtrarProveedor(proveedor) {
        return {
            nombre: proveedor.nombre,
            apellido_p: proveedor.apellido_p,
            apellido_m: proveedor.apellido_m,
            correo: proveedor.correo,
            telefono: proveedor.telefono
        };
    }

    filtrarTela(tela) {
        return {
            nombre: tela.nombre,
            color: tela.color,
            caracteristicas: tela.caracteristicas,
            seccion: tela.seccion,
            stock: tela.stock,
            precio: tela.precio
        };
    }

    filtrarModelo(modelo) {
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

    filtrarGenerico(dato) {
        return {
            nombre: dato
        };
    }
}