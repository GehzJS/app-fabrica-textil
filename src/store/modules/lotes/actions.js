import mutations from './mutations';
import { LoteService } from '@/services/LoteService.js';

const loteService = new LoteService();

export default {
    async listarLotes({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let lotes = await loteService.obtenerLotes(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarLotes');
        if (lotes != null) {
            commit('asignarPaginacion', { pagina: lotes.current_page, total: lotes.last_page, registros: state.paginacion.registros });
            for (let lote of lotes.data) {
                commit('asignarLotes', lote);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaLotes({ commit, dispatch }) {
        commit('limpiarLotes');
        dispatch('listarLotes');
    },
    async buscarLote({ state, commit, dispatch }, busqueda) {
        commit('limpiarLotes');
        if (busqueda == '') {
            dispatch('listarLotes');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await loteService.buscarLotes(busqueda);
            if (resultados != null) {
                commit('asignarLotesBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarLote({ commit, getters, dispatch }, estado) {
        commit('limpiarLote');
        if (estado.estado) {
            await dispatch('llenarModelos');
            if (getters.numeroModelos == 0) {
                dispatch('modalRegistroModelos');
                return false;
            }
        }
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarLote({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarModelos');
            commit('asignarLote', datos.lote);
        }
        dispatch('llenarFormulario', datos.lote);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarLote({ commit }, datos) {
        if (datos.estado) {
            commit('asignarLote', { id: datos.lote.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleLote({ commit }, datos) {
        if (datos.lote != null) {
            commit('asignarLote', datos.lote);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalRegistroModelos({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'lotes de modelo',
            informacion: 'Es necesario tener al menos un modelo registrado para poder crear un lote de modelo.',
            enlace: 'modelos',
            destino: 'Registrar un nuevo modelo'
        }, { root: true });
    },
    async llenarFormulario({ commit }, lote) {
        commit('asignarLote', lote);
    },
    async llenarModelos({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let modelos = await loteService.obtenerModelos();
        if (modelos != null) {
            for (let modelo of modelos) {
                commit('asignarModelos', { id: modelo.id, nombre: modelo.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarLote({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando lote', estado: true }, { root: true });
        let lote = await loteService.guardarLote(state.lote);
        if (lote != null) {
            dispatch('listarLotes');
            dispatch('general/generarNotificacion', { texto: `El lote ${lote.id} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar el lote. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarLote');
    },
    async editarLote({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando lote', estado: true }, { root: true });
        let lote = await loteService.editarLote(state.lote);
        if (lote != null) {
            dispatch('listarLotes');
            dispatch('general/generarNotificacion', { texto: `El lote ${state.lote.id} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar el lote ${state.lote.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarLote');
    },
    async borrarLote({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando lote', estado: true }, { root: true });
        let respuesta = await loteService.borrarLote(state.lote.id);
        if (respuesta != null) {
            dispatch('listarLotes');
            dispatch('general/generarNotificacion', { texto: `El lote ${state.lote.id} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar el lote ${state.lote.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarLote');
    }
};