import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    numeroRegistros(state) {
        return state.modelos.length;
    },
    numeroMateriales(state) {
        return state.materiales.length;
    },
    numeroTallas(state) {
        return state.tallas.length;
    },
    numeroTipos(state) {
        return state.tipos.length;
    }
};