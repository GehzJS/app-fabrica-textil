import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    totalLocal(state) {
        let total = 0;
        for (let item of state.itemsVentas) {
            total += item.precio;
        }
        return total;
    },
    total(state) {
        let total = 0;
        let items = state.venta.items;
        if (items != undefined) {
            for (let item of items) {
                total += item.precio;
            }
        }
        return total;
    },
    precioItem(state) {
        if (state.item.precio_modelo == undefined || state.item.cantidad == undefined) {
            return 0;
        }
        let precio = 0;
        precio = state.item.precio_modelo * state.item.cantidad;
        return precio;
    },
    local(state, getters, rootState) {
        let estado = rootState.general.modal.local;
        if (estado != null || estado != undefined) {
            return estado;
        } else {
            return null;
        }
    },
    itemGuardar(state, getters) {
        let itemAdquisicion = {};
        itemAdquisicion = state.item;
        itemAdquisicion.modelo_id = state.item.id;
        itemAdquisicion.precio = getters.precioItem;
        itemAdquisicion.venta_id = state.venta.id;
        return itemAdquisicion;
    },
    numeroRegistros(state) {
        return state.ventas.length;
    },
    numeroClientes(state) {
        return state.clientes.length;
    },
    numeroModelos(state) {
        return state.modelos.length;
    }
};