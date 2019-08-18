<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.items" max-width="70vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del artículo</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>vertical_split</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-autocomplete outlined rounded v-model="item" :items="operaciones" item-text="nombre_operacion" return-object label="Operacion *" prepend-inner-icon="dns" v-validate="'required'" :error-messages="errors.collect('operacion')" data-vv-name="operacion" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="item.cantidad" label="Cantidad *" prepend-inner-icon="pie_chart" suffix="pzas." :disabled="item.id? false : true" hint="Ejemplo: 10 (Cantidad por pieza realizada)." v-validate="`required|decimal:2|min:1|max:5|between:1,${item.stock_tela}`" :counter="5" :error-messages="errors.collect('cantidad')" data-vv-name="cantidad" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded disabled :value="precioItem" label="Precio" prepend-inner-icon="euro_symbol" suffix="MXN"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions v-if="modal.local == false">
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-5" @click="validarFormulario">
                            <v-icon left>save</v-icon>Guardar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarItem({estado: false, local: false})">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="modal.local == true">
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-5" @click="validarFormulario">
                            <v-icon left>save</v-icon>Guardar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarItem({estado: false, local: true})">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'ModalItemNomina',
    data() {
        return {
            valido: true
        }
    },
    computed: {
        ...mapFields('nominas', [
            'item'
        ]),
        ...mapState('general', {
            modal: state => state.modal,
            cantidad: state => state.cantidad
        }),
        ...mapState('nominas', {
            operaciones: state => state.operaciones
        }),
        ...mapGetters('nominas', {
            precioItem: 'precioItem'
        })
    },
    methods: {
        ...mapActions('nominas', {
            modalGuardarItem: 'modalGuardarItem',
            guardarRegistroItem: 'guardarRegistroItem',
            guardarItem: 'guardarItem',
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    this.guardarRegistroItem();
                }
            });
        }
    }
}
</script>