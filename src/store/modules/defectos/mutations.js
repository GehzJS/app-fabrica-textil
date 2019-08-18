import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarDefectos(state, payload) {
        state.defectos.push({
            id: payload.id,
            cantidad: payload.cantidad,
            descripcion: payload.descripcion,
            modelo_id: payload.modelo_id,
            modelo: payload.modelo.nombre,
            empleado_id: payload.empleado_id,
            empleado: payload.empleado.nombre + ' ' + payload.empleado.apellido_p + ' ' + payload.empleado.apellido_m,
            registro: payload.created_at
        });
    },
    asignarDefectosBusqueda(state, payload) {
        state.defectos = payload;
    },
    asignarDefecto(state, payload) {
        state.defecto = payload;
    },
    limpiarDefecto(state) {
        state.defecto = {};
    },
    limpiarDefectos(state) {
        (state.defectos).splice(0, (state.defectos).length);
    },
    asignarModelos(state, payload) {
        state.modelos.push({
            id: payload.id,
            nombre_modelo: payload.nombre
        });
    },
    asignarEmpleados(state, payload) {
        state.empleados.push({
            id: payload.id,
            nombre_empleado: payload.nombre
        });
    }
};