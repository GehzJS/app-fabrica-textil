<template>
    <v-container fill-height grid-list-md>
        <v-layout align-center justify-center wrap>
            <v-flex xs2 v-for="seccion in seccionesBusqueda" :key="seccion.nombre">
                <v-card outlined class="text-center" :to="seccion.enlace">
                    <v-card-text>
                        <v-icon color="info" class="mb-2">{{seccion.icono}}</v-icon><br>
                        <span class="body-2 text-uppercase">{{seccion.titulo}}</span>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Inicio',
    computed: {
      ...mapState('general', {
        tema: 'tema',
        secciones: 'secciones',
        seccionesBusqueda: 'seccionesBusqueda'
      })
    }
}
</script>