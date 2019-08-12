import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarSecciones(state, payload) {
        state.secciones.push({
            id: payload.id,
            nombre: payload.nombre,
            registro: payload.created_at
        });
    },
    asignarSeccionesBusqueda(state, payload) {
        state.secciones = payload;
    },
    asignarSeccion(state, payload) {
        state.seccion = payload;
    },
    limpiarSeccion(state) {
        state.seccion = {};
    },
    limpiarSecciones(state) {
        (state.secciones).splice(0, (state.secciones).length);
    },
    cambiarAccion(state, payload) {
        state.accion = payload.tipo;
    }
};