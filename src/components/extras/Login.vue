<template>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>
                            Inicio de sesión
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon right>
                            <v-icon>lock</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-layout justify-center align-center fill-height>
                        <v-flex xs4>
                            <v-img>
                                <v-img height="width: 100%" class="ma-4" src="../../assets/logo.png"></v-img>
                            </v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <v-form>
                                    <v-text-field outlined rounded clearable label="Usuario" prepend-inner-icon="person"
                                    v-validate="'required|alpha_num|max:20'" :counter="20" :error-messages="errors.collect('usuario')" data-vv-name="usuario" required></v-text-field>
                                    <v-text-field outlined rounded clearable label="Contraseña" prepend-inner-icon="vpn_key" :type="mostrar ? 'text' : 'password'" :append-icon="mostrar ? 'visibility' : 'visibility_off'" @click:append="mostrar = !mostrar"
                                    v-validate="'required|alpha_num|max:20'" :counter="20" :error-messages="errors.collect('contrasena')" data-vv-name="contrasena" required></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="mx-2">
                                <v-btn rounded block large color="success" @click="mostrarNavegacion"><v-icon left>verified_user</v-icon>Iniciar sesión</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            usuario: '',
            contrasena: '',
            mostrar: false
        }
    },
    methods: {
    ...mapMutations('general', {
      ocultarNavegacion: 'ocultarNavegacion',
      mostrarNavegacion: 'mostrarNavegacion'
    })
  },
}
</script>