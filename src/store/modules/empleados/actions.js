import mutations from './mutations';
import { EmpleadoService } from '@/services/EmpleadoService.js';

const empleadoService = new EmpleadoService();

export default {
    async listarEmpleados({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let empleados = await empleadoService.obtenerEmpleados(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarEmpleados');
        if (empleados != null) {
            commit('asignarPaginacion', { pagina: empleados.current_page, total: empleados.last_page, registros: state.paginacion.registros });
            for (let empleado of empleados.data) {
                commit('asignarEmpleados', empleado);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaEmpleados({ commit, dispatch }) {
        commit('limpiarEmpleados');
        dispatch('listarEmpleados');
    },
    async buscarEmpleado({ state, commit, dispatch }, busqueda) {
        commit('limpiarEmpleados');
        if (busqueda == '') {
            dispatch('listarEmpleados');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await empleadoService.buscarEmpleados(busqueda);
            if (resultados != null) {
                commit('asignarEmpleadosBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarEmpleado({ commit, dispatch }, estado) {
        commit('limpiarEmpleado');
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarEmpleado({ commit, dispatch }, datos) {
        commit('asignarEmpleado', datos.empleado);
        dispatch('llenarFormulario', datos.empleado);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarEmpleado({ commit }, datos) {
        if (datos.estado) {
            commit('asignarEmpleado', { id: datos.empleado.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleEmpleado({ commit }, datos) {
        if (datos.empleado != null) {
            commit('asignarEmpleado', datos.empleado);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    async llenarFormulario({ commit }, empleado) {
        commit('asignarEmpleado', empleado);
    },
    async guardarEmpleado({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando empleado', estado: true }, { root: true });
        let empleado = await empleadoService.guardarEmpleado(state.empleado);
        if (empleado != null) {
            dispatch('listarEmpleados');
            dispatch('general/generarNotificacion', { texto: `El empleado ${state.empleado.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar al empleado ${state.empleado.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarEmpleado');
    },
    async editarEmpleado({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando empleado', estado: true }, { root: true });
        let empleado = await empleadoService.editarEmpleado(state.empleado);
        if (empleado != null) {
            dispatch('listarEmpleados');
            dispatch('general/generarNotificacion', { texto: `El empleado ${state.empleado.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar al empleado ${state.empleado.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarEmpleado');
    },
    async borrarEmpleado({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando empleado', estado: true }, { root: true });
        let respuesta = await empleadoService.borrarEmpleado(state.empleado.id);
        if (respuesta != null) {
            dispatch('listarEmpleados');
            dispatch('general/generarNotificacion', { texto: `El empleado ${state.empleado.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar al empleado ${state.empleado.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarEmpleado');
    }
};