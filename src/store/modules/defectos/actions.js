import mutations from './mutations';
import { DefectoService } from '@/services/DefectoService.js';

const defectoService = new DefectoService();

export default {
    async listarDefectos({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let defectos = await defectoService.obtenerDefectos(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarDefectos');
        if (defectos != null) {
            commit('asignarPaginacion', { pagina: defectos.current_page, total: defectos.last_page, registros: state.paginacion.registros });
            for (let defecto of defectos.data) {
                commit('asignarDefectos', defecto);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaDefectos({ commit, dispatch }) {
        commit('limpiarDefectos');
        dispatch('listarDefectos');
    },
    async buscarDefectoPorEmpleado({ state, commit, dispatch }) {
        commit('limpiarDefectos');
        if (state.busqueda == '') {
            dispatch('listarDefectos');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await defectoService.buscarDefectosPorEmpleado(state.columna_empleado, state.busqueda);
            if (resultados != null) {
                commit('asignarDefectosBusqueda', resultados.data);
            } else {
                // dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },

    async buscarDefectoPorModelo({ state, commit, dispatch }) {
        commit('limpiarDefectos');
        if (state.busqueda == '') {
            dispatch('listarDefectos');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await defectoService.buscarDefectosPorModelo(state.columna_modelo, state.busqueda);
            if (resultados != null) {
                commit('asignarDefectosBusqueda', resultados.data);
            } else {
                // dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarDefecto({ commit, getters, dispatch }, estado) {
        commit('limpiarDefecto');
        if (estado.estado) {
            await dispatch('llenarModelos');
            await dispatch('llenarEmpleados');
            if (getters.numeroModelos == 0) {
                dispatch('modalRegistroModelos');
                return false;
            } else if (getters.numeroEmpleados == 0) {
                dispatch('modalRegistroEmpleados');
                return false;
            }
        }
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarDefecto({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarModelos');
            await dispatch('llenarEmpleados');
            commit('asignarDefecto', datos.defecto);
        }
        dispatch('llenarFormulario', datos.defecto);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarDefecto({ commit }, datos) {
        if (datos.estado) {
            commit('asignarDefecto', { id: datos.defecto.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleDefecto({ commit }, datos) {
        if (datos.defecto != null) {
            commit('asignarDefecto', datos.defecto);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalRegistroEmpleados({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'defectos de modelo',
            informacion: 'Es necesario tener al menos un empleado registrado para poder crear un defecto de modelo.',
            enlace: 'empleados',
            destino: 'Registrar un nuevo empleado'
        }, { root: true });
    },
    modalRegistroModelos({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'defectos de modelo',
            informacion: 'Es necesario tener al menos un modelo registrado para poder crear un defecto de modelo.',
            enlace: 'modelos',
            destino: 'Registrar un nuevo modelo'
        }, { root: true });
    },
    async llenarFormulario({ commit }, defecto) {
        commit('asignarDefecto', defecto);
    },
    async llenarModelos({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let modelos = await defectoService.obtenerModelos();
        if (modelos != null) {
            for (let modelo of modelos) {
                commit('asignarModelos', { id: modelo.id, nombre: modelo.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async llenarEmpleados({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let empleados = await defectoService.obtenerEmpleados();
        if (empleados != null) {
            for (let empleado of empleados) {
                commit('asignarEmpleados', { id: empleado.id, nombre: empleado.nombre + ' ' + empleado.apellido_p + ' ' + empleado.apellido_m });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarDefecto({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando defecto', estado: true }, { root: true });
        let defecto = await defectoService.guardarDefecto(state.defecto);
        if (defecto != null) {
            dispatch('listarDefectos');
            dispatch('general/generarNotificacion', { texto: `El defecto ${defecto.id} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar el defecto. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarDefecto');
    },
    async editarDefecto({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando defecto', estado: true }, { root: true });
        let defecto = await defectoService.editarDefecto(state.defecto);
        if (defecto != null) {
            dispatch('listarDefectos');
            dispatch('general/generarNotificacion', { texto: `El defecto ${state.defecto.id} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar el defecto ${state.defecto.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarDefecto');
    },
    async borrarDefecto({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando defecto', estado: true }, { root: true });
        let respuesta = await defectoService.borrarDefecto(state.defecto.id);
        if (respuesta != null) {
            dispatch('listarDefectos');
            dispatch('general/generarNotificacion', { texto: `El defecto ${state.defecto.id} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar el defecto ${state.defecto.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarDefecto');
    }
};