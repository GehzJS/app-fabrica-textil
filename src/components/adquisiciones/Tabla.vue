<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos" :items="adquisiciones" :items-per-page="adquisiciones.registros" :options.sync="paginacion" :loading="cargandoTabla" height="60vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>local_mall</v-icon>
                    </v-btn>
                    <v-toolbar-title>Adquisiciones</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="modalGuardarAdquisicion({estado: true, local: true})">
                        <v-icon left>note_add</v-icon>Nueva adquisición
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar por proveedor" prepend-inner-icon="search" v-model="busqueda" @keyup="buscarAdquisicion(busqueda)"></v-text-field>
                    <!-- <v-text-field flat rounded solo-inverted hide-details label="Buscar por tela" prepend-inner-icon="search" v-model="busqueda" @keyup="buscarAdquisicion(busqueda)"></v-text-field> -->
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="success" class="ml-0" @click="modalEditarAdquisicion({adquisicion: item, estado: true, local: false})" v-on="on" :disabled="item.estado =='pagada'">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarAdquisicion({adquisicion: item, estado: true, local: false})" v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="info" class="ml-0" @click="modalDetalleAdquisicion({adquisicion: item, estado: true})" v-on="on">
                            <v-icon>visibility</v-icon>
                        </v-btn>
                    </template>
                    <span>Ver detalles</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="amber lighten-1" class="ml-0" @click="modalImprimirAdquisicion({adquisicion: item, estado: true})" v-on="on">
                            <v-icon>print</v-icon>
                        </v-btn>
                    </template>
                    <span>Imprimir</span>
                </v-tooltip>
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
                            <v-select outlined rounded hide-details :items="registros" label="Registros por página" v-model="paginacion.registros" @change="listarAdquisiciones"></v-select>
                        </v-flex>
                        <v-flex xs9 class="pl-5">
                            <v-pagination circle v-model="paginacion.pagina" :length="paginacion.total" @input="cambiarPaginaAdquisiciones" color="info"></v-pagination>
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
    name: 'TablaAdquisiciones',
    data() {
        return {
            // paginacion: {
            //     pagina: 1,
            //     total: 10,
            //     registros: 10
            // },
            busqueda: ''
        }
    },
    computed: {
        ...mapFields('adquisiciones', [
            'paginacion',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            cargandoTabla: state => state.cargandoTabla
        }),
        ...mapState('adquisiciones', {
            adquisicion: state => state.adquisicion,
            adquisiciones: state => state.adquisiciones,
            // paginacion: state => state.paginacion,
            registros: state => state.registros,
            titulos: state => state.titulos
        }),
        ...mapGetters('adquisiciones', {
            numeroRegistros: 'numeroRegistros',
        })
    },
    methods: {
        ...mapMutations('adquisiciones', {
            asignarPaginacion: 'asignarPaginacion'
        }),
        ...mapActions('adquisiciones', {
            listarAdquisiciones: 'listarAdquisiciones',
            cambiarPaginaAdquisiciones: 'cambiarPaginaAdquisiciones',
            buscarAdquisicion: 'buscarAdquisicion',
            modalGuardarAdquisicion: 'modalGuardarAdquisicion',
            modalEditarAdquisicion: 'modalEditarAdquisicion',
            modalBorrarAdquisicion: 'modalBorrarAdquisicion',
            modalDetalleAdquisicion: 'modalDetalleAdquisicion',
            modalImprimirAdquisicion: 'modalImprimirAdquisicion'
        })
    },
    async created() {
        let datos = await this.listarAdquisiciones();
    }
}
</script>