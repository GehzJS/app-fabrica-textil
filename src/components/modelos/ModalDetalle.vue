<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.detalle" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card class="mx-auto">
                    <v-img src="../../assets/portadas/modelos.png" height="300px">
                        <v-layout column fill-height>
                            <v-card-title>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark color="grey darken-4" @click="modalDetalleModelo({modelo: null, estado: false})" v-on="on">
                                            <v-icon>chevron_left</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Regresar</span>
                                </v-tooltip>
                            </v-card-title>
                        </v-layout>
                    </v-img>
                    <v-container fluid>
                        <v-list>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">shopping_basket</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Nombre del modelo: </span>
                                        <span class="text-capitalize">{{modelo.nombre}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">bookmark</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Tipo de modelo: </span>
                                        <span class="text-capitalize">{{modelo.tipo}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">dashboard</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Talla del modelo: </span>
                                        <span class="text-capitalize">{{modelo.talla}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">assignment</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Descripción del modelo: </span>
                                        <span class="text-capitalize">{{modelo.descripcion}}</span>
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
                                        <span class="text-capitalize">{{modelo.registro}}</span>
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
    name: 'ModalDetalleModelos',
    computed: {
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('modelos', {
            modelo: state => state.modelo
        })
    },
    methods: {
        ...mapActions('modelos', {
            modalDetalleModelo: 'modalDetalleModelo'
        })
    },
}
</script>
<style>
.v-sheet {
    width: 100%;
}
</style>