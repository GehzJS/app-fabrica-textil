import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    totalLocal(state) {
        let total = 0;
        for (let item of state.itemsNominas) {
            total += item.precio;
        }
        return total;
    },
    total(state) {
        let total = 0;
        let items = state.nomina.items;
        if (items != undefined) {
            for (let item of items) {
                total += item.precio;
            }
        }
        return total;
    },
    precioItem(state) {
        if (state.item.precio_operacion == undefined || state.item.cantidad == undefined) {
            return 0;
        }
        let precio = 0;
        precio = state.item.precio_operacion * state.item.cantidad;
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
        itemAdquisicion.operacion_id = state.item.id;
        itemAdquisicion.precio = getters.precioItem;
        itemAdquisicion.nomina_id = state.nomina.id;
        return itemAdquisicion;
    },
    numeroRegistros(state) {
        return state.nominas.length;
    },
    numeroEmpleados(state) {
        return state.empleados.length;
    },
    numeroOperaciones(state) {
        return state.operaciones.length;
    },
};