import mutations from './mutations';
import { NominaService } from '@/services/NominaService.js';
import { NominaItemService } from '@/services/NominaItemService.js';

const nominaService = new NominaService();
const nominaItemService = new NominaItemService();

export default {
    async listarNominas({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let nominas = await nominaService.obtenerNominas(state.paginacion.registros, state.paginacion.pagina, state.estado);
        commit('limpiarNominas');
        if (nominas != null) {
            commit('asignarPaginacion', { pagina: nominas.current_page, total: nominas.last_page, registros: state.paginacion.registros });
            for (let nomina of nominas.data) {
                commit('asignarNominas', nomina);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    cambiarPaginaNominas({ commit, dispatch }) {
        commit('limpiarNominas');
        dispatch('listarNominas');
    },
    async buscarNomina({ state, commit, dispatch }) {
        commit('limpiarNominas');
        if (state.busqueda == '') {
            dispatch('listarNominas');
        } else {
            commit('general/mostrarCargaTabla', { estado: true }, { root: true });
            let resultados = await nominaService.buscarNominas(state.columna, state.busqueda);
            if (resultados != null) {
                commit('asignarNominasBusqueda', resultados.data);
            } else {
                // dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
            }
            commit('general/mostrarCargaTabla', { estado: false }, { root: true });
        }
    },
    async modalGuardarNomina({ commit, getters, dispatch }, estado) {
        commit('limpiarNomina');
        commit('limpiarItems');
        if (estado.estado) {
            await dispatch('llenarEmpleados');
            if (getters.numeroEmpleados == 0) {
                dispatch('modalRegistroEmpleados');
                return false;
            }
        }
        commit('general/itemLocal', { local: estado.local }, { root: true });
        commit('general/mostrarModalGuardar', { estado: estado.estado, boton: true }, { root: true });
    },
    async modalEditarNomina({ commit, dispatch }, datos) {
        if (datos.estado) {
            await dispatch('llenarEmpleados');
            commit('asignarNomina', datos.nomina);
        }
        dispatch('llenarFormulario', datos.nomina);
        commit('general/itemLocal', { local: datos.local }, { root: true });
        commit('general/mostrarModalEditar', { estado: datos.estado, boton: false }, { root: true });
    },
    modalBorrarNomina({ commit }, datos) {
        if (datos.estado) {
            commit('asignarNomina', { id: datos.nomina.id });
        }
        commit('general/mostrarModalBorrarItem', { estado: datos.local }, { root: true });
        commit('general/itemLocal', { local: datos.local }, { root: true });
        commit('general/mostrarModalBorrar', { estado: datos.estado }, { root: true });
    },
    modalDetalleNomina({ commit }, datos) {
        if (datos.nomina != null) {
            commit('asignarNomina', datos.nomina);
        }
        commit('general/mostrarModalDetalle', { estado: datos.estado }, { root: true });
    },
    modalImprimirNomina({ commit }, datos) {
        if (datos.nomina != null) {
            commit('asignarNomina', datos.nomina);
        }
        commit('general/mostrarModalImprimir', { estado: datos.estado }, { root: true });
    },
    modalRegistroEmpleados({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'nóminas',
            informacion: 'Es necesario tener al menos un empleado registrado para poder crear una nómina.',
            enlace: 'empleados',
            destino: 'Registrar un nuevo empleado'
        }, { root: true });
    },
    modalRegistroOperaciones({ commit }) {
        commit('general/mostrarModalRegistro', {
            estado: true,
            tipo: 'nóminas',
            informacion: 'Es necesario tener al menos una operación registrada, o la tela que ésta requiere en el inventario, para poder crear una nómina.',
            enlace: 'operaciones',
            destino: 'Registrar una nueva operación'
        }, { root: true });
    },
    async llenarFormulario({ commit }, nomina) {
        commit('asignarNomina', nomina);
    },
    async llenarEmpleados({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let empleados = await nominaService.obtenerEmpleados();
        if (empleados != null) {
            for (let empleado of empleados) {
                commit('asignarEmpleados', { id: empleado.id, nombre: empleado.nombre + ' ' + empleado.apellido_p + ' ' + empleado.apellido_m });
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarNomina({ state, getters, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Guardando nomina', estado: true }, { root: true });
        commit('asignarTotal', { local: getters.local });
        let nomina = await nominaService.guardarNomina(state.nomina);
        if (nomina != null) {
            if (getters.local) {
                for (let item of state.itemsNominas) {
                    item.nomina_id = nomina.id;
                    await dispatch('guardarItem', item);
                }
            }
            dispatch('listarNominas');
            dispatch('general/generarNotificacion', { texto: `La nómina ${nomina.id} se ha guardado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar la nómina. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarNomina');
        commit('limpiarItems');
    },
    async editarNomina({ state, getters, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Editando nomina', estado: true }, { root: true });
        commit('asignarTotal', { local: getters.local });
        let nomina = await nominaService.editarNomina(state.nomina);
        if (nomina != null) {
            for (let item of state.nomina.items) {
                if (item.nuevo) {
                    item.nomina_id = nomina.id;
                    await dispatch('guardarItem', item);
                }
            }
            for (let item of state.itemsBorrados) {
                await dispatch('borrarItem', item);
            }
            dispatch('listarNominas');
            dispatch('general/generarNotificacion', { texto: `La nómina ${state.nomina.id} se ha editado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar editar la nómina ${state.nomina.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalGuardar', { estado: false, boton: null }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarNomina');
        commit('limpiarItems');
    },
    async borrarNomina({ state, commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Borrando nomina', estado: true }, { root: true });
        let respuesta = await nominaService.borrarNomina(state.nomina.id);
        if (respuesta != null) {
            dispatch('listarNominas');
            dispatch('general/generarNotificacion', { texto: `La nomina ${state.nomina.id} se ha borrado con éxito.`, tipo: 'success', estado: true }, { root: true });
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar la nómina ${state.nomina.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarModalBorrar', { estado: false }, { root: true });
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        commit('limpiarNomina');
    },


    async modalGuardarItem({ commit, getters, dispatch }, estado) {
        commit('limpiarItem');
        if (estado.estado) {
            await dispatch('llenarOperaciones');
            if (getters.numeroOperaciones == 0) {
                dispatch('modalRegistroOperaciones');
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
            await dispatch('llenarOperaciones');
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
    async llenarOperaciones({ commit, dispatch }) {
        commit('general/mostrarCarga', { texto: 'Obteniendo información', estado: true }, { root: true });
        let operaciones = await nominaItemService.obtenerOperaciones();
        if (operaciones != null) {
            for (let operacion of operaciones) {
                commit('asignarOperaciones', operacion);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: 'Ha ocurrido un error al conectarse con la base de datos.', tipo: 'error', estado: true }, { root: true });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },
    async guardarItem({ state, getters, commit, dispatch }, itemNomina) {
        commit('general/mostrarCarga', { texto: 'Guardando item', estado: true }, { root: true });
        let item = await nominaItemService.guardarItem(itemNomina);
        if (item != null) {
            if (item.stock <= 5) {
                setTimeout(() => {
                    dispatch('general/generarNotificacion', { texto: `La tela ${item.nombre} está por agotarse (Quedan ${item.stock} metros).`, tipo: 'warning', estado: true }, { root: true });
                }, 10000);
            }
        } else {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar guardar un ítem de la nómina. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
        commit('limpiarItem');
    },
    async borrarItem({ state, commit, dispatch }, item) {
        commit('general/mostrarCarga', { texto: 'Borrando item', estado: true }, { root: true });
        let respuesta = await nominaItemService.borrarItem(item.id);
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
        if (respuesta == null) {
            dispatch('general/generarNotificacion', { texto: `Ha ocurrido un error al intentar borrar un ítem de la nómina ${state.nomina.id}. Inténtelo nuevamente.`, tipo: 'error', estado: true }, { root: true });
        }
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