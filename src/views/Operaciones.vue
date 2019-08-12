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
import Tabla from '@/components/operaciones/Tabla.vue';
import ModalGuardar from '@/components/operaciones/ModalGuardar.vue';
import ModalBorrar from '@/components/operaciones/ModalBorrar.vue';
import ModalDetalle from '@/components/operaciones/ModalDetalle.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import ModalRegistro from '@/components/general/ModalRegistro.vue';

export default {
    name: 'Operaciones',
    components: {
      Tabla,
      ModalGuardar,
      ModalBorrar,
      ModalDetalle,
      Notificacion,
      Carga,
      ModalRegistro
    }
}
</script>