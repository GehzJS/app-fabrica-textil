import state from './state';
import { getField } from 'vuex-map-fields';

export default {
    getField,
    generarFecha(state) {
        let fecha = new Date();
        let dia = String(fecha.getDate()).padStart(2, '0');
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let anio = fecha.getFullYear();
        let hora = String(fecha.getHours()).padStart(2, '0');
        let minutos = String(fecha.getMinutes()).padStart(2, '0');
        fecha = dia + '/' + mes + '/' + anio + ' - ' + hora + ':' + minutos;
        return fecha;
    },
    total(state) {
        return state.notificaciones.length;
    }
};