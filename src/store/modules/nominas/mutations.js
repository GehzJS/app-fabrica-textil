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
    asignarNominas(state, payload) {
        state.nominas.push({
            id: payload.id,
            estado: payload.estado,
            total: payload.total,
            descripcion: payload.descripcion,
            empleado_id: payload.empleado_id,
            empleado: payload.empleado.nombre + ' ' + payload.empleado.apellido_p + ' ' + payload.empleado.apellido_m,
            items: payload.items,
            registro: payload.created_at
        });
    },
    asignarNominasBusqueda(state, payload) {
        state.nominas = payload;
    },
    asignarNomina(state, payload) {
        state.nomina = payload;
    },
    asignarTotal(state, payload) {
        if (payload.local) {
            state.nomina.total = getters.totalLocal(state);
        } else {
            state.nomina.total = getters.total(state);
        }
    },
    limpiarNomina(state) {
        state.nomina = {};
    },
    limpiarNominas(state) {
        (state.nominas).splice(0, (state.nominas).length);
    },
    asignarEmpleados(state, payload) {
        state.empleados.push({
            id: payload.id,
            nombre_empleado: payload.nombre
        });
    },


    asignarItems(state, payload) {
        state.items.push({
            id: payload.id,
            cantidad: payload.cantidad,
            precio: payload.precio,
            empleado_id: payload.empleado_id,
            empleado: payload.empleado,
            operacion_id: payload.operacion_id,
            operacion: payload.operacion,
            registro: payload.registro
        });
    },
    guardarItem(state, payload) {
        if (payload.local) {
            state.itemsNominas.push({
                cantidad: state.item.cantidad,
                precio: getters.precioItem(state),
                precio_operacion: state.item.precio_operacion,
                operacion_id: state.item.id,
                operacion: state.item.nombre_operacion
            });
        } else {
            let nuevoItem = {
                cantidad: state.item.cantidad,
                precio: getters.precioItem(state),
                precio_operacion: state.item.precio_operacion,
                operacion_id: state.item.id,
                operacion: state.item.nombre_operacion,
                nuevo: true
            };
            state.nomina.items.push(nuevoItem);
        }
    },
    editarItem(state) {
        let indice = state.itemsNominas.indexOf(state.item);
        state.item.precio = getters.precioItem(state);
        Object.assign(state.itemsNominas[indice], state.item);
    },
    borrarItem(state, payload) {
        if (payload.local) {
            let indice = state.itemsNominas.indexOf(state.item);
            state.itemsNominas.splice(indice, 1);
        } else {
            let indice = state.nomina.items.indexOf(state.item);
            state.itemsBorrados.push(state.item);
            state.nomina.items.splice(indice, 1);
        }
    },
    agregarItemNomina(state, payload) {
        state.nomina.items.push(payload);
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
        (state.itemsNominas).splice(0, (state.itemsNominas).length);
        (state.itemsBorrados).splice(0, (state.itemsBorrados).length);
    },
    asignarOperaciones(state, payload) {
        state.operaciones.push({
            id: payload.id,
            nombre_operacion: payload.nombre,
            precio_operacion: payload.precio,
            necesario_operacion: payload.necesario,
            stock_tela: Math.round((payload.tela.stock * 100 / payload.necesario) * 100) / 100
        });
    }
};