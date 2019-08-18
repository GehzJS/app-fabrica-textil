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
    asignarVentas(state, payload) {
        state.ventas.push({
            id: payload.id,
            estado: payload.estado,
            total: payload.total,
            descripcion: payload.descripcion,
            cliente_id: payload.cliente_id,
            cliente: payload.cliente.nombre + ' ' + payload.cliente.apellido_p + ' ' + payload.cliente.apellido_m,
            items: payload.items,
            registro: payload.created_at
        });
    },
    asignarVentasBusqueda(state, payload) {
        state.ventas = payload;
    },
    asignarVenta(state, payload) {
        state.venta = payload;
    },
    asignarTotal(state, payload) {
        if (payload.local) {
            state.venta.total = getters.totalLocal(state);
        } else {
            state.venta.total = getters.total(state);
        }
    },
    limpiarVenta(state) {
        state.venta = {};
    },
    limpiarVentas(state) {
        (state.ventas).splice(0, (state.ventas).length);
    },
    asignarClientes(state, payload) {
        state.clientes.push({
            id: payload.id,
            nombre_cliente: payload.nombre
        });
    },


    asignarItems(state, payload) {
        state.items.push({
            id: payload.id,
            cantidad: payload.cantidad,
            precio: payload.precio,
            cliente_id: payload.cliente_id,
            cliente: payload.cliente,
            modelo_id: payload.modelo_id,
            modelo: payload.modelo,
            registro: payload.registro
        });
    },
    guardarItem(state, payload) {
        if (payload.local) {
            state.itemsVentas.push({
                cantidad: state.item.cantidad,
                precio: getters.precioItem(state),
                precio_modelo: state.item.precio_modelo,
                modelo_id: state.item.id,
                modelo: state.item.nombre_modelo
            });
        } else {
            let nuevoItem = {
                cantidad: state.item.cantidad,
                precio: getters.precioItem(state),
                precio_modelo: state.item.precio_modelo,
                modelo_id: state.item.id,
                modelo: state.item.nombre_modelo,
                nuevo: true
            };
            state.venta.items.push(nuevoItem);
        }
    },
    editarItem(state) {
        let indice = state.itemsVentas.indexOf(state.item);
        state.item.precio = getters.precioItem(state);
        Object.assign(state.itemsVentas[indice], state.item);
    },
    borrarItem(state, payload) {
        if (payload.local) {
            let indice = state.itemsVentas.indexOf(state.item);
            state.itemsVentas.splice(indice, 1);
        } else {
            let indice = state.venta.items.indexOf(state.item);
            state.itemsBorrados.push(state.item);
            state.venta.items.splice(indice, 1);
        }
    },
    agregarItemVenta(state, payload) {
        state.venta.items.push(payload);
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
        (state.itemsVentas).splice(0, (state.itemsVentas).length);
        (state.itemsBorrados).splice(0, (state.itemsBorrados).length);
    },
    asignarModelos(state, payload) {
        if (payload.stock) {
            state.modelos.push({
                id: payload.id,
                nombre_modelo: payload.nombre,
                precio_modelo: payload.precio,
                stock_modelo: payload.stock
            });
        }
    }
};