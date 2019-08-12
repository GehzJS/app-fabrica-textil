import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarUsuarios(state, payload) {
        state.usuarios.push({
            id: payload.id,
            usuario: payload.usuario,
            rol: payload.rol,
            empleado_id: payload.empleado_id,
            empleado: payload.empleado.nombre + ' ' + payload.empleado.apellido_p + ' ' + payload.empleado.apellido_m,
            registro: payload.created_at
                // api_token: payload.api_token
        });
    },
    asignarUsuariosBusqueda(state, payload) {
        state.usuarios = payload;
    },
    asignarUsuario(state, payload) {
        state.usuario = payload;
    },
    limpiarUsuario(state) {
        state.usuario = {};
    },
    limpiarUsuarios(state) {
        (state.usuarios).splice(0, (state.usuarios).length);
    },
    asignarEmpleados(state, payload) {
        state.empleados.push({
            id: payload.id,
            nombreEmpleado: payload.nombre
        });
    }
};