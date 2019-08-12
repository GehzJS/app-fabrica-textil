import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    numeroRegistros(state) {
        return state.operaciones.length;
    },
    numeroModelos(state) {
        return state.modelos.length;
    },
    numeroTelas(state) {
        return state.telas.length;
    },
    numeroMaquinas(state) {
        return state.maquinas.length;
    }
};