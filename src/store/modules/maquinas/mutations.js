import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarMaquinas(state, payload) {
        state.maquinas.push({
            id: payload.id,
            nombre: payload.nombre,
            registro: payload.created_at
        });
    },
    asignarMaquinasBusqueda(state, payload) {
        state.maquinas = payload;
    },
    asignarMaquina(state, payload) {
        state.maquina = payload;
    },
    limpiarMaquina(state) {
        state.maquina = {};
    },
    limpiarMaquinas(state) {
        (state.maquinas).splice(0, (state.maquinas).length);
    },
    cambiarAccion(state, payload) {
        state.accion = payload.tipo;
    }
};