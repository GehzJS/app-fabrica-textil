import mutations from './mutations';
import { ProveedorService } from '@/services/ProveedorService.js';

const proveedorService = new ProveedorService();

export default {
    async listarProveedores({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let proveedores = await proveedorService.obtenerProveedores(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarProveedores');
        if (proveedores != null) {
            commit('asignarPaginacion', { pagina: proveedores.current_page, total: proveedores.last_page, registros: state.paginacion.registros });
            for (let proveedor of proveedores.data) {
                commit('asignarProveedores', proveedor);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaProveedores({ commit, dispatch }) {
        commit('limpiarProveedores');
        dispatch('listarProveedores');
    },
    async buscarProveedor({ state, commit, dispatch }) {
        commit('limpiarProveedores');
        if (state.busqueda == '') {
            dispatch('listarProveedores');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await proveedorService.buscarProveedores(state.columna, state.busqueda);
            if (resultados != null) {
                commit('asignarProveedoresBusqueda', resultados.data);
            } else {
                // dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarProveedor({ commit, dispatch }, estado) {
        commit('limpiarProveedor');
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarProveedor({ commit, dispatch }, datos) {
        commit('asignarProveedor', datos.proveedor);
        dispatch('llenarFormulario', datos.proveedor);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarProveedor({ commit }, datos) {
        if (datos.estado) {
            commit('asignarProveedor', { id: datos.proveedor.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleProveedor({ commit }, datos) {
        if (datos.proveedor != null) {
            commit('asignarProveedor', datos.proveedor);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    async llenarFormulario({ commit }, proveedor) {
        commit('asignarProveedor', proveedor);
    },
    async guardarProveedor({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando proveedor', estado: true }, { root: true });
        let proveedor = await proveedorService.guardarProveedor(state.proveedor);
        if (proveedor != null) {
            dispatch('listarProveedores');
            dispatch('general/generarNotificacion', { texto: `El proveedor ${state.proveedor.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar al proveedor ${state.proveedor.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarProveedor');
    },
    async editarProveedor({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando proveedor', estado: true }, { root: true });
        let proveedor = await proveedorService.editarProveedor(state.proveedor);
        if (proveedor != null) {
            dispatch('listarProveedores');
            dispatch('general/generarNotificacion', { texto: `El proveedor ${state.proveedor.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar al proveedor ${state.proveedor.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarProveedor');
    },
    async borrarProveedor({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando proveedor', estado: true }, { root: true });
        let respuesta = await proveedorService.borrarProveedor(state.proveedor.id);
        if (respuesta != null) {
            dispatch('listarProveedores');
            dispatch('general/generarNotificacion', { texto: `El proveedor ${state.proveedor.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar al proveedor ${state.proveedor.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarProveedor');
    }
};