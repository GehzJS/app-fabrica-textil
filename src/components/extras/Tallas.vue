<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos_tallas" :items="tallas" height="72vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>dashboard</v-icon>
                    </v-btn>
                    <v-toolbar-title>Tallas de modelo</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field flat rounded solo-inverted hide-details clearable label="Nueva talla" prepend-inner-icon="add" :append-icon="accion == 0? 'loop' : 'replay'" @click:append="accion == 0? tipo = !tipo : reiniciarAccion(0)" v-model="talla.nombre" v-if="tipo == true" v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar talla" prepend-inner-icon="search" append-icon="autorenew" @click:append="tipo = !tipo" v-model="talla.nombre" @keyup="buscarTalla" v-if="tipo == false"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="validarFormulario" v-if="accion == 0" :disabled="tipo == false">
                        <v-icon left>save</v-icon>Guardar
                    </v-btn>
                    <v-btn rounded large color="success" @click="validarFormulario" v-if="accion == 1" :disabled="tipo == false">
                        <v-icon left>edit</v-icon>Editar
                    </v-btn>
                    <v-btn rounded large color="error" @click="borrarTalla" v-if="accion == 2" :disabled="tipo == false">
                        <v-icon left>delete</v-icon>Borrar
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="success" class="ml-0" @click="llenarFormularioEditar(item)" v-on="on">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-small color="error" class="ml-0" @click="llenarFormularioBorrar(item)" v-on="on" :disabled="numeroRegistros == 1">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <v-alert text prominent :value="true" type="info">
                    Tal parece que no hay registros aquí, o se están cargando en éste instante y en un momento aparecerán.
                </v-alert>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'TablaTallas',
    data() {
        return {
            busqueda: '',
            tipo: true
        }
    },
    computed: {
        ...mapFields('tallas', {
            talla: 'talla'
        }),
        ...mapState('tallas', {
            tallas: state => state.tallas,
            accion: state => state.accion,
            titulos_tallas: state => state.titulos_tallas
        }),
        ...mapGetters('tallas', {
            numeroRegistros: 'numeroRegistros'
        })
    },
    methods: {
        ...mapActions('tallas', {
            listarTallas: 'listarTallas',
            buscarTalla: 'buscarTalla',
            guardarTalla: 'guardarTalla',
            editarTalla: 'editarTalla',
            borrarTalla: 'borrarTalla',
            reiniciarAccion: 'reiniciarAccion',
            llenarFormularioEditar: 'llenarFormularioEditar',
            llenarFormularioBorrar: 'llenarFormularioBorrar'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.accion == 0) {
                        this.guardarMaquina();
                    } else if (this.accion == 1) {
                        this.editarMaquina();
                    }
                }
            });
        }
    },
    async created() {
        await this.listarTallas();
    },
}
</script>