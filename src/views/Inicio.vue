<template>
    <v-container fill-height grid-list-md>
        <v-layout align-center justify-center wrap>
            <v-flex xs12>
                <v-tabs grow icons-and-text slider-color="pink lighten-1">
                    <v-tab v-for="(seccion, index) in secciones" :key="index" :href="`#tab-${index}`">
                        {{seccion.titulo}}
                        <v-icon>{{seccion.icono}}</v-icon>
                    </v-tab>
                    <v-tab-item v-for="(seccion, index) in secciones" :key="index" :value="`tab-${index}`" style="height:65vh;overflow-y:scroll;">
                        <v-container fluid fill-height list-grid-md>
                            <v-layout align-center justify-start wrap>
                                <v-flex xs6 md2 v-for="(seccions, indexs) in secciones[index].items" :key="indexs" to="/">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-card class="mx-auto px-2" width="100%">
                                                <v-img src="../assets/logo.png"></v-img>
                                                    <v-card-text>
                                                        <h2 class="caption font-weight-bold text-uppercase text-truncate text-center">{{seccions.titulo}}</h2>
                                                    </v-card-text>
                                                <v-fade-transition>
                                                <v-overlay v-if="hover" absolute color="#000">
                                                    <v-layout align-center justify-center column>
                                                        <v-flex xs12>
                                                            <v-btn rounded color="primary"><v-icon left>link</v-icon>Ir a...</v-btn>
                                                        </v-flex>
                                                        <!-- <v-flex xs12>
                                                            <span class="caption font-weight-bold text-uppercase text-truncate text-center">{{seccions.titulo}}</span>
                                                        </v-flex> -->
                                                    </v-layout>
                                                </v-overlay>
                                                </v-fade-transition>
                                            </v-card>
                                        </template>
                                    </v-hover>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-tab-item>
                </v-tabs>
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