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
import Tabla from '@/components/adquisiciones/Tabla.vue';
import ModalGuardar from '@/components/adquisiciones/ModalGuardar.vue';
import ModalBorrar from '@/components/adquisiciones/ModalBorrar.vue';
import ModalDetalle from '@/components/adquisiciones/ModalDetalle.vue';
import ModalImprimir from '@/components/adquisiciones/ModalImprimir.vue';
import ModalItem from '@/components/adquisiciones/ModalItem.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import ModalRegistro from '@/components/general/ModalRegistro.vue';

export default {
    name: 'Adquisiciones',
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