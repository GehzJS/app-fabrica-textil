<template>
    <v-container>
        <v-card>
            <Tabla/>
            <ModalGuardar/>
            <ModalBorrar/>
            <ModalDetalle/>
            <ModalRegistro/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import Tabla from '@/components/telas/Tabla.vue';
import ModalGuardar from '@/components/telas/ModalGuardar.vue';
import ModalBorrar from '@/components/telas/ModalBorrar.vue';
import ModalDetalle from '@/components/telas/ModalDetalle.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import ModalRegistro from '@/components/general/ModalRegistro.vue';

export default {
    name: 'Telas',
    components: {
      Tabla,
      ModalGuardar,
      ModalBorrar,
      ModalDetalle,
      ModalRegistro,
      Notificacion,
      Carga
    }
}
</script>