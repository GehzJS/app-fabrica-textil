<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">¡Casi listo!</h6>
                    <p class="body-1">Los pasos escenciales ya han sido completados. A partir de éste momento usted podrá comenzar a usar éste sistema, sin embargo
                        <span class="font-weight-bold">al querer relizar ciertos registros se le pedirá antes que complete otros </span> 
                    con el fin de mantener todo en orden. (Ejemplo: para registrar una operación antes hay que tener un modelo.)</p>
                    <p class="body-1">Tras esto dicho, usted puede elegir si hacer esto ahora o después, teniendo en cuenta que 
                        <span class="font-weight-bold">en ambas opciones el asistente le guiará sin problema alguno </span> 
                    para que usted haga el mínimo esfuerzo.</p>
                    <p class="body-1">Por lo tanto, oprima el botón 
                        <span class="font-weight-bold">Finalizar </span> 
                    si desea saltarse éste paso previo e ir directamente al sistema, ú oprimir el botón
                    <span class="font-weight-bold">Continuar </span> 
                    para seguir con la serie de registros necesarios.</p>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="cambiarSetup" class="mb-1 mr-3"><v-icon left>check_circle</v-icon>Continuar</v-btn>
        <v-btn rounded large color="success" @click="mostrarLogin" class="mb-1"><v-icon left>check_circle</v-icon>Finalizar</v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'listo',
    methods: {
        ...mapMutations('setup', {
            cambiarSetup: 'cambiarSetup',
            cambiarValor: 'cambiarValor'
        }),
        mostrarLogin() {
            this.cambiarValor(1);
            this.$router.push({name: 'login'})
        }
    },
}
</script>