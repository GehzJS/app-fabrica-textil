<template>
    <v-container>
        <v-card>
            <TablaTallas/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import TablaTallas from '@/components/extras/Tallas.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Tallas',
    components: {
      TablaTallas,
      Notificacion,
      Carga
    }
}
</script>