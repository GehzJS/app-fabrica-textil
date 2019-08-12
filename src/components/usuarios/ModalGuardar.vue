<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del usuario</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>person</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="usuario.usuario" label="Usuario *" prepend-inner-icon="person" hint="Ejemplo: Usuario X." v-validate="'required|alpha_num|min:5|max:20'" :counter="20" :error-messages="errors.collect('usuario')" data-vv-name="usuario" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-select outlined rounded :items="roles" v-model="usuario.rol" label="Rol *" prepend-inner-icon="security" v-validate="'required'" :error-messages="errors.collect('rol')" data-vv-name="rol" required></v-select>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="usuario.contrasena" label="Contraseña *" :type="mostrar ? 'text' : 'password'" prepend-inner-icon="vpn_key" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar" hint="Ejemplo: c0ntr4s3n4." v-validate="'required|alpha_num|min:8|max:20'" :counter="20" :error-messages="errors.collect('contrasena')" data-vv-name="contrasena" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="verificar" label="Confirmar contraseña *" :type="mostrar ? 'text' : 'password'" prepend-inner-icon="vpn_key" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar" v-validate="'required|alpha_num|min:8|max:20'" :counter="20" :error-messages="errors.collect('confirmar_contrasena')" data-vv-name="confirmar_contrasena" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-autocomplete outlined rounded v-model="usuario.empleado_id" :items="empleados" item-text="nombreEmpleado" item-value="id" label="Empleado asignado *" prepend-inner-icon="how_to_reg" v-validate="'required'" :error-messages="errors.collect('empleado')" data-vv-name="empleado" required></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == true" @click="validarFormulario">
                            <v-icon left>save</v-icon> Guardar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == false" @click="validarFormulario">
                            <v-icon left>edit</v-icon> Editar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarUsuario({estado: false})">
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
import { UsuarioService } from '@/services/UsuarioService.js';

const usuarioService = new UsuarioService();

export default {
    name: 'ModalGuardarUsuarios',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true
        }
    },
    computed: {
        ...mapFields('usuarios', [
            'usuario',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion
        }),
        ...mapState('usuarios', {
            empleados: state => state.empleados,
            roles: state => state.roles
        })
    },
    methods: {
        ...mapMutations('usuarios', {
            asignarUsuario: 'asignarUsuario',
            limpiarUsuario: 'limpiarUsuario'
        }),
        ...mapActions('usuarios', {
            modalGuardarUsuario: 'modalGuardarUsuario',
            guardarUsuario: 'guardarUsuario',
            editarUsuario: 'editarUsuario'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarUsuarioLocal();
                    } else {
                        this.editarUsuario();
                    }
                }
            });
        },
        guardarUsuarioLocal() {
            this.verificar = '';
            this.guardarUsuario();
        },
        editarUsuarioLocal() {
            this.verificar = '';
            this.editarUsuario();
        }
    }
}
</script>