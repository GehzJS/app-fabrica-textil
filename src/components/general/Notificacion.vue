<template>
    <div>
        <v-snackbar right top v-model="notificacion.estado" :timeout="10000" :color="notificacion.tipo" >
            <v-alert prominent :type="notificacion.tipo" class="ma-0 pa-2 pr-5">
                    <v-layout align-center fill-height>
                        <v-flex xs10>
                            <div>
                                <span class="font-weight-light">{{notificacion.texto}}</span>
                            </div>
                        </v-flex>
                        <v-flex xs2>
                            <v-btn icon small @click="mostrarNotificacion({texto: '', color: '', estado: false})"><v-icon>close</v-icon></v-btn>
                        </v-flex>
                    </v-layout>
                </v-alert>
        </v-snackbar>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Notificacion',
    computed: {
        ...mapState('general', {
            notificacion: state => state.notificacion
        })
    },
    methods: {
        ...mapMutations('general', {
            mostrarNotificacion: 'mostrarNotificacion'
        })
    },
}
</script>