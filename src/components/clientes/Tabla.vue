<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos" :items="clientes" :items-per-page="clientes.registros" :options.sync="paginacion" :loading="cargandoTabla" height="60vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>shopping_cart</v-icon>
                    </v-btn>
                    <v-toolbar-title>Clientes</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="modalGuardarCliente({estado: true})">
                        <v-icon left>note_add</v-icon>Nuevo cliente
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar clientes" prepend-inner-icon="search" v-model="busqueda" @keyup="buscarCliente(busqueda)"></v-text-field>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="success" class="ml-0" @click="modalEditarCliente({cliente: item, estado: true})" v-on="on">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarCliente({cliente: item, estado: true})" v-on="on" :disabled="numeroRegistros == 1">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="info" class="ml-0" @click="modalDetalleCliente({cliente: item, estado: true})" v-on="on">
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
                            <v-select outlined rounded hide-details :items="registros" label="Registros por página" v-model="paginacion.registros" @change="listarClientes"></v-select>
                        </v-flex>
                        <v-flex xs9 class="pl-5">
                            <v-pagination circle v-model="paginacion.pagina" :length="paginacion.total" @input="cambiarPaginaClientes" color="info"></v-pagination>
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
    name: 'TablaClientes',
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
        ...mapFields('clientes', [
            'paginacion',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            // paginacion: state => state.paginacion,
            cargandoTabla: state => state.cargandoTabla
        }),
        ...mapState('clientes', {
            cliente: state => state.cliente,
            clientes: state => state.clientes,
            // paginacion: state => state.paginacion,
            registros: state => state.registros,
            titulos: state => state.titulos
        }),
        ...mapGetters('clientes', {
            numeroRegistros: 'numeroRegistros',
        })
    },
    methods: {
        ...mapMutations('clientes', {
            asignarPaginacion: 'asignarPaginacion'
        }),
        ...mapActions('clientes', {
            listarClientes: 'listarClientes',
            cambiarPaginaClientes: 'cambiarPaginaClientes',
            buscarCliente: 'buscarCliente',
            modalGuardarCliente: 'modalGuardarCliente',
            modalEditarCliente: 'modalEditarCliente',
            modalBorrarCliente: 'modalBorrarCliente',
            modalDetalleCliente: 'modalDetalleCliente'
        })
    },
    async created() {
        let datos = await this.listarClientes();
    }
}
</script>