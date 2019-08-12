import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    numeroRegistros(state) {
        return state.usuarios.length;
    },
    numeroEmpleados(state) {
        return state.empleados.length;
    }
};