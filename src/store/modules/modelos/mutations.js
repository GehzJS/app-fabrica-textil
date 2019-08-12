import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarModelos(state, payload) {
        let colores = [];
        for (const color of payload.operaciones) {
            colores.push(color.color);
        }
        state.modelos.push({
            id: payload.id,
            nombre: payload.nombre,
            tipo: payload.tipo,
            material: payload.material,
            para: payload.para,
            talla: payload.talla,
            colores: colores,
            stock: payload.stock,
            precio: payload.precio,
            descripcion: payload.descripcion,
            registro: payload.created_at
        });
    },
    asignarModelosBusqueda(state, payload) {
        state.modelos = payload;
    },
    asignarModelo(state, payload) {
        state.modelo = payload;
    },
    limpiarModelo(state) {
        state.modelo = {};
    },
    limpiarModelos(state) {
        (state.modelos).splice(0, (state.modelos).length);
    },
    asignarMateriales(state, payload) {
        state.materiales.push({
            nombre_material: payload.nombre
        });
    },
    asignarTallas(state, payload) {
        state.tallas.push({
            nombre_talla: payload.nombre
        });
    },
    asignarTipos(state, payload) {
        state.tipos.push({
            nombre_tipo: payload.nombre
        });
    }
};