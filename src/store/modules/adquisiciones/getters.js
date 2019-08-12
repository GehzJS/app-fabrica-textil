import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    totalLocal(state) {
        let total = 0;
        for (let item of state.itemsAdquisiciones) {
            total += item.precio;
        }
        return total;
    },
    total(state) {
        let total = 0;
        let items = state.adquisicion.items;
        if (items != undefined) {
            for (let item of items) {
                total += item.precio;
            }
        }
        return total;
    },
    precioItem(state) {
        if (state.item.precio_tela == undefined || state.item.cantidad == undefined) {
            return 0;
        }
        let precio = 0;
        precio = state.item.precio_tela * state.item.cantidad;
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
        itemAdquisicion.tela_id = state.item.id;
        itemAdquisicion.precio = getters.precioItem;
        itemAdquisicion.adquisicion_id = state.adquisicion.id;
        return itemAdquisicion;
    },
    numeroRegistros(state) {
        return state.adquisiciones.length;
    },
    numeroProveedores(state) {
        return state.proveedores.length;
    },
    numeroTelas(state) {
        return state.telas.length;
    }
};