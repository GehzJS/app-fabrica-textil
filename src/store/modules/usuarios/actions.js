import mutations from './mutations';
import { UsuarioService } from '@/services/UsuarioService.js';

const usuarioService = new UsuarioService();

export default {
    async listarUsuarios({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let usuarios = await usuarioService.obtenerUsuarios(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarUsuarios');
        if (usuarios != null) {
            commit('asignarPaginacion', { pagina: usuarios.current_page, total: usuarios.last_page, registros: state.paginacion.registros });
            for (let usuario of usuarios.data) {
                commit('asignarUsuarios', usuario);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaUsuarios({ commit, dispatch }) {
        commit('limpiarUsuarios');
        dispatch('listarUsuarios');
    },
    async buscarUsuario({ state, commit, dispatch }, busqueda) {
        commit('limpiarUsuarios');
        if (busqueda == '') {
            dispatch('listarUsuarios');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await usuarioService.buscarUsuarios(busqueda);
            if (resultados != null) {
                commit('asignarUsuariosBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarUsuario({ commit, getters, dispatch }, estado) {
        commit('limpiarUsuario');
        if (estado.estado) {
            await dispatch('llenarEmpleados');
            if (getters.numeroEmpleados == 0) {
                dispatch('modalRegistroEmpleados');
                return false;
            }
        }
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarUsuario({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarEmpleados');
            commit('asignarUsuario', datos.usuario);
        }
        dispatch('llenarFormulario', datos.usuario);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarUsuario({ commit }, datos) {
        if (datos.estado) {
            commit('asignarUsuario', { id: datos.usuario.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleUsuario({ commit }, datos) {
        if (datos.usuario != null) {
            commit('asignarUsuario', datos.usuario);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalRegistroEmpleados({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'usuarios',
            informacion: 'Es necesario tener al menos un empleado registrado, o disponible (sin un usuario asignado), para poder crear un usuario.',
            enlace: 'empleados',
            destino: 'Registrar un nuevo empleado'
        }, { root: true });
    },
    async llenarFormulario({ commit }, usuario) {
        commit('asignarUsuario', usuario);
    },
    async llenarEmpleados({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let empleados = await usuarioService.obtenerEmpleados();
        if (empleados != null) {
            for (let empleado of empleados) {
                commit('asignarEmpleados', { id: empleado.id, nombre: empleado.nombre + ' ' + empleado.apellido_p + ' ' + empleado.apellido_m });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarUsuario({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando usuario', estado: true }, { root: true });
        let usuario = await usuarioService.guardarUsuario(state.usuario);
        if (usuario != null) {
            dispatch('listarUsuarios');
            dispatch('general/generarNotificacion', { texto: `El usuario ${state.usuario.usuario} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar el usuario ${state.usuario.usuario}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarUsuario');
    },
    async editarUsuario({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando usuario', estado: true }, { root: true });
        let usuario = await usuarioService.editarUsuario(state.usuario);
        if (usuario != null) {
            dispatch('listarUsuarios');
            dispatch('general/generarNotificacion', { texto: `El usuario ${state.usuario.usuario} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar el usuario ${state.usuario.usuario}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarUsuario');
    },
    async borrarUsuario({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando usuario', estado: true }, { root: true });
        let respuesta = await usuarioService.borrarUsuario(state.usuario.id);
        if (respuesta != null) {
            dispatch('listarUsuarios');
            dispatch('general/generarNotificacion', { texto: `El usuario ${state.usuario.usuario} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar el usuario ${state.usuario.usuario}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarUsuario');
    }
};