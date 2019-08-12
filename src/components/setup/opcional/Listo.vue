<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">¡Todo listo!</h6>
                    <p class="body-1">Todos los pasos  han sido completados. A partir de éste momento usted podrá comenzar a usar éste sistema, 
                        <span class="font-weight-bold">esperamos que este software satisfaga sus necesidades </span> 
                    y en caso de algún problema, duda o sugerencia, póngase en contacto con nuestro servicio técnico, el cuál hará caso a su petición.</p><br>
                    <p class="body-1">Para comenzar, oprima el botón  
                        <span class="font-weight-bold">Finalizar </span> 
                    para iniciar sesión en el sistema.</p>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="success" @click="mostrarLogin" class="mb-1"><v-icon left>check_circle</v-icon>Finalizar</v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'listo',
    methods: {
        ...mapMutations('setup', {
            cambiarValor: 'cambiarValor'
        }),
        mostrarLogin() {
            this.cambiarValor(1);
            this.$router.push({name: 'login'})
        }
    },
}
</script>