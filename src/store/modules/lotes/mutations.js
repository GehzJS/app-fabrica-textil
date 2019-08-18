import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarLotes(state, payload) {
        state.lotes.push({
            id: payload.id,
            cantidad: payload.cantidad,
            descripcion: payload.descripcion,
            modelo_id: payload.modelo_id,
            modelo: payload.modelo.nombre,
            registro: payload.created_at
        });
    },
    asignarLotesBusqueda(state, payload) {
        state.lotes = payload;
    },
    asignarLote(state, payload) {
        state.lote = payload;
    },
    limpiarLote(state) {
        state.lote = {};
    },
    limpiarLotes(state) {
        (state.lotes).splice(0, (state.lotes).length);
    },
    asignarModelos(state, payload) {
        state.modelos.push({
            id: payload.id,
            nombre_modelo: payload.nombre
        });
    }
};