import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarTallas(state, payload) {
        state.tallas.push({
            id: payload.id,
            nombre: payload.nombre,
            registro: payload.created_at
        });
    },
    asignarTallasBusqueda(state, payload) {
        state.tallas = payload;
    },
    asignarTalla(state, payload) {
        state.talla = payload;
    },
    limpiarTalla(state) {
        state.talla = {};
    },
    limpiarTallas(state) {
        (state.tallas).splice(0, (state.tallas).length);
    },
    cambiarAccion(state, payload) {
        state.accion = payload.tipo;
    }
};