<template>
    <div>
        <v-dialog v-model="carga.estado" hide-overlay persistent width="300">
            <v-card dark color="info">
                <v-card-text>
                    {{carga.texto}}
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Carga',
    computed: {
        ...mapState('general', {
            carga: state => state.carga
        }),
    },
}
</script>