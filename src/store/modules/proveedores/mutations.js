import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarProveedores(state, payload) {
        state.proveedores.push({
            id: payload.id,
            nombre: payload.nombre,
            apellido_p: payload.apellido_p,
            apellido_m: payload.apellido_m,
            correo: payload.correo,
            telefono: payload.telefono,
            registro: payload.created_at
        });
    },
    asignarProveedoresBusqueda(state, payload) {
        state.proveedores = payload;
    },
    asignarProveedor(state, payload) {
        state.proveedor = payload;
    },
    limpiarProveedor(state) {
        state.proveedor = {};
    },
    limpiarProveedores(state) {
        (state.proveedores).splice(0, (state.proveedores).length);
    }
};