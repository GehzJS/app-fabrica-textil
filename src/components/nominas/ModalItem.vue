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
                                        <!-- <v-text-field outlined rounded disabled :value="precioLocal" label="Precio de la nomina" prepend-inner-icon="euro_symbol" suffix="MXN"></v-text-field> -->
                                        <v-text-field outlined rounded disabled :value="precioItem" label="Precio" prepend-inner-icon="euro_symbol" suffix="MXN"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions v-if="modal.local == false">
                        <v-spacer></v-spacer>
                        <!-- <v-btn rounded  large color="success" class="mr-5" v-if="modal.boton == true" @click="guardarItem"><v-icon left>save</v-icon>Guardar</v-btn>
                        <v-btn rounded  large color="success" class="mr-5" v-if="modal.boton == false" @click="editarItem"><v-icon left>edit</v-icon>Editar</v-btn> -->
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
                        <!-- <v-btn rounded  large color="success" class="mr-5" v-if="modal.boton == false" @click="editarRegistroItem">
                            <v-icon left>edit</v-icon>Editar
                        </v-btn> -->
                    </v-card-actions>
                    <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded  large color="error" class="mr-5" @click="modalGuardarItem({estado: false})"><v-icon left>reply</v-icon>Cancelar</v-btn>
                        <v-btn rounded  large color="success" class="mr-5" v-if="modal.boton == true" @click="guardarRegistroItem"><v-icon left>save</v-icon>Guardar</v-btn>
                        <v-btn rounded  large color="success" class="mr-5" v-if="modal.boton == false" @click="editarRegistroItem"><v-icon left>edit</v-icon>Editar</v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { NominaService } from '@/services/NominaService.js';

const nominaService = new NominaService();

export default {
    name: 'ModalItemNomina',
    data() {
        return {
            mostrar: false,
            valido: true
        }
    },
    computed: {
        ...mapFields('nominas', [
            'item'
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion,
            nombre: state => state.nombre,
            cantidad: state => state.cantidad
        }),
        ...mapState('nominas', {
            operaciones: state => state.operaciones
        }),
        ...mapGetters('nominas', {
            precioItem: 'precioItem',
            // precioLocal: 'precioLocal'
        })
    },
    methods: {
        ...mapMutations('nominas', {
            asignarNomina: 'asignarNomina',
            limpiarNomina: 'limpiarNomina',
            registrarItems: 'registrarItems'
        }),
        ...mapActions('nominas', {
            modalGuardarItem: 'modalGuardarItem',
            guardarRegistroItem: 'guardarRegistroItem',
            editarRegistroItem: 'editarRegistroItem',
            borrarRegistroItem: 'borrarRegistroItem',
            guardarItem: 'guardarItem',
            editarItem: 'editarItem'
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