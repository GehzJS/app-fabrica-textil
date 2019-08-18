import mutations from './mutations';
import { OperacionService } from '@/services/OperacionService.js';

const operacionService = new OperacionService();

export default {
    async listarOperaciones({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let operaciones = await operacionService.obtenerOperaciones(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarOperaciones');
        if (operaciones != null) {
            commit('asignarPaginacion', { pagina: operaciones.current_page, total: operaciones.last_page, registros: state.paginacion.registros });
            for (let operacion of operaciones.data) {
                commit('asignarOperaciones', operacion);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaOperaciones({ commit, dispatch }) {
        commit('limpiarOperaciones');
        dispatch('listarOperaciones');
    },
    async buscarOperacion({ state, commit, dispatch }, busqueda) {
        commit('limpiarOperaciones');
        if (busqueda == '') {
            dispatch('listarOperaciones');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await operacionService.buscarOperaciones(busqueda);
            if (resultados != null) {
                commit('asignarOperacionesBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async buscarOperacionPorModelo({ state, commit, dispatch }, busqueda) {
        commit('limpiarOperaciones');
        if (busqueda == '') {
            dispatch('listarOperaciones');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await operacionService.buscarOperacionesPorModelo(busqueda);
            if (resultados != null) {
                commit('asignarOperacionesBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarOperacion({ commit, getters, dispatch }, estado) {
        commit('limpiarOperacion');
        if (estado.estado) {
            await dispatch('llenarModelos');
            await dispatch('llenarTelas');
            await dispatch('llenarMaquinas');
            if (getters.numeroModelos == 0) {
                dispatch('modalRegistroModelos');
                return false;
            }
            if (getters.numeroTelas == 0) {
                dispatch('modalRegistroTelas');
                return false;
            }
            if (getters.numeroMaquinas == 0) {
                dispatch('modalRegistroMaquinas');
                return false;
            }
        }
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarOperacion({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarModelos');
            await dispatch('llenarTelas');
            await dispatch('llenarMaquinas');
            commit('asignarOperacion', datos.operacion);
        }
        dispatch('llenarFormulario', datos.operacion);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarOperacion({ commit }, datos) {
        if (datos.estado) {
            commit('asignarOperacion', { id: datos.operacion.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleOperacion({ commit }, datos) {
        if (datos.operacion != null) {
            commit('asignarOperacion', datos.operacion);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalRegistroModelos({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'operaciones',
            informacion: 'Es necesario tener al menos un modelo registrado para poder crear una operación.',
            enlace: 'modelos',
            destino: 'Registrar un nuevo modelo'
        }, { root: true });
    },
    modalRegistroTelas({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'operaciones',
            informacion: 'Es necesario tener al menos una tela registrada para poder crear una operación.',
            enlace: 'telas',
            destino: 'Registrar una nueva tela'
        }, { root: true });
    },
    modalRegistroMaquinas({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'operaciones',
            informacion: 'Es necesario tener al menos una maquina registrada para poder crear una operación.',
            enlace: 'maquinas',
            destino: 'Registrar una nueva maquina'
        }, { root: true });
    },
    async llenarFormulario({ commit }, operacion) {
        commit('asignarOperacion', operacion);
    },
    async llenarModelos({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let modelos = await operacionService.obtenerModelos();
        if (modelos != null) {
            for (let modelo of modelos) {
                commit('asignarModelos', { id: modelo.id, nombre: modelo.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async llenarTelas({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let telas = await operacionService.obtenerTelas();
        if (telas != null) {
            for (let tela of telas) {
                commit('asignarTelas', { id: tela.id, nombre: tela.nombre, color: tela.color });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async llenarMaquinas({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let maquinas = await operacionService.obtenerMaquinas();
        if (maquinas != null) {
            for (let maquina of maquinas) {
                commit('asignarMaquinas', { id: maquina.id, nombre: maquina.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarOperacion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando operacion', estado: true }, { root: true });
        commit('asignarTela');
        let operacion = await operacionService.guardarOperacion(state.operacion);
        if (operacion != null) {
            dispatch('listarOperaciones');
            dispatch('general/generarNotificacion', { texto: `La operación ${state.operacion.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar la operación ${state.operacion.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarOperacion');
    },
    async editarOperacion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando operacion', estado: true }, { root: true });
        let operacion = await operacionService.editarOperacion(state.operacion);
        if (operacion != null) {
            dispatch('listarOperaciones');
            commit('general/mostrarNotificacion', { texto: `La operacion ${state.operacion.nombre} se ha editado con éxito.`, estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar la operación ${state.operacion.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        dispatch('general/generarNotificacion', { texto: `La operación ${state.operacion.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarOperacion');
    },
    async borrarOperacion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando operacion', estado: true }, { root: true });
        let respuesta = await operacionService.borrarOperacion(state.operacion.id);
        if (respuesta != null) {
            dispatch('listarOperaciones');
            commit('general/mostrarNotificacion', { texto: `La operación ${state.operacion.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar la operación ${state.operacion.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        dispatch('general/generarNotificacion', { texto: `La operacion ${state.operacion.nombre} se ha borrado con éxito.`, estado: true }, { root: true });
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarOperacion');
    }
};