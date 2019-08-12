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
import Tabla from '@/components/empleados/Tabla.vue';
import ModalGuardar from '@/components/empleados/ModalGuardar.vue';
import ModalBorrar from '@/components/empleados/ModalBorrar.vue';
import ModalDetalle from '@/components/empleados/ModalDetalle.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Empleados',
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