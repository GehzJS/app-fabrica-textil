<template>
    <v-container>
        <v-card>
            <Tabla/>
            <ModalGuardar/>
            <ModalBorrar/>
            <ModalDetalle/>
            <ModalImprimir/>
            <ModalItem/>
            <ModalRegistro/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import Tabla from '@/components/ventas/Tabla.vue';
import ModalGuardar from '@/components/ventas/ModalGuardar.vue';
import ModalBorrar from '@/components/ventas/ModalBorrar.vue';
import ModalDetalle from '@/components/ventas/ModalDetalle.vue';
import ModalImprimir from '@/components/ventas/ModalImprimir.vue';
import ModalItem from '@/components/ventas/ModalItem.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import ModalRegistro from '@/components/general/ModalRegistro.vue';

export default {
    name: 'Ventas',
    components: {
      Tabla,
      ModalGuardar,
      ModalBorrar,
      ModalDetalle,
      ModalImprimir,
      ModalItem,
      Notificacion,
      Carga,
      ModalRegistro
    }
}
</script>