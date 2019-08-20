<template>
    <div>
        <MenuLateral/>
        <v-toolbar flat absolute fixed v-if="navegacion">
            <v-app-bar app fixed>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-app-bar-nav-icon v-on="on" @click.stop="navIzquierda = !navIzquierda"></v-app-bar-nav-icon>
                    </template>
                    <span>Ver secciones</span>
                </v-tooltip>
                <v-toolbar-title>App</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-autocomplete rounded flat solo-inverted hide-details clearable v-model="busqueda" :items="seccionesBusqueda" item-text="titulo" item-value="enlace" label="Buscar en la aplicacion" prepend-inner-icon="search" class="mx-5 hidden-sm-and-down" @change="redirigir(busqueda)"></v-autocomplete>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" to="/inicio">
                            <v-icon>home</v-icon>
                        </v-btn>
                    </template>
                    <span>Ir al inicio</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click.stop="cambiarTema">
                            <v-icon>invert_colors</v-icon>
                        </v-btn>
                    </template>
                    <span>Cambiar tema (Claro / Oscuro)</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click.stop="navDerecha = !navDerecha">
                            <v-badge overlap color="error">
                                <template v-slot:badge>
                                    <span v-if="total > 0">{{total}}</span>
                                </template>
                                <v-icon>notifications</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <span>Mostrar notificaciones</span>
                </v-tooltip>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>person</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item to="/perfil">
                            <v-list-item-title>Ver mi perfil</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/">
                            <v-list-item-title>Cerrar sesión</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>
        </v-toolbar>
        <Notificaciones />
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import MenuLateral from './MenuLateral.vue';
import Notificaciones from './Notificaciones.vue';

export default {
    name: 'MenuPrincipal',
    data() {
        return {
            busqueda: ''
        }
    },
    components: {
        MenuLateral,
        Notificaciones
    },
    computed: {
        ...mapFields('navegacion', [
            'navIzquierda',
            'navDerecha'
        ]),
        ...mapState('general', {
            navegacion: state => state.navegacion,
            seccionesBusqueda: state => state.seccionesBusqueda
        }),
        ...mapGetters('general', {
            total: 'total'
        })
    },
    methods: {
        ...mapMutations('general', {
            cambiarTema: 'cambiarTema',
            leerSecciones: 'leerSecciones',
            leerLocal: 'leerLocal',
        }),
        ...mapMutations('navegacion', {
            redirigir: 'redirigir'
        })
    },
    created() {
        this.leerSecciones();
        this.leerLocal();
    }
}
</script>