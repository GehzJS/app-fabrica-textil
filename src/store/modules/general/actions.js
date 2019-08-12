import mutations from './mutations';
import router from "../../../router";

export default {
    generarNotificacion({ commit, getters }, payload) {
        payload.fecha = getters.generarFecha;
        commit('mostrarNotificacion', payload);
        commit('guardarNotificacion', payload);
        commit('guardarLocal');
    },
    borrarNotificacion({ commit }, index) {
        commit('borrarNotificacion', index);
        commit('guardarLocal');
    },
    redirigir({ commit }, enlace) {
        router.push({ name: `${enlace}` });
        commit('mostrarModalRegistro', { estado: false, tipo: '', informacion: '', enlace: '', destino: '' });
        commit('mostrarModalGuardar', { estado: false, boton: null });
        commit('mostrarModalGuardarItem', { estado: false, boton: null });
    }
};