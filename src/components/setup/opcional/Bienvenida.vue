<template>
    <div>
        <v-card flat class=" pa-0 mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Antes de...</h6>
                    <p class="body-1">Los siguientes pasos  
                        <span class="font-weight-bold">son completamente opcionales</span> 
                    , por lo tanto, si no se posee información acerca de lo requerido para llenar alguno de los formularios se puede omitir el respectivo paso, y realizarse posteriormente el registro en la aplicación.</p><br>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="cambiarPagina({tipo: false, pagina: 2})" class="mb-1"><v-icon left>check_circle</v-icon>Continuar</v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Bienvenida',
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        })
    },
}
</script>