<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.registro" persistent max-width="60vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>No puede crear {{modal.tipo}} ahora mismo</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>info</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert text prominent type="info" class="my-2">
                            {{modal.informacion}}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout align-center justify-center fill-height>
                            <v-btn rounded large color="info" @click="redirigir(modal.enlace)">
                                <v-icon left>queue</v-icon>{{modal.destino}}
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ModalRegistro',
    computed: {
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal
        })
    },
    methods: {
        ...mapActions('general', {
            redirigir: 'redirigir'
        })
    },
}
</script>