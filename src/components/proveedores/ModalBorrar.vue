<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.borrar" persistent max-width="60vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>¿Está seguro que desea eliminar a éste proveedor?</v-toolbar-title>
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
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-3" @click="borrarProveedor">
                            <v-icon left>delete</v-icon>Borrar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-3" @click="modalBorrarProveedor({estado: false})">
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
    name: 'ModalBorrarProveedores',
    computed: {
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('proveedores', {
            proveedor: state => state.proveedor
        })
    },
    methods: {
        ...mapActions('proveedores', {
            modalBorrarProveedor: 'modalBorrarProveedor',
            borrarProveedor: 'borrarProveedor'
        })
    },
}
</script>