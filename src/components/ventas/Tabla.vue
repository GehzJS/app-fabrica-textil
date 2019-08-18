<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos" :items="ventas" :items-per-page="ventas.registros" :options.sync="paginacion" :loading="cargandoTabla" height="60vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>local_offer</v-icon>
                    </v-btn>
                    <v-toolbar-title>Ventas</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="modalGuardarVenta({estado: true, local: true})">
                        <v-icon left>note_add</v-icon>Nueva venta
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar por cliente" prepend-inner-icon="search" v-model="busqueda" @keyup="buscarVenta(busqueda)"></v-text-field>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="success" class="ml-0" @click="modalEditarVenta({venta: item, estado: true, local: false})" v-on="on" :disabled="item.estado =='pagada'">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarVenta({venta: item, estado: true, local: false})" v-on="on">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="info" class="ml-0" @click="modalDetalleVenta({venta: item, estado: true})" v-on="on">
                            <v-icon>visibility</v-icon>
                        </v-btn>
                    </template>
                    <span>Ver detalles</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="amber lighten-1" class="ml-0" @click="modalImprimirVenta({venta: item, estado: true})" v-on="on">
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
                            <v-select outlined rounded hide-details :items="registros" label="Registros por página" v-model="paginacion.registros" @change="listarVentas"></v-select>
                        </v-flex>
                        <v-flex xs9 class="pl-5">
                            <v-pagination circle v-model="paginacion.pagina" :length="paginacion.total" @input="cambiarPaginaVentas" color="info"></v-pagination>
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
    name: 'TablaVentas',
    data() {
        return {
            busqueda: ''
        }
    },
    computed: {
        ...mapFields('ventas', [
            'paginacion'
        ]),
        ...mapState('general', {
            cargandoTabla: state => state.cargandoTabla
        }),
        ...mapState('ventas', {
            venta: state => state.venta,
            ventas: state => state.ventas,
            registros: state => state.registros,
            titulos: state => state.titulos
        })
    },
    methods: {
        ...mapActions('ventas', {
            listarVentas: 'listarVentas',
            cambiarPaginaVentas: 'cambiarPaginaVentas',
            buscarVenta: 'buscarVenta',
            modalGuardarVenta: 'modalGuardarVenta',
            modalEditarVenta: 'modalEditarVenta',
            modalBorrarVenta: 'modalBorrarVenta',
            modalDetalleVenta: 'modalDetalleVenta',
            modalImprimirVenta: 'modalImprimirVenta'
        })
    },
    async created() {
        let datos = await this.listarVentas();
    }
}
</script>