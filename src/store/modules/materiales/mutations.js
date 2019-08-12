import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarMateriales(state, payload) {
        state.materiales.push({
            id: payload.id,
            nombre: payload.nombre,
            registro: payload.created_at
        });
    },
    asignarMaterialesBusqueda(state, payload) {
        state.materiales = payload;
    },
    asignarMaterial(state, payload) {
        state.material = payload;
    },
    limpiarMaterial(state) {
        state.material = {};
    },
    limpiarMateriales(state) {
        (state.materiales).splice(0, (state.materiales).length);
    },
    cambiarAccion(state, payload) {
        state.accion = payload.tipo;
    }
};