<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.imprimir" persistent max-width="60vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>¿Está seguro que desea imprimir ésta factura de venta?</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>help</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert text prominent type="info" class="my-2">
                            Asegúrese de mantener ésta factura de forma segura, ya que podría contener ciertos datos sensibles de su empresa.
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded large color="error" class="mr-3" @click="modalImprimirVenta({estado: false})">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-3" @click="imprimirVenta">
                            <v-icon left>print</v-icon>Imprimir
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-container fluid id="imprimir" v-show="false" class="mt-5">
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <div class="col-3">
                            <th class="text-center align-middle"><img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="logo" style="width: 70px; height: auto;"></th>
                        </div>
                        <div class="col-4">
                            <th scope="col" class="text-center">
                                <span class="font-weight-bolder">Nombre de la empresa</span><br>
                                <span class="font-weight-normal">Dirección de la empresa</span><br>
                                <span class="font-weight-normal">Teléfono de la empresa</span><br>
                                <span class="font-weight-normal">Correo de la empresa</span>
                            </th>
                        </div>
                        <div class="col-3">
                            <th scope="col" class="text-center align-middle">
                                <h4>No. {{venta.id}}</h4>
                            </th>
                        </div>
                    </tr>
                </thead>
            </table>
            <table class="table table-bordered">
                <tbody>
                    <div class="col-4">
                        <td><span class="font-weight-bolder">Estado: </span>{{venta.estado}}</td>
                    </div>
                    <div class="col-8">
                        <td><span class="font-weight-bolder">Cliente: </span>{{venta.cliente}}</td>
                    </div>
                </tbody>
            </table>
            <table class="table table-bordered">
                <tbody>
                    <div class="col-12">
                        <td><span class="font-weight-bolder">Descripción: </span>{{venta.descripcion}}</td>
                    </div>
                </tbody>
            </table>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Telas adquiridas</th>
                    </tr>
                </thead>
            </table>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Modelo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in venta.items" :key="item.id">
                        <td scope="row">{{ item.modelo_id }}</td>
                        <td>{{ item.cantidad }}</td>
                        <td>{{ item.precio }}</td>
                    </tr>
                </tbody>
                <table class="table table-bordered">
                    <div class="col-12">
                        <th scope="col" class="text-right align-middle">
                            <h4>Total: {{venta.total}}</h4>
                        </th>
                    </div>
                </table>
            </table>
        </v-container>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'ModalImprimirVentaes',
    computed: {
        ...mapState('general', {
            modal: state => state.modal
        }),
        ...mapState('ventas', {
            venta: state => state.venta
        })
    },
    methods: {
        ...mapActions('ventas', {
            modalImprimirVenta: 'modalImprimirVenta'
        }),
        imprimirVenta() {
            this.$htmlToPaper('imprimir', () => {});
            this.modalImprimirVenta({ estado: false });
        }
    },
}
</script>