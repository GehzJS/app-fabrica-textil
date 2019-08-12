<template>
    <v-container>
        <v-card>
            <Tabla/>
            <ModalGuardar/>
            <ModalBorrar/>
            <ModalDetalle/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import Tabla from '@/components/clientes/Tabla.vue';
import ModalGuardar from '@/components/clientes/ModalGuardar.vue';
import ModalBorrar from '@/components/clientes/ModalBorrar.vue';
import ModalDetalle from '@/components/clientes/ModalDetalle.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Clientes',
    components: {
      Tabla,
      ModalGuardar,
      ModalBorrar,
      ModalDetalle,
      Notificacion,
      Carga
    }
}
</script>