<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.detalle" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card class="mx-auto">
                    <v-img src="../../assets/portadas/nominas.png" height="300px">
                        <v-layout column fill-height>
                            <v-card-title>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark color="grey darken-4" @click="modalDetalleNomina({nomina: null, estado: false})" v-on="on">
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
                                    <v-icon color="error">how_to_reg</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Nombre del empleado: </span>
                                        <span class="text-capitalize">{{nomina.empleado}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">assignment_late</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Estado de la nómina: </span>
                                        <span class="text-capitalize">{{nomina.estado}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">euro_symbol</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Precio total de la nómina: </span>
                                        <span class="text-capitalize">{{nomina.total}}</span>
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
                                        <span class="font-weight-bold">Descripción de la nómina: </span>
                                        <span class="text-capitalize">{{nomina.descripcion}}</span>
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
                                        <span class="font-weight-bold">Registrada desde: </span>
                                        <span class="text-capitalize">{{nomina.registro}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">vertical_split</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Operaciones realizadas: </span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-content>
                                    <template>
                                        <v-container>
                                            <v-simple-table fixed-header max-height="300px">
                                                <thead>
                                                    <tr>
                                                        <th class="text-left">Operación</th>
                                                        <th class="text-left">Cantidad</th>
                                                        <th class="text-left">Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in nomina.items" :key="item.id">
                                                        <td>{{ item.operacion }}</td>
                                                        <td>{{ item.cantidad }}</td>
                                                        <td>{{ item.precio }}</td>
                                                    </tr>
                                                </tbody>
                                            </v-simple-table>
                                        </v-container>
                                    </template>
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
    name: 'ModalDetalleNominas',
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
            modalDetalleNomina: 'modalDetalleNomina'
        })
    },
}
</script>
<style>
.v-sheet {
    width: 100%;
}
</style>