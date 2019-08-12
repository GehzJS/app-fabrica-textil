<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del cliente</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field outlined rounded clearable v-model="cliente.nombre" label="Nombre *" prepend-inner-icon="person" hint="Ejemplo: José." v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="cliente.apellido_p" label="Apellido paterno *" prepend-inner-icon="people" hint="Ejemplo: Pérez." v-validate="'required|alpha|min:3|max:15'" :counter="15" :error-messages="errors.collect('apellido_paterno')" data-vv-name="apellido_paterno" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="cliente.apellido_m" label="Apellido materno *" prepend-inner-icon="people" hint="Ejemplo: León." v-validate="'required|alpha|min:3|max:15'" :counter="15" :error-messages="errors.collect('apellido_materno')" data-vv-name="apellido_materno" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="cliente.correo" label="Correo electrónico *" prepend-inner-icon="email" hint="Ejemplo: jose_123@gmail.com." v-validate="'required|email|min:12|max:30'" :counter="30" :error-messages="errors.collect('correo')" data-vv-name="correo" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="cliente.telefono" label="Teléfono móvil *" prepend-inner-icon="call" v-mask="telefono" hint="Ejemplo: 123-456-7890." v-validate="'required|alpha_dash|min:12|max:12'" :counter="12" :error-messages="errors.collect('telefono')" data-vv-name="telefono" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == true" @click="validarFormulario" :disabled="valido == false">
                            <v-icon left>save</v-icon> Guardar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == false" @click="validarFormulario" :disabled="valido == false">
                            <v-icon left>edit</v-icon> Editar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarCliente({estado: false})">
                            <v-icon left>reply</v-icon> Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { ClienteService } from '@/services/ClienteService.js';

const clienteService = new ClienteService();

export default {
    name: 'ModalGuardarClientes',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: false,
            // telefono: '###-###-####'
        }
    },
    computed: {
        ...mapFields('clientes', [
                'cliente',
            ]
            // {
            //     cliente: 'cliente.cliente',
            //     contrasena: 'cliente.contrasena',
            //     rol: 'cliente.rol',
            //     cliente: 'cliente.cliente_id'
            // }
        ),
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion,
            nombre: state => state.nombre,
            telefono: state => state.telefono
        }),
        ...mapState('clientes', {
            clientes: state => state.clientes,
            cargos: state => state.cargos
        })
    },
    methods: {
        ...mapMutations('clientes', {
            asignarCliente: 'asignarCliente',
            limpiarCliente: 'limpiarCliente'
        }),
        ...mapActions('clientes', {
            modalGuardarCliente: 'modalGuardarCliente',
            guardarCliente: 'guardarCliente',
            editarCliente: 'editarCliente'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarCliente();
                    } else {
                        this.editarCliente();
                    }
                }
            });
        }
    }
}
</script>