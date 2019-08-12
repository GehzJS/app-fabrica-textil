import mutations from './mutations';
import { AdquisicionService } from '@/services/AdquisicionService.js';
import { AdquisicionItemService } from '@/services/AdquisicionItemService.js';

const adquisicionService = new AdquisicionService();
const adquisicionItemService = new AdquisicionItemService();

export default {
    async listarAdquisiciones({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let adquisiciones = await adquisicionService.obtenerAdquisiciones(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarAdquisiciones');
        if (adquisiciones != null) {
            commit('asignarPaginacion', { pagina: adquisiciones.current_page, total: adquisiciones.last_page, registros: state.paginacion.registros });
            for (let adquisicion of adquisiciones.data) {
                commit('asignarAdquisiciones', adquisicion);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaAdquisiciones({ commit, dispatch }) {
        commit('limpiarAdquisiciones');
        dispatch('listarAdquisiciones');
    },
    async buscarAdquisicion({ state, commit, dispatch }, busqueda) {
        commit('limpiarAdquisiciones');
        if (busqueda == '') {
            dispatch('listarAdquisiciones');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await adquisicionService.buscarAdquisiciones(busqueda);
            if (resultados != null) {
                commit('asignarAdquisicionesBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarAdquisicion({ commit, getters, dispatch }, estado) {
        commit('limpiarAdquisicion');
        commit('limpiarItems');
        if (estado.estado) {
            await dispatch('llenarProveedores');
            if (getters.numeroProveedores == 0) {
                dispatch('modalRegistroProveedores');
                return false;
            }
        }
        commit('general/itemLocal', { local: estado.local }, { root: true });
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarAdquisicion({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarProveedores');
            commit('asignarAdquisicion', datos.adquisicion);
        }
        dispatch('llenarFormulario', datos.adquisicion);
        commit('general/itemLocal', { local: datos.local }, { root: true });
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarAdquisicion({ commit }, datos) {
        if (datos.estado) {
            commit('asignarAdquisicion', { id: datos.adquisicion.id });
        }
        commit('general/mostrarModalBorrarItem', { estado: datos.local }, { root: true });
        commit('general/itemLocal', { local: datos.local }, { root: true });
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleAdquisicion({ commit }, datos) {
        if (datos.adquisicion != null) {
            commit('asignarAdquisicion', datos.adquisicion);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalImprimirAdquisicion({ commit }, datos) {
        if (datos.adquisicion != null) {
            commit('asignarAdquisicion', datos.adquisicion);
        }
        commit('general/mostrarModalImprimir', { estado: datos.estado }, { root: true });
    },
    modalRegistroProveedores({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'facturas de adquisición',
            informacion: 'Es necesario tener al menos un proveedor registrado para poder crear una factura de adquisición.',
            enlace: 'proveedores',
            destino: 'Registrar un nuevo proveedor'
        }, { root: true });
    },
    modalRegistroTelas({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'facturas de adquisición',
            informacion: 'Es necesario tener al menos una tela registrada para poder crear una factura de adquisición.',
            enlace: 'telas',
            destino: 'Registrar una nueva tela'
        }, { root: true });
    },
    async llenarFormulario({ commit }, adquisicion) {
        commit('asignarAdquisicion', adquisicion);
    },
    async llenarProveedores({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let proveedores = await adquisicionService.obtenerProveedores();
        if (proveedores != null) {
            for (let proveedor of proveedores) {
                commit('asignarProveedores', proveedor);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarAdquisicion({ state, getters, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando adquisicion', estado: true }, { root: true });
        commit('asignarTotal', { local: getters.local });
        let adquisicion = await adquisicionService.guardarAdquisicion(state.adquisicion);
        if (adquisicion != null) {
            if (getters.local) {
                for (let item of state.itemsAdquisiciones) {
                    item.adquisicion_id = adquisicion.id;
                    await dispatch('guardarItem', item);
                }
                dispatch('listarAdquisiciones');
                dispatch('general/generarNotificacion', { texto: `La adquisicion ${adquisicion.id} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar la factura de adquisición. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarAdquisicion');
        commit('limpiarItems');
    },
    async editarAdquisicion({ state, getters, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando adquisicion', estado: true }, { root: true });
        commit('asignarTotal', { local: getters.local });
        let adquisicion = await adquisicionService.editarAdquisicion(state.adquisicion);
        if (adquisicion != null) {
            for (let item of state.adquisicion.items) {
                if (item.nuevo) {
                    item.adquisicion_id = adquisicion.id;
                    await dispatch('guardarItem', item);
                }
            }
            for (let item of state.itemsBorrados) {
                await dispatch('borrarItem', item);
            }
            dispatch('listarAdquisiciones');
            dispatch('general/generarNotificacion', { texto: `La adquisicion ${state.adquisicion.id} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar la factura de adquisición ${state.adquisicion.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarAdquisicion');
        commit('limpiarItems');
    },
    async borrarAdquisicion({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando adquisicion', estado: true }, { root: true });
        let respuesta = await adquisicionService.borrarAdquisicion(state.adquisicion.id);
        if (respuesta != null) {
            dispatch('general/generarNotificacion', { texto: `La adquisición ${state.adquisicion.id} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
            dispatch('listarAdquisiciones');
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar la factura de adquisición ${state.adquisicion.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarAdquisicion');
    },


    async modalGuardarItem({ commit, getters, dispatch }, estado) {
        commit('limpiarItem');
        if (estado.estado) {
            await dispatch('llenarTelas');
            if (getters.numeroTelas == 0) {
                dispatch('modalRegistroTelas');
                return false;
            }
        }
        if (estado.local) {
            commit('general/mostrarModalGuardarItem', { estado: estado.estado, boton: true }, { root: true });
        } else {
            commit('general/mostrarModalGuardarItem', { estado: estado.estado, boton: false }, { root: true });
        }
    },
    async modalEditarItem({ commit, dispatch }, datos) {
        commit('limpiarItem');
        if (datos.estado) {
            await dispatch('llenarTelas');
            commit('asignarItem', datos.item);
        }
        commit('general/mostrarModalEditarItem', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarItem({ commit }, datos) {
        if (datos.estado) {
            commit('asignarItem', { id: datos.item.id });
            commit('general/mostrarModalBorrarItem', { estado: datos.estado }, { root: true });
        }
        if (datos.local) {
            commit('general/itemLocal', { local: datos.local }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    async llenarTelas({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let telas = await adquisicionItemService.obtenerTelas();
        if (telas != null) {
            for (let tela of telas) {
                commit('asignarTelas', tela);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarItem({ state, getters, commit, dispatch }, itemAdquisicion) {
        commit('general/mostrarCarga', { texto: 'Guardando item', estado: true }, { root: true });
        let item = await adquisicionItemService.guardarItem(itemAdquisicion);
        if (item == null) {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar un ítem de la factura de adquisición. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('limpiarItem');
    },
    async borrarItem({ state, commit, dispatch }, item) {
        commit('general/mostrarCarga', { texto: 'Borrando item', estado: true }, { root: true });
        let respuesta = await adquisicionItemService.borrarItem(item.id);
        if (item == null) {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar un ítem de la factura de adquisición ${state.adquisicion.id}. Inténtelo nuevamente.`, estado: false }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarItem');
    },
    guardarRegistroItem({ state, getters, commit }) {
        commit('guardarItem', { local: getters.local });
        if (getters.local) {
            commit('general/mostrarModalGuardarItem', { estado: false, boton: true }, { root: true });
        } else {
            commit('general/mostrarModalGuardarItem', { estado: false, boton: false }, { root: true });
        }
    },
    borrarRegistroItem({ commit, getters }) {
        commit('borrarItem', { local: getters.local });
        commit('general/mostrarModalBorrarItem', { estado: false }, { root: true });
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
    }
};