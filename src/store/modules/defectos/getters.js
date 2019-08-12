import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    numeroRegistros(state) {
        return state.defectos.length;
    },
    numeroEmpleados(state) {
        return state.empleados.length;
    },
    numeroModelos(state) {
        return state.modelos.length;
    }
};