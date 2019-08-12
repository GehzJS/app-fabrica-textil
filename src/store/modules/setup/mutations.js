import state from './state';
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    cambiarSetup() {
        state.setup.obligatorio = false;
        state.setup.opcional = true;
    },

    cambiarValor(state, payload) {
        if (payload > 0) {
            state.existe = true;
        } else {
            state.existe = false;
        }
    },

    cambiarPagina(state, payload) {
        if (payload.tipo) {
            state.pagina.obligatorio = payload.pagina;
        } else {
            state.pagina.opcional = payload.pagina;
        }
    },

    mostrarCarga(state, payload) {
        state.carga = payload.estado;
    },

    asignarId(state, payload) {
        state.usuario.empleado_id = payload;
    },

    validarEmpleado(state, payload) {
        state.empleadoValido = payload;
    },

    validarUsuario(state, payload) {
        state.usuarioValido = payload;
    },

    validarCliente(state, payload) {
        state.clienteValido = payload;
    },

    validarProveedor(state, payload) {
        state.proveedorValido = payload;
    },

    validarTela(state, payload) {
        state.telaValida = payload;
    },

    validarModelo(state, payload) {
        state.modeloValido = payload;
    },

    filtrarColor(state) {
        let color = state.tela.color.hex;
        state.tela.color = color;
    }
};