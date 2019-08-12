import state from './state';
import router from "../../../router";

export default {
    cambiarTema(state) {
        state.tema = !state.tema;
        localStorage.setItem('besa-config', JSON.stringify(state.tema));
    },
    // generarFecha(state) {
    //     let fecha = new Date();
    //     let fechaGenerada = fecha.getDay() + '/' + fecha.getMonth() + '/' + fecha.getFullYear() + ' - ' + fecha.getHours() + ':' + fecha.getMinutes();
    //     state.fecha = fechaGenerada;
    // },
    guardarNotificacion(state, payload) {
        state.notificaciones.push({
            texto: payload.texto,
            tipo: payload.tipo,
            estado: payload.estado,
            fecha: payload.fecha
        });
    },
    borrarNotificacion(state, index) {
        state.notificaciones.splice(index, 1);
    },
    borrarNotificaciones(state) {
        state.notificaciones = [];
        localStorage.removeItem('besa-notificaciones');
    },
    guardarLocal(state) {
        localStorage.setItem('besa-notificaciones', JSON.stringify(state.notificaciones));
    },
    ocultarNavegacion(state) {
        state.navegacion = false;
    },
    mostrarNavegacion(state) {
        router.push('/inicio');
        state.navegacion = true;
    },
    mostrarNotificacion(state, payload) {
        state.notificacion.texto = payload.texto;
        state.notificacion.tipo = payload.tipo;
        state.notificacion.estado = payload.estado;
    },
    mostrarModalGuardar(state, payload) {
        state.modal.boton = payload.boton;
        state.modal.guardar = payload.estado;
    },
    mostrarModalEditar(state, payload) {
        state.modal.boton = payload.boton;
        state.modal.guardar = payload.estado;
    },
    mostrarModalBorrar(state, payload) {
        state.modal.borrar = payload.estado;
    },
    mostrarModalDetalle(state, payload) {
        state.modal.detalle = payload.estado;
    },
    mostrarModalImprimir(state, payload) {
        state.modal.imprimir = payload.estado;
    },
    mostrarModalRegistro(state, payload) {
        state.modal.registro = payload.estado;
        state.modal.tipo = payload.tipo;
        state.modal.informacion = payload.informacion;
        state.modal.enlace = payload.enlace;
        state.modal.destino = payload.destino;
    },
    mostrarModalGuardarItem(state, payload) {
        state.modal.boton = payload.boton;
        state.modal.items = payload.estado;
    },
    mostrarModalEditarItem(state, payload) {
        state.modal.boton = payload.boton;
        state.modal.items = payload.estado;
    },
    mostrarModalBorrarItem(state, payload) {
        state.modal.item = payload.estado;
    },
    itemLocal(state, payload) {
        state.modal.local = payload.local;
    },
    mostrarCarga(state, payload) {
        state.carga.texto = payload.texto;
        state.carga.estado = payload.estado;
    },
    mostrarCargaTabla(state, payload) {
        state.cargandoTabla = payload.estado;
    },
    leerSecciones(state) {
        for (let index = 0; index < state.secciones.length; index++) {
            for (let seccion of state.secciones[index].items) {
                state.seccionesBusqueda.push({
                    titulo: seccion.titulo,
                    icono: seccion.icono,
                    enlace: seccion.enlace
                });
                state.titulos.push((seccion.titulo).toString());
            }
        }
    },
    leerLocal(state) {
        let notificaciones = JSON.parse(localStorage.getItem('besa-notificaciones'));
        if (notificaciones !== null) {
            state.notificaciones = [];
            for (let notificacion of notificaciones) {
                state.notificaciones.push({
                    texto: notificacion.texto,
                    tipo: notificacion.tipo,
                    fecha: notificacion.fecha
                });
            }
        }
    },
};