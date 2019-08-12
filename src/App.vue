<template>
  <v-app :dark="cambiarTemaApp">
    <MenuPrincipal/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MenuPrincipal from '@/components/navegacion/MenuPrincipal.vue';

export default {
  name: 'App',
  components: {
    MenuPrincipal
  },
  computed: {
    ...mapState('general', {
      tema: 'tema',
      navegacion: 'navegacion'
    }),
    cambiarTemaApp() {
      return this.$vuetify.theme.dark = this.tema;
    }
  },
  methods: {
    ...mapMutations('general', {
      cambiarTema: 'cambiarTema'
    }),
    obtenerConfig() {
      let config = JSON.parse(localStorage.getItem('besa-config'));
      if(config) {
        this.cambiarTema();
      }
    }
  },
  created() {
    this.obtenerConfig();
  }
};
</script>

<style>
  .v-content {
    /* padding: 2rem !important; */
    padding-top: 5rem !important;
  }
</style>
