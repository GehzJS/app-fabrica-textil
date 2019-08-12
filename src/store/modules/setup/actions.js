import mutations from './mutations';
import { SetupService } from '@/services/SetupService.js';

const setupService = new SetupService();

export default {
    async contarRegistros({ commit }) {
        commit('mostrarCarga', { estado: true });
        let existe = await setupService.contarEmpleados();
        if (existe != null) {
            commit('cambiarValor', existe);
            commit('mostrarCarga', { estado: false });
        }
    },

    async guardarEmpleado({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando empleado', estado: true }, { root: true });
        let empleado = await setupService.guardarEmpleado(state.empleado);
        if (empleado != null) {
            commit('asignarId', empleado.id);
            commit('cambiarPagina', { tipo: true, pagina: 3 });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarUsuario({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando usuario', estado: true }, { root: true });
        let usuario = await setupService.guardarUsuario(state.usuario);
        if (usuario != null) {
            commit('cambiarPagina', { tipo: true, pagina: 4 });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarCliente({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando usuario', estado: true }, { root: true });
        let cliente = await setupService.guardarCliente(state.cliente);
        if (cliente != null) {
            commit('cambiarPagina', { tipo: false, pagina: 3 });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarProveedor({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando proveedor', estado: true }, { root: true });
        let proveedor = await setupService.guardarProveedor(state.proveedor);
        if (proveedor != null) {
            commit('cambiarPagina', { tipo: false, pagina: 4 });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarTela({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando tela', estado: true }, { root: true });
        commit('filtrarColor');
        let tela = await setupService.guardarTela(state.tela);
        if (tela != null) {
            commit('cambiarPagina', { tipo: false, pagina: 6 });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarModelo({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando modelo', estado: true }, { root: true });
        let modelo = await setupService.guardarModelo(state.modelo);
        if (modelo != null) {
            commit('cambiarPagina', { tipo: false, pagina: 7 });
        }
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarSeccion({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando sección', estado: true }, { root: true });
        let seccion = await setupService.guardarSeccion(state.tela.seccion);
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarTalla({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando talla', estado: true }, { root: true });
        let talla = await setupService.guardarTalla(state.modelo.talla);
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarTipo({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando tipo', estado: true }, { root: true });
        let tipo = await setupService.guardarTipo(state.modelo.tipo);
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    },

    async guardarMaterial({ state, commit }) {
        commit('general/mostrarCarga', { texto: 'Guardando material', estado: true }, { root: true });
        let material = await setupService.guardarMaterial(state.modelo.material);
        commit('general/mostrarCarga', { texto: '', estado: false }, { root: true });
    }
};