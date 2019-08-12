import mutations from './mutations';
import { MaterialService } from '@/services/MaterialService.js';

const materialService = new MaterialService();

export default {
    async listarMateriales({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let materiales = await materialService.obtenerMateriales();
        commit('limpiarMateriales');
        if (materiales != null) {
            for (let material of materiales) {
                commit('asignarMateriales', material);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async buscarMaterial({ state, commit, dispatch }) {
        commit('limpiarMateriales');
        if (state.material.nombre == '') {
            dispatch('listarMateriales');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await materialService.buscarMateriales(state.material.nombre);
            if (resultados != null) {
                commit('asignarMaterialesBusqueda', resultados);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    llenarFormularioEditar({ commit }, datos) {
        commit('asignarMaterial', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 1 });
    },
    llenarFormularioBorrar({ commit }, datos) {
        commit('asignarMaterial', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 2 });
    },
    reiniciarAccion({ commit }) {
        commit('limpiarMaterial');
        commit('cambiarAccion', { tipo: 0 });
    },
    async guardarMaterial({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando material', estado: true }, { root: true });
        let material = await materialService.guardarMaterial(state.material);
        if (material != null) {
            dispatch('listarMateriales');
            dispatch('general/generarNotificacion', { texto: `La material ${state.material.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar a la material ${state.material.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async editarMaterial({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando material', estado: true }, { root: true });
        let material = await materialService.editarMaterial(state.material);
        if (material != null) {
            dispatch('listarMateriales');
            dispatch('general/generarNotificacion', { texto: `El material ${state.material.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar a la material ${state.material.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async borrarMaterial({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando material', estado: true }, { root: true });
        let respuesta = await materialService.borrarMaterial(state.material.id);
        if (respuesta != null) {
            dispatch('listarMateriales');
            dispatch('general/generarNotificacion', { texto: `El material ${state.material.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar a la material ${state.material.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    }
};