import mutations from './mutations';
import { TelaService } from '@/services/TelaService.js';

const telaService = new TelaService();

export default {
    async listarTelas({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let telas = await telaService.obtenerTelas(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarTelas');
        if (telas != null) {
            commit('asignarPaginacion', { pagina: telas.current_page, total: telas.last_page, registros: state.paginacion.registros });
            for (let tela of telas.data) {
                commit('asignarTelas', tela);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaTelas({ commit, dispatch }) {
        commit('limpiarTelas');
        dispatch('listarTelas');
    },
    async buscarTela({ state, commit, dispatch }, busqueda) {
        commit('limpiarTelas');
        if (busqueda == '') {
            dispatch('listarTelas');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await telaService.buscarTelas(busqueda);
            if (resultados != null) {
                commit('asignarTelasBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarTela({ commit, getters, dispatch }, estado) {
        commit('limpiarTela');
        if (estado.estado) {
            await dispatch('llenarSecciones');
            if (getters.numeroSecciones == 0) {
                dispatch('modalRegistroSecciones');
                return false;
            }
        }
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarTela({ commit, dispatch }, datos) {
        if (estado.estado) {
            await dispatch('llenarSecciones');
            if (getters.numeroSecciones == 0) {
                dispatch('modalRegistroSecciones');
                return false;
            }
            commit('asignarTela', datos.tela);
        }
        dispatch('llenarFormulario', datos.tela);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarTela({ commit }, datos) {
        if (datos.estado) {
            commit('asignarTela', { id: datos.tela.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleTela({ commit }, datos) {
        if (datos.tela != null) {
            commit('asignarTela', datos.tela);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalRegistroSecciones({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'telas',
            informacion: 'Es necesario tener al menos una sección registrada para poder crear una tela.',
            enlace: 'secciones',
            destino: 'Registrar una nueva sección'
        }, { root: true });
    },
    async llenarFormulario({ commit }, tela) {
        commit('asignarTela', tela);
    },
    async llenarSecciones({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let secciones = await telaService.obtenerSecciones();
        if (secciones != null) {
            for (let seccion of secciones) {
                commit('asignarSecciones', { id: seccion.id, nombre: seccion.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarTela({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando tela', estado: true }, { root: true });
        commit('filtrarColor');
        let tela = await telaService.guardarTela(state.tela);
        if (tela != null) {
            dispatch('listarTelas');
            dispatch('general/generarNotificacion', { texto: `La tela ${state.tela.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar la tela ${state.tela.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarTela');
    },
    async editarTela({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando tela', estado: true }, { root: true });
        let tela = await telaService.editarTela(state.tela);
        if (tela != null) {
            dispatch('listarTelas');
            dispatch('general/generarNotificacion', { texto: `La tela ${state.tela.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar la tela ${state.tela.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarTela');
    },
    async borrarTela({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando tela', estado: true }, { root: true });
        let respuesta = await telaService.borrarTela(state.tela.id);
        if (respuesta != null) {
            dispatch('listarTelas');
            dispatch('general/generarNotificacion', { texto: `La tela ${state.tela.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar la tela ${state.tela.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarTela');
    }
};