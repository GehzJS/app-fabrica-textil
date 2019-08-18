<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del operacion</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>dns</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs4>
                                        <v-text-field outlined rounded clearable v-model="operacion.nombre" label="Nombre *" prepend-inner-icon="dns" hint="Ejemplo: Operación X del modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field outlined rounded clearable v-model="operacion.precio" label="Precio *" prepend-inner-icon="euro_symbol" suffix="MXN" hint="Ejemplo: 10.00 (Precio en pesos por pieza realizada)." v-validate="'required|decimal:2|min:5|max:7'" :counter="7" :error-messages="errors.collect('precio')" data-vv-name="precio" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field outlined rounded clearable v-model="operacion.necesario" label="Necesario *" prepend-inner-icon="layers" suffix="cms." hint="Ejemplo: 10 (Cantidad de tela necesaria en centímetros)." v-validate="'required|decimal:2|min:5|max:5'" :counter="5" :error-messages="errors.collect('necesario')" data-vv-name="necesario" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-autocomplete outlined rounded v-model="operacion.maquina" :items="maquinas" item-text="nombre_maquina" item-value="nombre_maquina" label="Máquina *" prepend-inner-icon="settings_input_component" v-validate="'required'" :error-messages="errors.collect('maquina')" data-vv-name="maquina" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-autocomplete outlined rounded v-model="operacion.modelo_id" :items="modelos" item-text="nombre_modelo" item-value="id" label="Modelo *" prepend-inner-icon="shopping_basket" v-validate="'required'" :error-messages="errors.collect('modelo')" data-vv-name="modelo" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-autocomplete outlined rounded v-model="tela" :items="telas" item-text="nombre_tela" return-object label="Tela *" prepend-inner-icon="style" v-validate="'required'" :error-messages="errors.collect('tela')" data-vv-name="tela" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea outlined rounded clearable auto-grow rows="1" v-model="operacion.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: Operación X para hacer el modelo X." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
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
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarOperacion({estado: false})">
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
    name: 'ModalGuardarOperaciones',
    data() {
        return {
            valido: true
        }
    },
    computed: {
        ...mapFields('operaciones', [
            'operacion',
            'tela'
        ]),
        ...mapState('general', {
            modal: state => state.modal,
            cantidad: state => state.cantidad,
            precio: state => state.precio
        }),
        ...mapState('operaciones', {
            operaciones: state => state.operaciones,
            modelos: state => state.modelos,
            telas: state => state.telas,
            maquinas: state => state.maquinas
        })
    },
    methods: {
        ...mapActions('operaciones', {
            modalGuardarOperacion: 'modalGuardarOperacion',
            guardarOperacion: 'guardarOperacion',
            editarOperacion: 'editarOperacion'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarOperacion();
                    } else {
                        this.editarOperacion();
                    }
                }
            });
        }
    }
}
</script>