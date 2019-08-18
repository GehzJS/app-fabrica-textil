<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del tela</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>style</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout>
                                    <v-flex xs8>
                                        <v-layout wrap>
                                            <v-flex xs6>
                                                <v-text-field outlined rounded clearable v-model="tela.nombre" label="Nombre *" prepend-inner-icon="style" hint="Ejemplo: Tela X." v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field outlined rounded clearable v-model="tela.stock" label="Stock *" prepend-inner-icon="donut_small" hint="Ejemplo: 10.00 (Cantidad en metros)." v-validate="'required|decimal:2|min:1|max:5'" :counter="5" :error-messages="errors.collect('stock')" data-vv-name="stock" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-autocomplete outlined rounded v-model="tela.seccion" :items="secciones" item-text="nombre_seccion" item-value="nombre_seccion" label="Seccion *" prepend-inner-icon="view_compact" v-validate="'required'" :error-messages="errors.collect('seccion')" data-vv-name="seccion" required></v-autocomplete>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field outlined rounded clearable v-model="tela.precio" label="Precio *" prepend-inner-icon="euro_symbol" suffix="MXN" hint="Ejemplo: 50.00 (Precio en pesos por metro)." v-validate="'required|decimal:2|min:5|max:7'" :counter="7" :error-messages="errors.collect('precio')" data-vv-name="precio" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-textarea outlined rounded clearable auto-grow v-model="tela.caracteristicas" label="Características *" prepend-inner-icon="assignment" hint="Ejemplo: Tela X color blanco." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('caracteristicas')" data-vv-name="caracteristicas" required></v-textarea>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-layout align-center justify-center fill-height>
                                            <v-flex xs12>
                                                <h4 class="subtitle-1">
                                                    <v-icon left>color_lens</v-icon>Seleccione un color *
                                                </h4>
                                                <v-color-picker v-model="tela.color" flat hide-canvas hide-inputs hide-mode-switch show-swatches swatches-max-height="210" mode="hexa" v-validate="'required'" :error-messages="errors.collect('tela')" data-vv-name="tela" required></v-color-picker>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == true" @click="validarFormulario">
                            <v-icon left>save</v-icon> Guardar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == false" @click="validarFormulario">
                            <v-icon left>edit</v-icon> Editar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarTela({estado: false})">
                            <v-icon left>reply</v-icon> Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'ModalGuardarTelas',
    data() {
        return {
            valido: true
        }
    },
    computed: {
        ...mapFields('telas', [
            'tela',
        ]),
        ...mapState('general', {
            modal: state => state.modal,
            cantidad: state => state.cantidad,
            precio: state => state.precio
        }),
        ...mapState('telas', {
            telas: state => state.telas,
            secciones: state => state.secciones
        })
    },
    methods: {
        ...mapActions('telas', {
            modalGuardarTela: 'modalGuardarTela',
            guardarTela: 'guardarTela',
            editarTela: 'editarTela'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarTela();
                    } else {
                        this.editarTela();
                    }
                }
            });
        }
    }
}
</script>