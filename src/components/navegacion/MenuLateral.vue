<template>
    <div>
        <v-navigation-drawer app fixed temporary width="300px" v-model="navIzquierda">
            <v-toolbar absolute dark fixed color="info">
                <v-btn icon>
                    <v-icon>apps</v-icon>
                </v-btn>
                <v-toolbar-title>Secciones</v-toolbar-title>
            </v-toolbar>
            <v-list shaped style="margin-top:56px">
                <v-list-group v-for="(seccion, index) in secciones" :key="index" v-model="seccion.active" :prepend-icon="seccion.icono" no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="seccion.titulo"></v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="subSeccion in secciones[index].items" :key="subSeccion.titulo" :to="`${subSeccion.enlace}`">
                        <v-list-item-content>
                            <v-list-item-title v-text="subSeccion.titulo"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon v-text="subSeccion.icono"></v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'MenuLateral',
    computed: {
        ...mapFields('navegacion', [
            'navIzquierda'
        ]),
        ...mapState('general', {
            secciones: state => state.secciones
        })
    }
}
</script>