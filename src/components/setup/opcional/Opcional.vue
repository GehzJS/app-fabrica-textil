<template>
    <v-layout v-if="setup.opcional">
        <v-flex>
            <v-stepper v-model="pagina.opcional">
                <v-stepper-header>
                    <v-stepper-step :complete="pagina.opcional > 1" step="1">Antes de</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.opcional > 2" step="2">Cliente<small>Opcional</small></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.opcional > 3" step="3">Proveedor<small>Opcional</small></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.opcional > 4" step="4">Extras<small>Opcional</small></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.opcional > 5" step="5">Tela<small>Opcional</small></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.opcional > 6" step="6">Modelo<small>Opcional</small></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="pagina.opcional > 7" step="7">Todo listo</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <Bienvenida/>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                       <Cliente/>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <Proveedor/>
                    </v-stepper-content>
                    
                    <v-stepper-content step="4">
                        <Extra/>
                    </v-stepper-content>

                    <v-stepper-content step="5">
                        <Tela/>
                    </v-stepper-content>

                    <v-stepper-content step="6">
                        <Modelo/>
                    </v-stepper-content>

                    <v-stepper-content step="7">
                        <Listo/>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Bienvenida from '@/components/setup/opcional/Bienvenida.vue';
import Cliente from '@/components/setup/opcional/Cliente.vue';
import Proveedor from '@/components/setup/opcional/Proveedor.vue';
import Extra from '@/components/setup/opcional/Extra.vue';
import Tela from '@/components/setup/opcional/Tela.vue';
import Modelo from '@/components/setup/opcional/Modelo.vue';
import Listo from '@/components/setup/opcional/Listo.vue';

export default {
    name: 'Setup',
    components: {
        Bienvenida,
        Cliente,
        Proveedor,
        Extra,
        Tela,
        Modelo,
        Listo
    },
    computed: {
        ...mapState('setup', {
            setup: state => state.setup,
            pagina: state => state.pagina
        })
    },
}
</script>