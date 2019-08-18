<template>
    <v-container>
        <v-card class="mx-auto">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px">
                <v-layout column fill-height>
                    <v-card-title>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <!-- <v-btn icon @click="modalDetalleUsuario({usuario: null, estado: false})" v-on="on">
                                    <v-icon>chevron_left</v-icon>
                                </v-btn> -->
                            </template>
                            <span>Regresar</span>
                        </v-tooltip>
                    </v-card-title>
                    <v-card-title class="white--text pl-7 pt-12">
                        <div class="display-1 pl-7 pt-12">{{usuario.usuario}}</div>
                    </v-card-title>
                        <v-btn absolute top right large outlined dark @click="cambiar =! cambiar"><v-icon left>refresh</v-icon>Cambiar contraseña</v-btn>
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
                                <span class="font-weight-bold">Nombre de usuario: </span>
                                <span class="text-capitalize">{{usuario.usuario}}</span>
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
                                <span class="font-weight-bold">Rol en el sistema: </span>
                                <span class="text-capitalize">{{usuario.rol}}</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="error">how_to_reg</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                <span class="font-weight-bold">Empleado asignado: </span>
                                <span class="text-capitalize">{{usuario.empleado}}</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-card>
        <v-dialog persistent v-model="cambiar" max-width="80vw">
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
                                    <v-text-field outlined rounded clearable v-model="usuario.contrasena" label="Contraseña *" :type="mostrar ? 'text' : 'password'" prepend-inner-icon="vpn_key" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar" hint="Ejemplo: c0ntr4s3n4." v-validate="'required|alpha_num|min:8|max:20'" :counter="20" :error-messages="errors.collect('contrasena')" data-vv-name="contrasena" required></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field outlined rounded clearable v-model="verificar" label="Confirmar contraseña *" :type="mostrar ? 'text' : 'password'" prepend-inner-icon="vpn_key" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar" v-validate="'required|alpha_num|min:8|max:20'" :counter="20" :error-messages="errors.collect('confirmar_contrasena')" data-vv-name="confirmar_contrasena" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="success" class="mr-5" @click="validarFormulario">
                        <v-icon left>edit</v-icon> Editar
                    </v-btn>
                    <v-btn rounded large color="error" class="mr-5" @click="cambiar =! cambiar">
                        <v-icon left>reply</v-icon> Cancelar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Notificacion/>
        <Carga/>
    </v-container>
</template>

<script>
import Notificacion from '@/components/general/Notificacion.vue';
import Carga from '@/components/general/Carga.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'Perfil',
    components: {
      Notificacion,
      Carga
    },
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true,
            cambiar: false
        }
    },
    computed: {
        ...mapState('usuarios', {
            usuario: state => state.usuario
        })
    },
    methods: {
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    // this.editarUsuarioLocal();
                }
            });
        },
        editarUsuarioLocal() {
            this.verificar = '';
            // this.editarUsuario();
        }
    }
}
</script>