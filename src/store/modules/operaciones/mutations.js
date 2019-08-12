import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarOperaciones(state, payload) {
        state.operaciones.push({
            id: payload.id,
            nombre: payload.nombre,
            precio: payload.precio,
            maquina: payload.maquina,
            necesario: payload.necesario,
            color: payload.color,
            descripcion: payload.descripcion,
            modelo_id: payload.modelo_id,
            modelo: payload.modelo.nombre,
            tela_id: payload.tela_id,
            tela: payload.tela.nombre,
            registro: payload.created_at
        });
    },
    asignarOperacionesBusqueda(state, payload) {
        state.operaciones = payload;
    },
    asignarOperacion(state, payload) {
        state.operacion = payload;
    },
    limpiarOperacion(state) {
        state.operacion = {};
    },
    limpiarOperaciones(state) {
        (state.operaciones).splice(0, (state.operaciones).length);
    },
    asignarModelos(state, payload) {
        state.modelos.push({
            id: payload.id,
            nombre_modelo: payload.nombre
        });
    },
    asignarTelas(state, payload) {
        state.telas.push({
            id: payload.id,
            nombre_tela: payload.nombre,
            color_tela: payload.color
        });
    },
    asignarTela(state) {
        state.operacion.tela_id = state.tela.id;
        state.operacion.color = state.tela.color_tela;
    },
    asignarMaquinas(state, payload) {
        state.maquinas.push({
            nombre_maquina: payload.nombre
        });
    },
};