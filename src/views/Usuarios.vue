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
import Tabla from '@/components/usuarios/Tabla.vue';
import ModalGuardar from '@/components/usuarios/ModalGuardar.vue';
import ModalBorrar from '@/components/usuarios/ModalBorrar.vue';
import ModalDetalle from '@/components/usuarios/ModalDetalle.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import ModalRegistro from '@/components/general/ModalRegistro.vue';

export default {
    name: 'Usuarios',
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