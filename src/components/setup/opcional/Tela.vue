<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Registre su primer tela</h6>
                    <p class="body-1">Los registros de telas le ayudan a mantener a la mano la información que usted necesita, a sólo unos clicks de distancia. Además, son usados para crear las
                        <span class="font-weight-bold">facturas de venta y operaciones</span>.</p>
                    <v-form ref="form" v-model="valido" lazy-validation>
                        <v-layout>
                            <v-flex xs8>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="tela.nombre" label="Nombre *" prepend-inner-icon="style" hint="Ejemplo: Tela X." v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-textarea outlined rounded clearable auto-grow rows="1" v-model="tela.caracteristicas" label="Características *" prepend-inner-icon="assignment" hint="Ejemplo: Tela X color blanco." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('caracteristicas')" data-vv-name="caracteristicas" required></v-textarea>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="tela.stock" label="Stock *" prepend-inner-icon="donut_small" suffix="mts." hint="Ejemplo: 10.00 (Cantidad en metros)." v-validate="'required|decimal:2|min:1|max:5'" :counter="5" :error-messages="errors.collect('stock')" data-vv-name="stock" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="tela.precio" label="Precio *" prepend-inner-icon="euro_symbol" suffix="MXN" hint="Ejemplo: 50.00 (Precio en pesos por metro)." v-validate="'required|decimal:2|min:5|max:7'" :counter="7" :error-messages="errors.collect('precio')" data-vv-name="precio" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-layout align-start justify-center fill-height>
                                    <v-flex xs12>
                                        <h4 class="subtitle-1">
                                            <v-icon left>color_lens</v-icon>Color *
                                        </h4>
                                        <v-color-picker v-model="tela.color" flat hide-canvas hide-inputs hide-mode-switch show-swatches swatches-max-height="65" mode="hexa" v-validate="'required'" :error-messages="errors.collect('tela')" data-vv-name="tela" required></v-color-picker>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="validarFormulario" class="mb-1 mr-3">
            <v-icon left>check_circle</v-icon>Continuar
        </v-btn>
        <v-btn text rounded large color="success" @click="cambiarPagina({tipo: false, pagina: 6})" class="mb-1">
            <v-icon left>check_circle</v-icon>Omitir
        </v-btn>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'TelaInicio',
    data() {
        return {
            valido: true
        }
    },
    computed: {
        ...mapState('general', {
            cantidad: state => state.cantidad,
            precio: state => state.precio,
        }),
        ...mapFields('setup', [
            'tela'
        ])
    },
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        }),
        ...mapActions('setup', {
            guardarTela: 'guardarTela'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    this.guardarTela();
                }
            });
        }
    }
}
</script>