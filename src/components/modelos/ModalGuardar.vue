<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del modelo</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>shopping_basket</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="modelo.nombre" label="Nombre *" prepend-inner-icon="shopping_basket" hint="Ejemplo: Modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field outlined rounded clearable v-model="modelo.precio" label="Precio *" prepend-inner-icon="euro_symbol" suffix="MXN" hint="Ejemplo: 100.00 (Precio en pesos)." v-validate="'required|decimal:2|min:5|max:7'" :counter="7" :error-messages="errors.collect('precio')" data-vv-name="precio" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field outlined rounded clearable v-model="modelo.stock" label="Stock *" prepend-inner-icon="donut_small" suffix="pzas." hint="Ejemplo: 10 (Cantidad por pieza)." v-validate="'required|decimal:2|min:1|max:5'" :counter="5" :error-messages="errors.collect('stock')" data-vv-name="stock" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-autocomplete outlined rounded v-model="modelo.tipo" :items="tipos" item-text="nombre_tipo" item-value="nombre_tipo" label="Tipo *" prepend-inner-icon="bookmark" v-validate="'required'" :error-messages="errors.collect('tipo')" data-vv-name="tipo" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-autocomplete outlined rounded v-model="modelo.material" :items="materiales" item-text="nombre_material" item-value="nombre_material" label="Material *" prepend-inner-icon="view_carousel" v-validate="'required'" :error-messages="errors.collect('material')" data-vv-name="material" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-select outlined rounded :items="para" v-model="modelo.para" label="Para *" prepend-inner-icon="wc" v-validate="'required'" :error-messages="errors.collect('para')" data-vv-name="para" required></v-select>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-autocomplete outlined rounded v-model="modelo.talla" :items="tallas" item-text="nombre_talla" item-value="nombre_talla" label="Talla *" prepend-inner-icon="dashboard" v-validate="'required'" :error-messages="errors.collect('talla')" data-vv-name="talla" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea outlined rounded clearable auto-grow rows="1" v-model="modelo.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: El modelo X es nuestro producto estrella." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
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
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarModelo({estado: false})">
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
    name: 'ModalGuardarModelos',
    data() {
        return {
            valido: true
        }
    },
    computed: {
        ...mapFields('modelos', [
            'modelo'
        ]),
        ...mapState('general', {
            modal: state => state.modal,
            cantidad: state => state.cantidad,
            precio: state => state.precio
        }),
        ...mapState('modelos', {
            modelos: state => state.modelos,
            tallas: state => state.tallas,
            tipos: state => state.tipos,
            materiales: state => state.materiales,
            para: state => state.para
        })
    },
    methods: {
        ...mapActions('modelos', {
            modalGuardarModelo: 'modalGuardarModelo',
            guardarModelo: 'guardarModelo',
            editarModelo: 'editarModelo'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarModelo();
                    } else {
                        this.editarModelo();
                    }
                }
            });
        }
    }
}
</script>