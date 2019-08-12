import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarTelas(state, payload) {
        state.telas.push({
            id: payload.id,
            nombre: payload.nombre,
            seccion: payload.seccion,
            color: payload.color,
            stock: payload.stock,
            precio: payload.precio,
            caracteristicas: payload.caracteristicas,
            registro: payload.created_at
        });
    },
    asignarTelasBusqueda(state, payload) {
        state.telas = payload;
    },
    asignarTela(state, payload) {
        state.tela = payload;
    },
    limpiarTela(state) {
        state.tela = {};
    },
    limpiarTelas(state) {
        (state.telas).splice(0, (state.telas).length);
    },
    filtrarColor(state) {
        let color = state.tela.color.hex;
        state.tela.color = color;
    },
    asignarSecciones(state, payload) {
        state.secciones.push({
            nombre_seccion: payload.nombre
        });
    },
};