<template>
    <v-container fill-height>
        <Login v-if="existe == true"/>
        <div v-if="existe == false">
          <Setup v-if="setup.obligatorio"/>
          <Opcional v-if="setup.opcional"/>
        </div>
        <Carga/>
        <v-overlay :value="carga" color="white">
          <v-progress-circular indeterminate :size="128" :width="10" color="info"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Login from '@/components/extras/Login.vue';
import Setup from '@/components/setup/obligatorio/Setup.vue';
import Opcional from '@/components/setup/opcional/Opcional.vue';
import Carga from '@/components/general/Carga.vue';

export default {
    name: 'Raiz',
    components: {
        Login,
        Setup,
        Opcional,
        Carga
    },
    data() {
        return {
            datos: false
        }
    },
    computed: {
    ...mapState('general', {
      tema: 'tema',
      navegacion: 'navegacion'
    }),
    ...mapState('setup', {
      existe: 'existe',
      setup: 'setup',
      carga: 'carga'
    })
  },
  methods: {
    ...mapMutations('general', {
      ocultarNavegacion: 'ocultarNavegacion',
      mostrarNavegacion: 'mostrarNavegacion'
    }),
    ...mapActions('setup', {
      contarRegistros: 'contarRegistros'
    })
  },
  async created() {
    this.ocultarNavegacion();
    await this.contarRegistros();
  }
}
</script>