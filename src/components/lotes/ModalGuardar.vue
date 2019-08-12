<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del lote</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>vertical_split</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-text-field outlined rounded clearable v-model="lote.cantidad" label="Cantidad *" prepend-inner-icon="speaker_notes" hint="Ejemplo: 10 (Cantidad de modelos por lote)." v-validate="'required|numeric|min:1|max:5'" :counter="5" :error-messages="errors.collect('cantidad')" data-vv-name="cantidad" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-autocomplete outlined rounded v-model="lote.modelo_id" :items="modelos" item-text="nombreModelo" item-value="id" label="Modelo *" prepend-inner-icon="shopping_basket" v-validate="'required'" :error-messages="errors.collect('modelo')" data-vv-name="modelo" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea outlined rounded clearable rows="1" auto-grow v-model="lote.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: Lote del modelo X." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
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
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarLote({estado: false})">
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
import { LoteService } from '@/services/LoteService.js';

const loteService = new LoteService();

export default {
    name: 'ModalGuardarLotes',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true,
            // precio: '##.##'
        }
    },
    computed: {
        ...mapFields('lotes', [
            'lote',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion,
            nombre: state => state.nombre,
            cantidad: state => state.cantidad
        }),
        ...mapState('lotes', {
            lotes: state => state.lotes,
            modelos: state => state.modelos,
            maquinas: state => state.maquinas
        })
    },
    methods: {
        ...mapMutations('lotes', {
            asignarLote: 'asignarLote',
            limpiarLote: 'limpiarLote'
        }),
        ...mapActions('lotes', {
            modalGuardarLote: 'modalGuardarLote',
            guardarLote: 'guardarLote',
            editarLote: 'editarLote'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarLote();
                    } else {
                        this.editarLote();
                    }
                }
            });
        }
    }
}
</script>