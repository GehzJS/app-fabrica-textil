import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarEmpleados(state, payload) {
        state.empleados.push({
            id: payload.id,
            nombre: payload.nombre,
            apellido_p: payload.apellido_p,
            apellido_m: payload.apellido_m,
            correo: payload.correo,
            telefono: payload.telefono,
            cargo: payload.cargo,
            es_usuario: payload.es_usuario,
            registro: payload.created_at
        });
    },
    asignarEmpleadosBusqueda(state, payload) {
        state.empleados = payload;
    },
    asignarEmpleado(state, payload) {
        state.empleado = payload;
    },
    limpiarEmpleado(state) {
        state.empleado = {};
    },
    limpiarEmpleados(state) {
        (state.empleados).splice(0, (state.empleados).length);
    }
};