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
import Tabla from '@/components/proveedores/Tabla.vue';
import ModalGuardar from '@/components/proveedores/ModalGuardar.vue';
import ModalBorrar from '@/components/proveedores/ModalBorrar.vue';
import ModalDetalle from '@/components/proveedores/ModalDetalle.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Proveedores',
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