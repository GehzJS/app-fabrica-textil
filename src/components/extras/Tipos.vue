<template>
    <div>
        <v-data-table fixed-header hide-default-footer :headers="titulos_tipos" :items="tipos" height="72vh">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>bookmark</v-icon>
                    </v-btn>
                    <v-toolbar-title>Tipos de modelo</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field flat rounded solo-inverted hide-details clearable label="Nuevo tipo" prepend-inner-icon="add" :append-icon="accion == 0? 'loop' : 'replay'" @click:append="accion == 0? tipo_input = !tipo_input : reiniciarAccion(0)" v-model="tipo.nombre" v-if="tipo_input == true" v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                    <v-text-field flat rounded solo-inverted hide-details label="Buscar tipo" prepend-inner-icon="search" append-icon="autorenew" @click:append="tipo_input = !tipo_input" v-model="tipo.nombre" @keyup="buscarTipo" v-if="tipo_input == false"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn rounded large color="info" @click="validarFormulario" v-if="accion == 0" :disabled="tipo == false">
                        <v-icon left>save</v-icon>Guardar
                    </v-btn>
                    <v-btn rounded large color="success" @click="validarFormulario" v-if="accion == 1" :disabled="tipo == false">
                        <v-icon left>edit</v-icon>Editar
                    </v-btn>
                    <v-btn rounded large color="error" @click="borrarTipo" v-if="accion == 2" :disabled="tipo == false">
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
    name: 'TablaTipos',
    data() {
        return {
            busqueda: '',
            tipo_input: true
        }
    },
    computed: {
        ...mapFields('tipos', {
            tipo: 'tipo'
        }),
        ...mapState('tipos', {
            tipos: state => state.tipos,
            accion: state => state.accion,
            titulos_tipos: state => state.titulos_tipos
        }),
        ...mapGetters('tipos', {
            numeroRegistros: 'numeroRegistros'
        })
    },
    methods: {
        ...mapActions('tipos', {
            listarTipos: 'listarTipos',
            buscarTipo: 'buscarTipo',
            guardarTipo: 'guardarTipo',
            editarTipo: 'editarTipo',
            borrarTipo: 'borrarTipo',
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
        await this.listarTipos();
    },
}
</script>