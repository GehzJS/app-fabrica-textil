<template>
    <v-container>
        <v-card>
            <TablaSecciones/>
        </v-card>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import TablaSecciones from '@/components/extras/Secciones.vue';
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Secciones',
    components: {
      TablaSecciones,
      Notificacion,
      Carga
    }
}
</script>