import mutations from './mutations';
import { ClienteService } from '@/services/ClienteService.js';

const clienteService = new ClienteService();

export default {
    async listarClientes({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let clientes = await clienteService.obtenerClientes(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarClientes');
        if (clientes != null) {
            commit('asignarPaginacion', { pagina: clientes.current_page, total: clientes.last_page, registros: state.paginacion.registros });
            for (let cliente of clientes.data) {
                commit('asignarClientes', cliente);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaClientes({ commit, dispatch }) {
        commit('limpiarClientes');
        dispatch('listarClientes');
    },
    async buscarCliente({ state, commit, dispatch }, busqueda) {
        commit('limpiarClientes');
        if (busqueda == '') {
            dispatch('listarClientes');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await clienteService.buscarClientes(busqueda);
            if (resultados != null) {
                commit('asignarClientesBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarCliente({ commit, dispatch }, estado) {
        commit('limpiarCliente');
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarCliente({ commit, dispatch }, datos) {
        commit('asignarCliente', datos.cliente);
        dispatch('llenarFormulario', datos.cliente);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarCliente({ commit }, datos) {
        if (datos.estado) {
            commit('asignarCliente', { id: datos.cliente.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleCliente({ commit }, datos) {
        if (datos.cliente != null) {
            commit('asignarCliente', datos.cliente);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    async llenarFormulario({ commit }, cliente) {
        commit('asignarCliente', cliente);
    },
    async guardarCliente({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando cliente', estado: true }, { root: true });
        let cliente = await clienteService.guardarCliente(state.cliente);
        if (cliente != null) {
            dispatch('listarClientes');
            dispatch('general/generarNotificacion', { texto: `El cliente ${state.cliente.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar al cliente ${state.cliente.nombre}. Intentelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarCliente');
    },
    async editarCliente({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando cliente', estado: true }, { root: true });
        let cliente = await clienteService.editarCliente(state.cliente);
        if (cliente != null) {
            dispatch('listarClientes');
            dispatch('general/generarNotificacion', { texto: `El cliente ${state.cliente.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar al cliente ${state.cliente.nombre}. Intentelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarCliente');
    },
    async borrarCliente({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando cliente', estado: true }, { root: true });
        let respuesta = await clienteService.borrarCliente(state.cliente.id);
        if (respuesta != null) {
            dispatch('listarClientes');
            dispatch('general/generarNotificacion', { texto: `El cliente ${state.cliente.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar al cliente ${state.cliente.nombre}. Intentelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarCliente');
    }
};