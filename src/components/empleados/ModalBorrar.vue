<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.borrar" persistent max-width="60vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>¿Está seguro que desea eliminar a éste empleado?</v-toolbar-title>
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
                        <v-btn rounded large color="error" class="mr-3" @click="modalBorrarEmpleado({estado: false})">
                            <v-icon>reply</v-icon>Cancelar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-3" @click="borrarEmpleado">
                            <v-icon>delete</v-icon>Borrar
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
    name: 'ModalBorrarEmpleados',
    computed: {
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion
        }),
        ...mapState('empleados', {
            empleado: state => state.empleado
        })
    },
    methods: {
        ...mapMutations('empleados', {
            asignarEmpleado: 'asignarEmpleado',
            limpiarEmpleado: 'limpiarEmpleado'
        }),
        ...mapActions('empleados', {
            guardarNotificacionLocal: 'guardarNotificacionLocal',
            listarEmpleados: 'listarEmpleados',
            cambiarPaginaEmpleados: 'cambiarPaginaEmpleados',
            buscarEmpleado: 'buscarEmpleado',
            modalGuardarEmpleado: 'modalGuardarEmpleado',
            modalEditarEmpleado: 'modalEditarEmpleado',
            modalBorrarEmpleado: 'modalBorrarEmpleado',
            modalDetalleEmpleado: 'modalDetalleEmpleado',
            borrarEmpleado: 'borrarEmpleado'
        })
    },
}
</script>