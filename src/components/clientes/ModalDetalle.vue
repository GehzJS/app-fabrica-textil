<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.detalle" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card class="mx-auto">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px">
                        <v-layout column fill-height>
                            <v-card-title>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon @click="modalDetalleCliente({cliente: null, estado: false})" v-on="on">
                                            <v-icon>chevron_left</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Regresar</span>
                                </v-tooltip>
                            </v-card-title>
                            <v-card-title class="white--text pl-7 pt-12">
                                <div class="display-1 pl-7 pt-12">{{cliente.cliente}}</div>
                            </v-card-title>
                        </v-layout>
                    </v-img>
                    <v-container fluid>
                        <v-list>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">person</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Nombre del cliente: </span>
                                        <span class="text-capitalize">{{cliente.nombre}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">people</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Apellido paterno: </span>
                                        <span class="text-capitalize">{{cliente.apellido_p}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">people</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Apellido materno: </span>
                                        <span class="text-capitalize">{{cliente.apellido_m}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">email</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Correo electrónico: </span>
                                        <span class="text-capitalize">{{cliente.correo}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">call</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Teléfono móvil: </span>
                                        <span class="text-capitalize">{{cliente.telefono}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">date_range</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Registrado desde: </span>
                                        <span class="text-capitalize">{{cliente.registro}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'ModalDetalleClientes',
    computed: {
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('clientes', {
            cliente: state => state.cliente
        })
    },
    methods: {
        ...mapActions('clientes', {
            modalDetalleCliente: 'modalDetalleCliente'
        })
    },
}
</script>
<style>
.v-sheet {
    width: 100%;
}
</style>