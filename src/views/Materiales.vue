<template>
    <v-container>
        <v-card>
            <TablaMateriales/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import TablaMateriales from '@/components/extras/Materiales.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Materiales',
    components: {
      TablaMateriales,
      Notificacion,
      Carga
    }
}
</script>