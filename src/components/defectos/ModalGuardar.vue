<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del defecto</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>notification_important</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-autocomplete outlined rounded v-model="defecto.modelo_id" :items="modelos" item-text="nombreModelo" item-value="id" label="Modelo *" prepend-inner-icon="shopping_basket" v-validate="'required'" :error-messages="errors.collect('modelo')" data-vv-name="modelo" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-autocomplete outlined rounded v-model="defecto.empleado_id" :items="empleados" item-text="nombreEmpleado" item-value="id" label="Empleado *" prepend-inner-icon="how_to_reg" v-validate="'required'" :error-messages="errors.collect('empleado')" data-vv-name="empleado" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs5>
                                        <v-text-field outlined rounded clearable v-model="defecto.cantidad" label="Cantidad *" prepend-inner-icon="speaker_notes" hint="Ejemplo: 10 (Cantidad por defectos generados)." v-validate="'required|numeric|min:1|max:5'" :counter="5" :error-messages="errors.collect('cantidad')" data-vv-name="cantidad" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs7>
                                        <v-textarea outlined rounded clearable rows="1" auto-grow v-model="defecto.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: Defecto generado por José mientras fabricaba el modelo X." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
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
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarDefecto({estado: false})">
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
import { DefectoService } from '@/services/DefectoService.js';

const defectoService = new DefectoService();

export default {
    name: 'ModalGuardarDefectos',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true,
            // precio: '##.##'
        }
    },
    computed: {
        ...mapFields('defectos', [
            'defecto',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion,
            nombre: state => state.nombre,
            cantidad: state => state.cantidad
        }),
        ...mapState('defectos', {
            defectos: state => state.defectos,
            modelos: state => state.modelos,
            empleados: state => state.empleados
        })
    },
    methods: {
        ...mapMutations('defectos', {
            asignarDefecto: 'asignarDefecto',
            limpiarDefecto: 'limpiarDefecto'
        }),
        ...mapActions('defectos', {
            modalGuardarDefecto: 'modalGuardarDefecto',
            guardarDefecto: 'guardarDefecto',
            editarDefecto: 'editarDefecto'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarDefecto();
                    } else {
                        this.editarDefecto();
                    }
                }
            });
        }
    }
}
</script>