<template>
    <div>
        <v-navigation-drawer app fixed temporary right width="350px" v-model="navDerecha">
            <v-toolbar absolute dark fixed color="info">
                <v-btn icon>
                    <v-icon>notifications</v-icon>
                </v-btn>
                <v-toolbar-title>Notificaciones</v-toolbar-title>
                <v-tooltip left>
                    <template v-slot:activator="{ on }">
                        <v-btn absolute bottom right small fab v-on="on" color="error" @click="borrarNotificaciones">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar todas las notificaciones</span>
                </v-tooltip>
            </v-toolbar>
            <v-list style="margin-top:56px">
                <v-alert prominent v-for="(notificacion, index) in notificaciones" :key="index" :type="notificacion.tipo" class="ma-1">
                    <v-layout align-center fill-height>
                        <v-flex xs10>
                            <div>
                                <span class="font-weight-medium">{{notificacion.texto}}<br></span>
                                <span class="font-weight-light">{{notificacion.fecha}}</span>
                            </div>
                        </v-flex>
                        <v-flex xs2>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon small v-on="on" @click="borrarNotificacionLocal">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Borrar</span>
                            </v-tooltip>
                        </v-flex>
                    </v-layout>
                </v-alert>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'Notificaciones',
    computed: {
        ...mapFields('navegacion', [
            'navDerecha'
        ]),
        ...mapState('general', {
            notificaciones: state => state.notificaciones
        })
    },
    methods: {
        ...mapMutations('general', {
            borrarNotificaciones: 'borrarNotificaciones'
        }),
        ...mapActions('general', {
            borrarNotificacionLocal: 'borrarNotificacionLocal'
        })
    }
}
</script>