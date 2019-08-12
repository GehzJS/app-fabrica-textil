import mutations from './mutations';
import { MaquinaService } from '@/services/MaquinaService.js';

const maquinaService = new MaquinaService();

export default {
    async listarMaquinas({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let maquinas = await maquinaService.obtenerMaquinas();
        commit('limpiarMaquinas');
        if (maquinas != null) {
            for (let maquina of maquinas) {
                commit('asignarMaquinas', maquina);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async buscarMaquina({ state, commit, dispatch }) {
        commit('limpiarMaquinas');
        if (state.maquina.nombre == '') {
            dispatch('listarMaquinas');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await maquinaService.buscarMaquinas(state.maquina.nombre);
            if (resultados != null) {
                commit('asignarMaquinasBusqueda', resultados);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    llenarFormularioEditar({ commit }, datos) {
        commit('asignarMaquina', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 1 });
    },
    llenarFormularioBorrar({ commit }, datos) {
        commit('asignarMaquina', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 2 });
    },
    reiniciarAccion({ commit }) {
        commit('limpiarMaquina');
        commit('cambiarAccion', { tipo: 0 });
    },
    async guardarMaquina({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando maquina', estado: true }, { root: true });
        let maquina = await maquinaService.guardarMaquina(state.maquina);
        if (maquina != null) {
            dispatch('listarMaquinas');
            dispatch('general/generarNotificacion', { texto: `La maquina ${state.maquina.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar a la maquina ${state.maquina.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async editarMaquina({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando maquina', estado: true }, { root: true });
        let maquina = await maquinaService.editarMaquina(state.maquina);
        if (maquina != null) {
            dispatch('listarMaquinas');
            dispatch('general/generarNotificacion', { texto: `El maquina ${state.maquina.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar a la maquina ${state.maquina.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async borrarMaquina({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando maquina', estado: true }, { root: true });
        let respuesta = await maquinaService.borrarMaquina(state.maquina.id);
        if (respuesta != null) {
            dispatch('listarMaquinas');
            dispatch('general/generarNotificacion', { texto: `El maquina ${state.maquina.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar a la maquina ${state.maquina.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    }
};