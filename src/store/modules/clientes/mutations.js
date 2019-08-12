import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarClientes(state, payload) {
        state.clientes.push({
            id: payload.id,
            nombre: payload.nombre,
            apellido_p: payload.apellido_p,
            apellido_m: payload.apellido_m,
            correo: payload.correo,
            telefono: payload.telefono,
            registro: payload.created_at
        });
    },
    asignarClientesBusqueda(state, payload) {
        state.clientes = payload;
    },
    asignarCliente(state, payload) {
        state.cliente = payload;
    },
    limpiarCliente(state) {
        state.cliente = {};
    },
    limpiarClientes(state) {
        (state.clientes).splice(0, (state.clientes).length);
    }
};