<template>
    <v-layout v-model="setup.obligatorio">
        <v-flex>
            <v-stepper v-model="pagina.obligatorio">
                <v-stepper-header>
                    <v-stepper-step :complete="pagina.obligatorio > 1" step="1">Bienvenida</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.obligatorio > 2" step="2">Registrar un empleado</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.obligatorio > 3" step="3">Registrar un usuario</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.obligatorio > 4" step="4">Casi listo</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <Bienvenida/>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                       <Empleado/>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <Usuario/>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <Listo/>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Bienvenida from '@/components/setup/obligatorio/Bienvenida.vue';
import Empleado from '@/components/setup/obligatorio/Empleado.vue';
import Usuario from '@/components/setup/obligatorio/Usuario.vue';
import Listo from '@/components/setup/obligatorio/Listo.vue';

export default {
    name: 'Setup',
    components: {
        Bienvenida,
        Empleado,
        Usuario,
        Listo
    },
    computed: {
        ...mapState('setup', {
            setup: state => state.setup,
            pagina: state => state.pagina
        })
    }
}
</script>