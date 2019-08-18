<template>
    <div>
        <v-layout row justify-center>
            <v-dialog persistent v-model="modal.guardar" max-width="80vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Datos del venta</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>local_offer</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form ref="form" v-model="valido" lazy-validation>
                                <v-layout wrap>
                                    <v-flex xs6>
                                        <v-autocomplete outlined rounded v-model="venta.cliente_id" :items="clientes" item-text="nombre_cliente" item-value="id" label="Cliente *" prepend-inner-icon="shopping_cart" v-validate="'required'" :error-messages="errors.collect('cliente')" data-vv-name="cliente" required></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-select outlined rounded :items="estados" item-text="estado" item-value="valor" v-model="venta.estado" label="Estado *" prepend-inner-icon="assignment_late" v-validate="'required'" :error-messages="errors.collect('estado')" data-vv-name="estado" required></v-select>
                                    </v-flex>
                                    <v-flex xs9>
                                        <v-textarea outlined rounded clearable auto-grow rows="1" row-height="15" v-model="venta.descripcion" label="Descripción *" prepend-inner-icon="assignment" hint="Ejemplo: Ventas realizadas por el empleado x." v-validate="'required|alpha_spaces|min:10|max:256'" :counter="256" :error-messages="errors.collect('descripcion')" data-vv-name="descripcion" required></v-textarea>
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
                                        <v-data-table fixed-header hide-default-footer :headers="itemsTitulos" :items="itemsVentas" height="22vh" class="text-capitalize" v-if="modal.local == true">
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
                                        <v-data-table fixed-header hide-default-footer :headers="itemsTitulos" :items="venta.items" height="22vh" class="text-capitalize" v-if="modal.local == false">
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
                        <v-btn rounded large color="error" class="mr-5" @click="modalGuardarVenta({estado: false})">
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

export default {
    name: 'ModalGuardarVentas',
    data() {
        return {
            valido: true
        }
    },
    computed: {
        ...mapFields('ventas', [
            'venta'
        ]),
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('ventas', {
            clientes: state => state.clientes,
            estados: state => state.estados,
            itemsTitulos: state => state.itemsTitulos,
            itemsVentas: state => state.itemsVentas
        }),
        ...mapGetters('ventas', {
            total: 'total',
            totalLocal: 'totalLocal',
            local: 'local'
        }),
        validarItems() {
            if (this.itemsVentas.length > 0) {
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
                        this.guardarVenta();
                    } else {
                        this.editarVenta();
                    }
                }
            });
        },
        ...mapActions('ventas', {
            modalGuardarVenta: 'modalGuardarVenta',
            modalGuardarItem: 'modalGuardarItem',
            modalBorrarItem: 'modalBorrarItem',
            guardarVenta: 'guardarVenta',
            editarVenta: 'editarVenta'
        })
    }
}
</script>