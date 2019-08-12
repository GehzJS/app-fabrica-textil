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
                                        <v-btn icon @click="modalDetalleProveedor({proveedor: null, estado: false})" v-on="on">
                                            <v-icon>chevron_left</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Regresar</span>
                                </v-tooltip>
                            </v-card-title>
                            <v-card-title class="white--text pl-7 pt-12">
                                <div class="display-1 pl-7 pt-12">{{proveedor.nombre}}</div>
                            </v-card-title>
                        </v-layout>
                    </v-img>
                    <v-container fluid>
                        <v-list>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="secondary">person</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Nombre del proveedor: </span>
                                        <span class="text-capitalize">{{proveedor.nombre}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="secondary">people</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Apellido paterno: </span>
                                        <span class="text-capitalize">{{proveedor.apellido_p}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="secondary">people</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Apellido materno: </span>
                                        <span class="text-capitalize">{{proveedor.apellido_m}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="secondary">email</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Correo electrónico: </span>
                                        <span class="text-capitalize">{{proveedor.correo}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="secondary">call</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Teléfono móvil: </span>
                                        <span class="text-capitalize">{{proveedor.telefono}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="secondary">date_range</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Registrado desde: </span>
                                        <span class="text-capitalize">{{proveedor.registro}}</span>
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
import { ProveedorService } from '@/services/ProveedorService.js';

const proveedorService = new ProveedorService();

export default {
    name: 'ModalDetalleProveedores',
    computed: {
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal
        }),
        ...mapState('proveedores', {
            proveedor: state => state.proveedor
        })
    },
    methods: {
        ...mapActions('proveedores', {
            modalDetalleProveedor: 'modalDetalleProveedor'
        })
    },
}
</script>
<style>
.v-sheet {
    width: 100%;
}
</style>