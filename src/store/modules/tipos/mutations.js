import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarTipos(state, payload) {
        state.tipos.push({
            id: payload.id,
            nombre: payload.nombre,
            registro: payload.created_at
        });
    },
    asignarTiposBusqueda(state, payload) {
        state.tipos = payload;
    },
    asignarTipo(state, payload) {
        state.tipo = payload;
    },
    limpiarTipo(state) {
        state.tipo = {};
    },
    limpiarTipos(state) {
        (state.tipos).splice(0, (state.tipos).length);
    },
    cambiarAccion(state, payload) {
        state.accion = payload.tipo;
    }
};