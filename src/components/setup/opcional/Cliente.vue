<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Registre su primer cliente</h6>
                    <p class="body-1">Los registros de clientes le ayudan a mantener a la mano la información que usted necesita, a sólo unos clicks de distancia. Además, son usados para crear las
                        <span class="font-weight-bold">facturas de venta</span>.</p>
                    <v-form ref="form" v-model="valido" lazy-validation>
                        <v-layout wrap>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="cliente.nombre" label="Nombre *" prepend-inner-icon="person" hint="Ejemplo: José." v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="cliente.apellido_p" label="Apellido paterno *" prepend-inner-icon="people" hint="Ejemplo: Pérez." v-validate="'required|alpha|min:3|max:15'" :counter="15" :error-messages="errors.collect('apellido_paterno')" data-vv-name="apellido_paterno" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="cliente.apellido_m" label="Apellido materno *" prepend-inner-icon="people" hint="Ejemplo: León." v-validate="'required|alpha|min:3|max:15'" :counter="15" :error-messages="errors.collect('apellido_materno')" data-vv-name="apellido_materno" required></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field outlined rounded clearable v-model="cliente.correo" label="Correo electrónico *" prepend-inner-icon="email" hint="Ejemplo: jose_123@gmail.com." v-validate="'required|email|min:12|max:30'" :counter="30" :error-messages="errors.collect('correo')" data-vv-name="correo" required></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field outlined rounded clearable v-model="cliente.telefono" label="Teléfono móvil *" prepend-inner-icon="call" v-mask="telefono" hint="Ejemplo: 123-456-7890." v-validate="'required|alpha_dash|min:12|max:12'" :counter="12" :error-messages="errors.collect('telefono')" data-vv-name="telefono" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="validarFormulario" class="mb-1 mr-3">
            <v-icon left>check_circle</v-icon>Continuar
        </v-btn>
        <v-btn text rounded large color="success" @click="cambiarPagina({tipo: false, pagina: 3})" class="mb-1">
            <v-icon left>check_circle</v-icon>Omitir
        </v-btn>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'ClienteInicio',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: false,
            // telefono: '###-###-####'
        }
    },
    computed: {
        ...mapState('general', {
            nombre: state => state.nombre,
            telefono: state => state.telefono
        }),
        ...mapFields('setup', [
            'cliente',
        ])
    },
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        }),
        ...mapActions('setup', {
            guardarCliente: 'guardarCliente'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    this.guardarCliente();
                }
            });
        }
    }
}
</script>