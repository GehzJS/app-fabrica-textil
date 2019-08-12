<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Registre su primer modelo</h6>
                    <p class="body-1">Los registros de modelos le ayudan a mantener a la mano la información que usted necesita, a sólo unos clicks de distancia. Además, son usados para crear las
                        <span class="font-weight-bold">facturas de venta, operaciones, lotes y defectos</span>.</p>
                    <v-form ref="form" v-model="valido" lazy-validation>
                        <v-layout wrap>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="modelo.nombre" label="Nombre *" prepend-inner-icon="shopping_basket" hint="Ejemplo: Modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="modelo.precio" label="Precio *" prepend-inner-icon="euro_symbol" suffix="MXN" hint="Ejemplo: 100.00 (Precio en pesos)." v-validate="'required|decimal:2|min:5|max:7'" :counter="7" :error-messages="errors.collect('precio')" data-vv-name="precio" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="modelo.stock" label="Stock *" prepend-inner-icon="donut_small" hint="Ejemplo: 10 (Cantidad por pieza)." v-validate="'required|decimal:2|min:1|max:5'" :counter="5" :error-messages="errors.collect('stock')" data-vv-name="stock" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-select outlined rounded :items="para" v-model="modelo.para" label="Para *" prepend-inner-icon="wc" v-validate="'required'" :error-messages="errors.collect('para')" data-vv-name="para" required></v-select>
                            </v-flex>
                            <v-flex xs8>
                                <v-textarea outlined rounded clearable auto-grow rows="1" v-model="modelo.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: El modelo X es nuestro producto estrella." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
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
        <v-btn text rounded large color="success" @click="cambiarPagina({tipo: false, pagina: 7})" class="mb-1">
            <v-icon left>check_circle</v-icon>Omitir
        </v-btn>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'ModeloInicio',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true,
            // precio: '##.##'
        }
    },
    computed: {
        ...mapState('general', {
            nombre: state => state.nombre,
            cantidad: state => state.cantidad,
            precio: state => state.precio,
        }),
        ...mapFields('setup', [
            'modelo',
            'para'
        ])
    },
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        }),
        ...mapActions('setup', {
            guardarModelo: 'guardarModelo'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    this.guardarModelo();
                }
            });
        }
    }
}
</script>