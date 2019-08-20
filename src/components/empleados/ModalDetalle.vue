<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.detalle" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card class="mx-auto">
                    <v-img src="../../assets/portadas/empleados.png" height="300px">
                        <v-layout column fill-height>
                            <v-card-title>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark color="grey darken-4" @click="modalDetalleEmpleado({empleado: null, estado: false})" v-on="on">
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
                                    <v-icon color="error">person</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Nombre del empleado: </span>
                                        <span class="text-capitalize">{{empleado.nombre}}</span>
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
                                        <span class="text-capitalize">{{empleado.apellido_p}}</span>
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
                                        <span class="text-capitalize">{{empleado.apellido_m}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">work</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">Cargo del empleado: </span>
                                        <span class="text-capitalize">{{empleado.cargo}}</span>
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
                                        <span class="text-capitalize">{{empleado.correo}}</span>
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
                                        <span class="text-capitalize">{{empleado.telefono}}</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="error">security</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span class="font-weight-bold">¿Es usuario?: </span>
                                        <span class="text-capitalize">{{empleado.es_usuario}}</span>
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
                                        <span class="text-capitalize">{{empleado.registro}}</span>
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
    name: 'ModalDetalleEmpleados',
    computed: {
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('empleados', {
            empleado: state => state.empleado
        })
    },
    methods: {
        ...mapActions('empleados', {
            modalDetalleEmpleado: 'modalDetalleEmpleado'
        })
    },
}
</script>
<style>
.v-sheet {
    width: 100%;
}
</style>