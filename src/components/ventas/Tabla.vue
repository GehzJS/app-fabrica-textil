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
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar por cliente" prepend-inner-icon="search" v-model="busqueda" @keyup="buscarVenta"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-menu offset-y :close-on-content-click="false">
                        <template v-slot:activator="{ on:menu }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on:tooltip }">
                                <v-btn icon v-on="{...tooltip, ...menu}" color="success"><v-icon>settings</v-icon></v-btn>
                                </template>
                                <span>Opciones</span>
                            </v-tooltip>
                        </template>
                        <v-card>
                            <v-container>
                                <v-tabs grow color="info">
                                    <v-tab>Buscar por</v-tab>
                                    <v-tab>Listar solo</v-tab>
                                    <v-tab-item>
                                        <v-radio-group v-model="columna">
                                            <v-radio v-for="campo in campos" :key="campo.nombre" :label="campo.nombre" :value="campo.clave" color="success"></v-radio>
                                        </v-radio-group>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-radio-group v-model="estado" @change="listarVentas">
                                            <v-radio v-for="lista in listado" :key="lista.nombre" :label="lista.nombre" :value="lista.clave" color="success"></v-radio>
                                        </v-radio-group>
                                    </v-tab-item>
                                </v-tabs>
                            </v-container>
                        </v-card>
                    </v-menu>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" color="info" @click="modalGuardarVenta({estado: true, local: true})">
                                <v-icon>note_add</v-icon>
                            </v-btn>
                        </template>
                        <span>Nueva venta</span>
                    </v-tooltip>
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
            // busqueda: ''
        }
    },
    computed: {
        ...mapFields('ventas', [
            'paginacion',
            'busqueda',
            'columna',
            'estado'
        ]),
        ...mapState('general', {
            cargandoTabla: state => state.cargandoTabla
        }),
        ...mapState('ventas', {
            venta: state => state.venta,
            ventas: state => state.ventas,
            registros: state => state.registros,
            titulos: state => state.titulos,
            campos: state => state.campos,
            listado: state => state.listado
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