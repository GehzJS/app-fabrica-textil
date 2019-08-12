<template>
    <v-container>
        <v-card>
            <TablaTipos/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import TablaTipos from '@/components/extras/Tipos.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Tipos',
    components: {
      TablaTipos,
      Notificacion,
      Carga
    }
}
</script>