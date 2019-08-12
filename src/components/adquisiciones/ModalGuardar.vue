<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del adquisicion</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>local_mall</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-autocomplete outlined rounded v-model="adquisicion.proveedor_id" :items="proveedores" item-text="nombre_proveedor" item-value="id" label="Proveedor *" prepend-inner-icon="local_shipping" v-validate="'required'" :error-messages="errors.collect('proveedor')" data-vv-name="proveedor" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-select outlined rounded :items="estados" item-text="estado" item-value="valor" v-model="adquisicion.estado" label="Estado *" prepend-inner-icon="assignment_late" v-validate="'required'" :error-messages="errors.collect('estado')" data-vv-name="estado" required></v-select>
                                    </v-flex>
                                    <v-flex xs9>
                                        <v-textarea outlined rounded clearable auto-grow rows="1" v-model="adquisicion.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: Tela adquirida para el modelo X." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field outlined rounded disabled label="Total" :value="totalLocal" prepend-inner-icon="euro_symbol" suffix="MXN" v-if="modal.local == true"></v-text-field>
                                        <v-text-field outlined rounded disabled label="Total" :value="total" prepend-inner-icon="euro_symbol" suffix="MXN" v-if="modal.local == false"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <h4 class="subtitle-1 ml-5">
                                            <v-icon left>vertical_split</v-icon>Ingrese al menos un artículo *
                                        </h4>
                                        <v-data-table fixed-header hide-default-footer :headers="itemsTitulos" :items="itemsAdquisiciones" height="22vh" v-if="modal.local == true">
                                            <template v-slot:item.action="{ item }">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarItem({item: item, estado: true, local: true})" v-on="on">
                                                            <v-icon>delete</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Borrar</span>
                                                </v-tooltip>
                                            </template>
                                            <template v-slot:no-data>
                                                <v-alert text prominent :value="true" type="info">
                                                    Esta factura aún no cuenta con ningún artículo. Agregue al menos uno para continuar.
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                        <v-data-table fixed-header hide-default-footer :headers="itemsTitulos" :items="adquisicion.items" height="22vh" v-if="modal.local == false">
                                            <!-- <template v-slot:item.action="{ item }">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn icon x-small color="error" class="ml-0" @click="modalBorrarItem({item: item, estado: true, local: false})" v-on="on">
                                                            <v-icon>delete</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Borrar</span>
                                                </v-tooltip>
                                            </template> -->
                                            <template v-slot:no-data>
                                                <v-alert text prominent :value="true" type="info">
                                                    Esta factura aún no cuenta con ningún artículo. Agregue al menos uno para continuar.
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn rounded large color="info" class="ml-5" v-if="modal.boton == true" @click="modalGuardarItem({estado: true, local: true})">
                            <v-icon left>note_add</v-icon> Agregar un artículo
                        </v-btn>
                        <v-btn rounded large color="info" class="ml-5" v-if="modal.boton == false" @click="modalGuardarItem({estado: true, local: false})">
                            <v-icon left>note_add</v-icon> Agregar un artículo
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == true" @click="validarFormulario" :disabled="validarItems">
                            <v-icon left>save</v-icon> Guardar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-5" v-if="modal.boton == false" @click="validarFormulario">
                            <v-icon left>edit</v-icon> Editar
                        </v-btn>
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarAdquisicion({estado: false})">
                            <v-icon left>reply</v-icon> Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { AdquisicionService } from '@/services/AdquisicionService.js';

const adquisicionService = new AdquisicionService();

export default {
    name: 'ModalGuardarAdquisiciones',
    data() {
        return {
            mostrar: false,
            valido: true
        }
    },
    computed: {
        ...mapFields('adquisiciones', [
            'adquisicion',
        ]),
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal,
            carga: state => state.carga,
            notificacion: state => state.notificacion,
            nombre: state => state.nombre
        }),
        ...mapState('adquisiciones', {
            proveedores: state => state.proveedores,
            estados: state => state.estados,
            itemsTitulos: state => state.itemsTitulos,
            itemsAdquisiciones: state => state.itemsAdquisiciones
        }),
        ...mapGetters('adquisiciones', {
            total: 'total',
            totalLocal: 'totalLocal',
            local: 'local',
            numeroProveedores: 'numeroProveedores'
        }),
        validarItems() {
            if (this.itemsAdquisiciones.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    if (this.modal.boton) {
                        this.guardarAdquisicion();
                    } else {
                        this.editarAdquisicion();
                    }
                }
            });
        },
        ...mapMutations('adquisiciones', {
            asignarAdquisicion: 'asignarAdquisicion',
            limpiarAdquisicion: 'limpiarAdquisicion'
        }),
        ...mapActions('adquisiciones', {
            modalGuardarAdquisicion: 'modalGuardarAdquisicion',
            modalGuardarItem: 'modalGuardarItem',
            modalEditarItem: 'modalEditarItem',
            modalBorrarItem: 'modalBorrarItem',
            modalRegistroProveedores: 'modalRegistroProveedores',
            guardarAdquisicion: 'guardarAdquisicion',
            editarAdquisicion: 'editarAdquisicion'
        })
    }
}
</script>