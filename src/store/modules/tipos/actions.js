import mutations from './mutations';
import { TipoService } from '@/services/TipoService.js';

const tipoService = new TipoService();

export default {
    async listarTipos({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let tipos = await tipoService.obtenerTipos();
        commit('limpiarTipos');
        if (tipos != null) {
            for (let tipo of tipos) {
                commit('asignarTipos', tipo);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async buscarTipo({ state, commit, dispatch }) {
        commit('limpiarTipos');
        if (state.tipo.nombre == '') {
            dispatch('listarTipos');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await tipoService.buscarTipos(state.tipo.nombre);
            if (resultados != null) {
                commit('asignarTiposBusqueda', resultados);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    llenarFormularioEditar({ commit }, datos) {
        commit('asignarTipo', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 1 });
    },
    llenarFormularioBorrar({ commit }, datos) {
        commit('asignarTipo', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 2 });
    },
    reiniciarAccion({ commit }) {
        commit('limpiarTipo');
        commit('cambiarAccion', { tipo: 0 });
    },
    async guardarTipo({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando tipo', estado: true }, { root: true });
        let tipo = await tipoService.guardarTipo(state.tipo);
        if (tipo != null) {
            dispatch('listarTipos');
            dispatch('general/generarNotificacion', { texto: `La tipo ${state.tipo.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar a la tipo ${state.tipo.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async editarTipo({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando tipo', estado: true }, { root: true });
        let tipo = await tipoService.editarTipo(state.tipo);
        if (tipo != null) {
            dispatch('listarTipos');
            dispatch('general/generarNotificacion', { texto: `El tipo ${state.tipo.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar a la tipo ${state.tipo.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async borrarTipo({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando tipo', estado: true }, { root: true });
        let respuesta = await tipoService.borrarTipo(state.tipo.id);
        if (respuesta != null) {
            dispatch('listarTipos');
            dispatch('general/generarNotificacion', { texto: `El tipo ${state.tipo.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar a la tipo ${state.tipo.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    }
};