<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.borrar" persistent max-width="60vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>¿Está seguro que desea eliminar a éste nomina?</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>help</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert text prominent type="warning" class="my-2">
                            Al realizar esta acción, ¡Este registro se eliminará de la base de datos!
                        </v-alert>
                    </v-card-text>
                    <v-card-actions v-if="modal.local == false">
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-3" @click="borrarNomina" v-if="modal.item == false">
                            <v-icon left>delete</v-icon>Borrar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-3" @click="borrarRegistroItem" v-if="modal.item == true">
                            <v-icon left>delete</v-icon>Borrar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-3" @click="modalBorrarNomina({estado: false})" v-if="modal.item == false">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-3" @click="modalBorrarItem({estado: false})" v-if="modal.item == true">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="modal.local == true">
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-3" @click="borrarRegistroItem">
                            <v-icon left>delete</v-icon>Borrar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-3" @click="modalBorrarItem({estado: false})">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'ModalBorrarNominas',
    computed: {
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('nominas', {
            nomina: state => state.nomina
        })
    },
    methods: {
        ...mapActions('nominas', {
            modalBorrarNomina: 'modalBorrarNomina',
            borrarNomina: 'borrarNomina',
            modalBorrarItem: 'modalBorrarItem',
            borrarRegistroItem: 'borrarRegistroItem'
        })
    },
}
</script>