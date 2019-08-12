<template>
    <v-container>
        <v-card>
            <TablaMaquinas/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import TablaMaquinas from '@/components/extras/Maquinas.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Maquinas',
    components: {
      TablaMaquinas,
      Notificacion,
      Carga
    }
}
</script>