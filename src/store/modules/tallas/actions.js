import mutations from './mutations';
import { TallaService } from '@/services/TallaService.js';

const tallaService = new TallaService();

export default {
    async listarTallas({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let tallas = await tallaService.obtenerTallas();
        commit('limpiarTallas');
        if (tallas != null) {
            for (let talla of tallas) {
                commit('asignarTallas', talla);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async buscarTalla({ state, commit, dispatch }) {
        commit('limpiarTallas');
        if (state.talla.nombre == '') {
            dispatch('listarTallas');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await tallaService.buscarTallas(state.talla.nombre);
            if (resultados != null) {
                commit('asignarTallasBusqueda', resultados);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    llenarFormularioEditar({ commit }, datos) {
        commit('asignarTalla', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 1 });
    },
    llenarFormularioBorrar({ commit }, datos) {
        commit('asignarTalla', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 2 });
    },
    reiniciarAccion({ commit }) {
        commit('limpiarTalla');
        commit('cambiarAccion', { tipo: 0 });
    },
    async guardarTalla({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando talla', estado: true }, { root: true });
        let talla = await tallaService.guardarTalla(state.talla);
        if (talla != null) {
            dispatch('listarTallas');
            dispatch('general/generarNotificacion', { texto: `La talla ${state.talla.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar a la talla ${state.talla.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async editarTalla({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando talla', estado: true }, { root: true });
        let talla = await tallaService.editarTalla(state.talla);
        if (talla != null) {
            dispatch('listarTallas');
            dispatch('general/generarNotificacion', { texto: `El talla ${state.talla.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar a la talla ${state.talla.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async borrarTalla({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando talla', estado: true }, { root: true });
        let respuesta = await tallaService.borrarTalla(state.talla.id);
        if (respuesta != null) {
            dispatch('listarTallas');
            dispatch('general/generarNotificacion', { texto: `El talla ${state.talla.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar a la talla ${state.talla.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    }
};