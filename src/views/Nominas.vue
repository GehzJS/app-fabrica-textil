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
import Tabla from '@/components/nominas/Tabla.vue';
import ModalGuardar from '@/components/nominas/ModalGuardar.vue';
import ModalBorrar from '@/components/nominas/ModalBorrar.vue';
import ModalDetalle from '@/components/nominas/ModalDetalle.vue';
import ModalImprimir from '@/components/nominas/ModalImprimir.vue';
import ModalItem from '@/components/nominas/ModalItem.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import ModalRegistro from '@/components/general/ModalRegistro.vue';

export default {
    name: 'Nominas',
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