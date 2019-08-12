import state from './state';
import getters from './getters';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    asignarPaginacion(state, payload) {
        state.paginacion.pagina = payload.pagina;
        state.paginacion.total = payload.total;
        state.paginacion.registros = payload.registros;
    },
    asignarAdquisiciones(state, payload) {
        state.adquisiciones.push({
            id: payload.id,
            estado: payload.estado,
            total: payload.total,
            descripcion: payload.descripcion,
            proveedor_id: payload.proveedor_id,
            proveedor: payload.proveedor.nombre + ' ' + payload.proveedor.apellido_p + ' ' + payload.proveedor.apellido_m,
            items: payload.items,
            registro: payload.created_at
        });
    },
    asignarAdquisicionesBusqueda(state, payload) {
        state.adquisiciones = payload;
    },
    asignarAdquisicion(state, payload) {
        state.adquisicion = payload;
    },
    asignarTotal(state, payload) {
        if (payload.local) {
            state.adquisicion.total = getters.totalLocal(state);
        } else {
            state.adquisicion.total = getters.total(state);
        }
    },
    limpiarAdquisicion(state) {
        state.adquisicion = {};
    },
    limpiarAdquisiciones(state) {
        (state.adquisiciones).splice(0, (state.adquisiciones).length);
    },
    asignarProveedores(state, payload) {
        state.proveedores.push({
            id: payload.id,
            nombre_proveedor: payload.nombre + ' ' + payload.apellido_p + ' ' + payload.apellido_m
        });
    },


    asignarItems(state, payload) {
        state.items.push({
            id: payload.id,
            cantidad: payload.cantidad,
            precio: payload.precio,
            proveedor_id: payload.proveedor_id,
            proveedor: payload.proveedor,
            tela_id: payload.tela_id,
            tela: payload.tela,
            registro: payload.registro
        });
    },
    guardarItem(state, payload) {
        if (payload.local) {
            state.itemsAdquisiciones.push({
                cantidad: state.item.cantidad,
                precio: getters.precioItem(state),
                precio_tela: state.item.precio_tela,
                tela_id: state.item.id,
                tela: state.item.nombre_tela
            });
        } else {
            let nuevoItem = {
                cantidad: state.item.cantidad,
                precio: getters.precioItem(state),
                precio_tela: state.item.precio_tela,
                tela_id: state.item.id,
                tela: state.item.nombre_tela,
                nuevo: true
            };
            state.adquisicion.items.push(nuevoItem);
        }
    },
    editarItem(state) {
        let indice = state.itemsAdquisiciones.indexOf(state.item);
        state.item.precio = getters.precioItem(state);
        Object.assign(state.itemsAdquisiciones[indice], state.item);
    },
    borrarItem(state, payload) {
        if (payload.local) {
            let indice = state.itemsAdquisiciones.indexOf(state.item);
            state.itemsAdquisiciones.splice(indice, 1);
        } else {
            let indice = state.adquisicion.items.indexOf(state.item);
            state.itemsBorrados.push(state.item);
            state.adquisicion.items.splice(indice, 1);
        }
    },
    agregarItemAdquisicion(state, payload) {
        state.adquisicion.items.push(payload);
    },
    asignarItemsBusqueda(state, payload) {
        state.items = payload;
    },
    asignarItem(state, payload) {
        state.item = payload;
    },
    limpiarItem(state) {
        state.item = {};
    },
    limpiarItems(state) {
        (state.items).splice(0, (state.items).length);
        (state.itemsAdquisiciones).splice(0, (state.itemsAdquisiciones).length);
        (state.itemsBorrados).splice(0, (state.itemsBorrados).length);
    },
    asignarTelas(state, payload) {
        if (payload.stock > 0) {
            state.telas.push({
                id: payload.id,
                nombre_tela: payload.nombre,
                precio_tela: payload.precio,
                stock_tela: payload.stock
            });
        }
    }
};