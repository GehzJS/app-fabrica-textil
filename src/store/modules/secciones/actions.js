import mutations from './mutations';
import { SeccionService } from '@/services/SeccionService.js';

const seccionService = new SeccionService();

export default {
    async listarSecciones({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let secciones = await seccionService.obtenerSecciones();
        commit('limpiarSecciones');
        if (secciones != null) {
            for (let seccion of secciones) {
                commit('asignarSecciones', seccion);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async buscarSeccion({ state, commit, dispatch }) {
        commit('limpiarSecciones');
        if (state.seccion.nombre == '') {
            dispatch('listarSecciones');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await seccionService.buscarSecciones(state.seccion.nombre);
            if (resultados != null) {
                commit('asignarSeccionesBusqueda', resultados);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    llenarFormularioEditar({ commit }, datos) {
        commit('asignarSeccion', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 1 });
    },
    llenarFormularioBorrar({ commit }, datos) {
        commit('asignarSeccion', { id: datos.id, nombre: datos.nombre });
        commit('cambiarAccion', { tipo: 2 });
    },
    reiniciarAccion({ commit }) {
        commit('limpiarSeccion');
        commit('cambiarAccion', { tipo: 0 });
    },
    async guardarSeccion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando seccion', estado: true }, { root: true });
        let seccion = await seccionService.guardarSeccion(state.seccion);
        if (seccion != null) {
            dispatch('listarSecciones');
            dispatch('general/generarNotificacion', { texto: `La seccion ${state.seccion.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar a la seccion ${state.seccion.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async editarSeccion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando seccion', estado: true }, { root: true });
        let seccion = await seccionService.editarSeccion(state.seccion);
        if (seccion != null) {
            dispatch('listarSecciones');
            dispatch('general/generarNotificacion', { texto: `El seccion ${state.seccion.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar a la seccion ${state.seccion.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    },
    async borrarSeccion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando seccion', estado: true }, { root: true });
        let respuesta = await seccionService.borrarSeccion(state.seccion.id);
        if (respuesta != null) {
            dispatch('listarSecciones');
            dispatch('general/generarNotificacion', { texto: `El seccion ${state.seccion.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar a la seccion ${state.seccion.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        dispatch('reiniciarAccion');
    }
};