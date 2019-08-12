import mutations from './mutations';
import { VentaService } from '@/services/VentaService.js';
import { VentaItemService } from '@/services/VentaItemService.js';

const ventaService = new VentaService();
const ventaItemService = new VentaItemService();

export default {
    async listarVentas({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let ventas = await ventaService.obtenerVentas(state.paginacion.registros, state.paginacion.pagina);
        commit('limpiarVentas');
        if (ventas != null) {
            commit('asignarPaginacion', { pagina: ventas.current_page, total: ventas.last_page, registros: state.paginacion.registros });
            for (let venta of ventas.data) {
                commit('asignarVentas', venta);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaVentas({ commit, dispatch }) {
        commit('limpiarVentas');
        dispatch('listarVentas');
    },
    async buscarVenta({ state, commit, dispatch }, busqueda) {
        commit('limpiarVentas');
        if (busqueda == '') {
            dispatch('listarVentas');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await ventaService.buscarVentas(busqueda);
            if (resultados != null) {
                commit('asignarVentasBusqueda', resultados.data);
            } else {
                dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarVenta({ commit, getters, dispatch }, estado) {
        commit('limpiarVenta');
        commit('limpiarItems');
        if (estado.estado) {
            await dispatch('llenarClientes');
            if (getters.numeroClientes == 0) {
                dispatch('modalRegistroClientes');
                return false;
            }
        }
        commit('general/itemLocal', { local: estado.local }, { root: true });
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarVenta({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarClientes');
            commit('asignarVenta', datos.venta);
        }
        dispatch('llenarFormulario', datos.venta);
        commit('general/itemLocal', { local: datos.local }, { root: true });
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarVenta({ commit }, datos) {
        if (datos.estado) {
            commit('asignarVenta', { id: datos.venta.id });
        }
        commit('general/mostrarModalBorrarItem', { estado: datos.local }, { root: true });
        commit('general/itemLocal', { local: datos.local }, { root: true });
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleVenta({ commit }, datos) {
        if (datos.venta != null) {
            commit('asignarVenta', datos.venta);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalImprimirVenta({ commit }, datos) {
        if (datos.venta != null) {
            commit('asignarVenta', datos.venta);
        }
        commit('general/mostrarModalImprimir', { estado: datos.estado }, { root: true });
    },
    modalRegistroClientes({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'facturas de venta',
            informacion: 'Es necesario tener al menos un cliente registrado para poder crear una factura de venta.',
            enlace: 'clientes',
            destino: 'Registrar un nuevo cliente'
        }, { root: true });
    },
    modalRegistroModelos({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'facturas de venta',
            informacion: 'Es necesario tener al menos un modelo registrado, o tenerlo disponible en el inventario, para poder crear una factura de venta.',
            enlace: 'modelos',
            destino: 'Registrar un nuevo modelo'
        }, { root: true });
    },
    async llenarFormulario({ commit }, venta) {
        commit('asignarVenta', venta);
    },
    async llenarClientes({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let clientes = await ventaService.obtenerClientes();
        if (clientes != null) {
            for (let cliente of clientes) {
                commit('asignarClientes', { id: cliente.id, nombre: cliente.nombre + ' ' + cliente.apellido_p + ' ' + cliente.apellido_m });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarVenta({ state, getters, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando venta', estado: true }, { root: true });
        commit('asignarTotal', { local: getters.local });
        let venta = await ventaService.guardarVenta(state.venta);
        if (venta != null) {
            if (getters.local) {
                for (let item of state.itemsVentas) {
                    item.venta_id = venta.id;
                    await dispatch('guardarItem', item);
                }
            }
            dispatch('listarVentas');
            dispatch('general/generarNotificacion', { texto: `La venta ${venta.id} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar la factura de venta. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarVenta');
        commit('limpiarItems');
    },
    async editarVenta({ state, getters, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando venta', estado: true }, { root: true });
        commit('asignarTotal', { local: getters.local });
        let venta = await ventaService.editarVenta(state.venta);
        if (venta != null) {
            for (let item of state.venta.items) {
                if (item.nuevo) {
                    item.venta_id = venta.id;
                    await dispatch('guardarItem', item);
                }
            }
            for (let item of state.itemsBorrados) {
                await dispatch('borrarItem', item);
            }
            dispatch('listarVentas');
            dispatch('general/generarNotificacion', { texto: `La venta ${state.venta.id} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar la factura de venta ${state.venta.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarVenta');
        commit('limpiarItems');
    },
    async borrarVenta({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando venta', estado: true }, { root: true });
        let respuesta = await ventaService.borrarVenta(state.venta.id);
        if (respuesta != null) {
            dispatch('listarVentas');
            dispatch('general/generarNotificacion', { texto: `La venta ${state.venta.venta} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar la factura de venta ${state.venta.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarVenta');
    },


    async modalGuardarItem({ commit, getters, dispatch }, estado) {
        commit('limpiarItem');
        if (estado.estado) {
            await dispatch('llenarModelos');
            if (getters.numeroModelos == 0) {
                dispatch('modalRegistroModelos');
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
            await dispatch('llenarModelos');
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
    async llenarModelos({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let modelos = await ventaItemService.obtenerModelos();
        for (let modelo of modelos) {
            commit('asignarModelos', modelo);
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarItem({ state, getters, commit, dispatch }, itemVenta) {
        commit('general/mostrarCarga', { texto: 'Guardando item', estado: true }, { root: true });
        let item = await ventaItemService.guardarItem(itemVenta);
        if (item != null) {
            if (item.stock <= 10) {
                setTimeout(() => {
                    dispatch('general/generarNotificacion', { texto: `El modelo ${item.nombre} está por agotarse (Quedan ${item.stock} piezas).`, tipo: 'warning', estado: true }, { root: true });
                }, 10000);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar un ítem de la factura de venta. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('limpiarItem');
    },
    async borrarItem({ state, commit, dispatch }, item) {
        commit('general/mostrarCarga', { texto: 'Borrando item', estado: true }, { root: true });
        let respuesta = await ventaItemService.borrarItem(item.id);
        if (resultado == null) {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar un ítem de la factura de venta ${state.venta.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
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