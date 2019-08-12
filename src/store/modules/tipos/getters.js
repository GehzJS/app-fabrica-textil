import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    numeroRegistros(state) {
        return state.tipos.length;
    }
};