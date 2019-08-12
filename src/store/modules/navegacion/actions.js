import mutations from './mutations';

export default {
    borrarNotificacionLocal({ commit }, index) {
        commit('borrarNotificacion', index);
        commit('general/guardarLocal', null, { root: true });
    }
};