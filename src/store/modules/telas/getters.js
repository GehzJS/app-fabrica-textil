import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    numeroRegistros(state) {
        return state.telas.length;
    },
    numeroSecciones(state) {
        return state.secciones.length;
    }
};