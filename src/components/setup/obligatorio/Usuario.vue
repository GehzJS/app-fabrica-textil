<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Registre su primer usuario</h6>
                    <p class="body-1">Para continuar, es necesario tener un usuario registrado. En éste caso,  
                        <span class="font-weight-bold">el usuario registrado aquí quedará vinculado únicamente al empleado registrado anteriormente y contará con todos los permisos en el sistema</span> 
                    . Esto no podrá cambiarse posteriormente, a excepción del nombre de usuario y contaseña.</p>
                    <v-form ref="form" v-model="valido" lazy-validation>
                        <v-layout wrap>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="usuario.usuario" label="Usuario *" prepend-inner-icon="person" hint="Ejemplo: Usuario X."
                                v-validate="'required|alpha_num|min:5|max:20'" :counter="20" :error-messages="errors.collect('usuario')" data-vv-name="usuario" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="usuario.contrasena" label="Contraseña *" :type="mostrar ? 'text' : 'password'" prepend-inner-icon="vpn_key" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar" hint="Ejemplo: c0ntr4s3n4."
                                v-validate="'required|alpha_num|min:8|max:20'" :counter="20" :error-messages="errors.collect('contrasena')" data-vv-name="contrasena" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="verificar" label="Confirmar contraseña *" :type="mostrar ? 'text' : 'password'" prepend-inner-icon="vpn_key" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar"
                                v-validate="'required|alpha_num|min:8|max:20'" :counter="20" :error-messages="errors.collect('confirmar_contrasena')" data-vv-name="confirmar_contrasena" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="validarFormulario" class="mb-1"><v-icon left>check_circle</v-icon>Continuar</v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'UsuarioInicio',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true
        }
    },
    computed: {
        ...mapFields('setup', [
            'usuario',
        ]),
        ...mapState('setup', {
            roles: state => state.roles
        })
    },
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        }),
        ...mapActions('setup', {
            guardarUsuario: 'guardarUsuario'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if(valido) {
                    this.guardarUsuario();
                }
            });
        }
    }
}
</script>