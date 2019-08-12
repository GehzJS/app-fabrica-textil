<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="modal.imprimir" persistent max-width="60vw">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>¿Está seguro que desea imprimir ésta factura de adquisición?</v-toolbar-title>
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
                        <v-btn rounded large color="error" class="mr-3" @click="modalImprimirAdquisicion({estado: false})">
                            <v-icon left>reply</v-icon>Cancelar
                        </v-btn>
                        <v-btn rounded large color="success" class="mr-3" @click="imprimirAdquisicion">
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
                                <h4>No. {{adquisicion.id}}</h4>
                            </th>
                        </div>
                    </tr>
                </thead>
            </table>
            <table class="table table-bordered">
                <tbody>
                    <div class="col-4">
                        <td><span class="font-weight-bolder">Estado: </span>{{adquisicion.estado}}</td>
                    </div>
                    <div class="col-8">
                        <td><span class="font-weight-bolder">Proveedor: </span>{{adquisicion.proveedor}}</td>
                    </div>
                </tbody>
            </table>
            <table class="table table-bordered">
                <tbody>
                    <div class="col-12">
                        <td><span class="font-weight-bolder">Descripción: </span>{{adquisicion.descripcion}}</td>
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
                        <th scope="col">Tela</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in adquisicion.items" :key="item.id">
                        <td scope="row">{{ item.tela_id }}</td>
                        <td>{{ item.cantidad }}</td>
                        <td>{{ item.precio }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered">
                <div class="col-12">
                    <th scope="col" class="text-right align-middle">
                        <h4>Total: {{adquisicion.total}}</h4>
                    </th>
                </div>
            </table>
        </v-container>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { AdquisicionService } from '@/services/AdquisicionService.js';

const adquisicionService = new AdquisicionService();

export default {
    name: 'ModalImprimirAdquisiciones',
    computed: {
        ...mapState('general', {
            tema: state => state.tema,
            modal: state => state.modal
        }),
        ...mapState('adquisiciones', {
            adquisicion: state => state.adquisicion
        })
    },
    methods: {
        ...mapActions('adquisiciones', {
            modalImprimirAdquisicion: 'modalImprimirAdquisicion'
        }),
        imprimirAdquisicion() {
            this.$htmlToPaper('imprimir', () => {});
            this.modalImprimirAdquisicion({ estado: false });
        }
    },
}
</script>
<style>
.v-sheet {
    width: 100%;
}
</style>