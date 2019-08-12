<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos" :items="operaciones" :items-per-page="operaciones.registros" :options.sync="paginacion" :loading="cargandoTabla" height="60vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>dns</v-icon>
                    </v-btn>
                    <v-toolbar-title>Operaciones</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="modalGuardarOperacion({estado: true})">
                        <v-icon left>note_add</v-icon>Nueva operación
                    </v-btn>
                    <v-spacer></v-spacer>
                    <!-- <v-layout align-center justify-center fill-height column>
                        <span class="caption">Buscar por:</span>
                        <v-switch hide-details v-model="tipo" :label="tipo? 'Operación' : 'Modelo'" color="info"></v-switch>
                    </v-layout> -->
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar por operación" prepend-inner-icon="search" append-icon="loop" @click:append="tipo = !tipo" v-model="busqueda" @keyup="buscarOperacion(busqueda)" v-if="tipo == true"></v-text-field>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar por modelo" prepend-inner-icon="search" append-icon="autorenew" @click:append="tipo = !tipo" v-model="busqueda" @keyup="buscarOperacionPorModelo(busqueda)" v-if="tipo == false"></v-text-field>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="success" class="ml-0" @click="modalEditarOperacion({operacion: item, estado: true})" v-on="on">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarOperacion({operacion: item, estado: true})" v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="info" class="ml-0" @click="modalDetalleOperacion({operacion: item, estado: true})" v-on="on">
                            <v-icon>visibility</v-icon>
                        </v-btn>
                    </template>
                    <span>Ver detalles</span>
                </v-tooltip>
            </template>
            <template v-slot:item.colores="{ item }">
                <v-icon :color="item.color">fiber_manual_record</v-icon>
            </template>
            <template v-slot:no-data>
                <v-alert text prominent :value="true" type="info">
                    Tal parece que no hay registros aquí, o se están cargando en éste instante y en un momento aparecerán.
                </v-alert>
            </template>
            <template v-slot:footer>
                <v-container>
                    <v-layout justify-center align-center fill-height>
                        <v-flex xs3>
                            <v-select outlined rounded hide-details :items="registros" label="Registros por página" v-model="paginacion.registros" @change="listarOperaciones"></v-select>
                        </v-flex>
                        <v-flex xs9 class="pl-5">
                            <v-pagination circle v-model="paginacion.pagina" :length="paginacion.total" @input="cambiarPaginaOperaciones" color="info"></v-pagination>
                        </v-flex>
                    </v-layout>
                </v-container>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'TablaOperaciones',
    data() {
        return {
            // paginacion: {
            //     pagina: 1,
            //     total: 10,
            //     registros: 10
            // },
            busqueda: '',
            tipo: true
        }
    },
    computed: {
        ...mapFields('operaciones', [
            'paginacion',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            cargandoTabla: state => state.cargandoTabla
        }),
        ...mapState('operaciones', {
            operacion: state => state.operacion,
            operaciones: state => state.operaciones,
            // paginacion: state => state.paginacion,
            registros: state => state.registros,
            titulos: state => state.titulos
        }),
        ...mapGetters('operaciones', {
            numeroRegistros: 'numeroRegistros',
        })
    },
    methods: {
        ...mapMutations('operaciones', {
            asignarPaginacion: 'asignarPaginacion'
        }),
        ...mapActions('operaciones', {
            listarOperaciones: 'listarOperaciones',
            cambiarPaginaOperaciones: 'cambiarPaginaOperaciones',
            buscarOperacion: 'buscarOperacion',
            buscarOperacionPorModelo: 'buscarOperacionPorModelo',
            modalGuardarOperacion: 'modalGuardarOperacion',
            modalEditarOperacion: 'modalEditarOperacion',
            modalBorrarOperacion: 'modalBorrarOperacion',
            modalDetalleOperacion: 'modalDetalleOperacion'
        })
    },
    async created() {
        let datos = await this.listarOperaciones();
    }
}
</script>