<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos" :items="lotes" :items-per-page="lotes.registros" :options.sync="paginacion" :loading="cargandoTabla" height="60vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>vertical_split</v-icon>
                    </v-btn>
                    <v-toolbar-title>Lotes</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="modalGuardarLote({estado: true})">
                        <v-icon left>note_add</v-icon>Nuevo lote
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar por modelo" prepend-inner-icon="search" v-model="busqueda" @keyup="buscarLote(busqueda)"></v-text-field>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="success" class="ml-0" @click="modalEditarLote({lote: item, estado: true})" v-on="on">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarLote({lote: item, estado: true})" v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="info" class="ml-0" @click="modalDetalleLote({lote: item, estado: true})" v-on="on">
                            <v-icon>visibility</v-icon>
                        </v-btn>
                    </template>
                    <span>Ver detalles</span>
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
                            <v-select outlined rounded hide-details :items="registros" label="Registros por página" v-model="paginacion.registros" @change="listarLotes"></v-select>
                        </v-flex>
                        <v-flex xs9 class="pl-5">
                            <v-pagination circle v-model="paginacion.pagina" :length="paginacion.total" @input="cambiarPaginaLotes" color="info"></v-pagination>
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
    name: 'TablaLotes',
    data() {
        return {
            busqueda: ''
        }
    },
    computed: {
        ...mapFields('lotes', [
            'paginacion'
        ]),
        ...mapState('general', {
            cargandoTabla: state => state.cargandoTabla
        }),
        ...mapState('lotes', {
            lote: state => state.lote,
            lotes: state => state.lotes,
            registros: state => state.registros,
            titulos: state => state.titulos
        }),
        ...mapGetters('lotes', {
            numeroRegistros: 'numeroRegistros',
        })
    },
    methods: {
        ...mapActions('lotes', {
            listarLotes: 'listarLotes',
            cambiarPaginaLotes: 'cambiarPaginaLotes',
            buscarLote: 'buscarLote',
            modalGuardarLote: 'modalGuardarLote',
            modalEditarLote: 'modalEditarLote',
            modalBorrarLote: 'modalBorrarLote',
            modalDetalleLote: 'modalDetalleLote'
        })
    },
    async created() {
        let datos = await this.listarLotes();
    }
}
</script>