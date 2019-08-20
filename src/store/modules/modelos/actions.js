import mutations from './mutations';
import { ModeloService } from '@/services/ModeloService.js';

const modeloService = new ModeloService();

export default {
    async listarModelos({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let modelos = await modeloService.obtenerModelos(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarModelos');
        if (modelos != null) {
            commit('asignarPaginacion', { pagina: modelos.current_page, total: modelos.last_page, registros: state.paginacion.registros });
            for (let modelo of modelos.data) {
                commit('asignarModelos', modelo);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaModelos({ commit, dispatch }) {
        commit('limpiarModelos');
        dispatch('listarModelos');
    },
    async buscarModelo({ state, commit, dispatch }) {
        commit('limpiarModelos');
        if (state.busqueda == '') {
            dispatch('listarModelos');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await modeloService.buscarModelos(state.columna, state.busqueda);
            if (resultados != null) {
                commit('asignarModelosBusqueda', resultados.data);
            } else {
                // dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarModelo({ commit, getters, dispatch }, estado) {
        commit('limpiarModelo');
        if (estado.estado) {
            await dispatch('llenarMateriales');
            await dispatch('llenarTallas');
            await dispatch('llenarTipos');
            if (getters.numeroMateriales == 0) {
                dispatch('modalRegistroMateriales');
                return false;
            }
            if (getters.numeroTallas == 0) {
                dispatch('modalRegistroTallas');
                return false;
            }
            if (getters.numeroTipos == 0) {
                dispatch('modalRegistroTipos');
                return false;
            }
        }
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarModelo({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarMateriales');
            await dispatch('llenarTallas');
            await dispatch('llenarTipos');
            commit('asignarModelo', datos.modelo);
        }
        dispatch('llenarFormulario', datos.modelo);
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarModelo({ commit }, datos) {
        if (datos.estado) {
            commit('asignarModelo', { id: datos.modelo.id });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleModelo({ commit }, datos) {
        if (datos.modelo != null) {
            commit('asignarModelo', datos.modelo);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalRegistroMateriales({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'modelos',
            informacion: 'Es necesario tener al menos un material registrado para poder crear un modelo.',
            enlace: 'materiales',
            destino: 'Registrar un nuevo material'
        }, { root: true });
    },
    modalRegistroTallas({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'modelos',
            informacion: 'Es necesario tener al menos una talla registrada para poder crear un modelo.',
            enlace: 'tallas',
            destino: 'Registrar una nueva talla'
        }, { root: true });
    },
    modalRegistroTipos({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'modelos',
            informacion: 'Es necesario tener al menos un tipo registrado para poder crear un modelo.',
            enlace: 'tipos',
            destino: 'Registrar un nuevo tipo'
        }, { root: true });
    },
    async llenarFormulario({ commit }, modelo) {
        commit('asignarModelo', modelo);
    },
    async llenarMateriales({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let materiales = await modeloService.obtenerMateriales();
        if (materiales != null) {
            for (let material of materiales) {
                commit('asignarMateriales', { nombre: material.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async llenarTallas({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let tallas = await modeloService.obtenerTallas();
        if (tallas != null) {
            for (let talla of tallas) {
                commit('asignarTallas', { nombre: talla.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async llenarTipos({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let tipos = await modeloService.obtenerTipos();
        if (tipos != null) {
            for (let tipo of tipos) {
                commit('asignarTipos', { nombre: tipo.nombre });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarModelo({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando modelo', estado: true }, { root: true });
        let modelo = await modeloService.guardarModelo(state.modelo);
        if (modelo != null) {
            dispatch('listarModelos');
            dispatch('general/generarNotificacion', { texto: `El modelo ${state.modelo.nombre} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar el modelo ${state.modelo.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarModelo');
    },
    async editarModelo({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando modelo', estado: true }, { root: true });
        let modelo = await modeloService.editarModelo(state.modelo);
        if (modelo != null) {
            dispatch('listarModelos');
            dispatch('general/generarNotificacion', { texto: `El modelo ${state.modelo.nombre} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar el modelo ${state.modelo.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarModelo');
    },
    async borrarModelo({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando modelo', estado: true }, { root: true });
        let respuesta = await modeloService.borrarModelo(state.modelo.id);
        if (respuesta != null) {
            dispatch('listarModelos');
            dispatch('general/generarNotificacion', { texto: `El modelo ${state.modelo.nombre} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar el modelo ${state.modelo.nombre}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarModelo');
    }
};