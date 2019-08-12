import state from './state';
import router from "../../../router";
import { updateField } from 'vuex-map-fields';

export default {
    updateField,
    // mostrarMenuLateral(state) {
    //     state.navIzquierda = !state.navIzquierda;
    // },
    // mostrarNotificaciones(state) {
    //     state.navDerecha = !state.navDerecha;
    // },
    // borrarNotificacion(state, index) {
    //     state.notificaciones.splice(index, 1);
    // },
    // borrarNotificaciones(state) {
    //     state.notificaciones = [];
    //     localStorage.removeItem('besa-notificaciones');
    // },
    // leerLocal(state) {
    //     let notificaciones = JSON.parse(localStorage.getItem('besa-notificaciones'));
    //     if (notificaciones !== null) {
    //         for (let notificacion of notificaciones) {
    //             state.notificaciones.push({
    //                 texto: notificacion.texto,
    //                 estado: notificacion.estado,
    //                 fecha: notificacion.fecha
    //             });
    //         }
    //     }
    // },
    redirigir(state, busqueda) {
        if (busqueda != null || busqueda != undefined) {
            // let ruta = busqueda.toString().toLowerCase().replace(/ /g, '-');
            router.push({ name: `${busqueda}` });
        }
    }
};