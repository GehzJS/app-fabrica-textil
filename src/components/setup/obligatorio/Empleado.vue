<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Registre su primer empleado</h6>
                    <p class="body-1">Antes de comenzar, es necesario tener un empleado registrado. En éste caso,
                        <span class="font-weight-bold">se recomienda registrar al gerente o encargado de llevar el control de éste sistema </span>
                        por cuestiones de seguridad.</p>
                    <v-form ref="form" v-model="valido" lazy-validation>
                        <v-layout wrap>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="empleado.nombre" label="Nombre *" prepend-inner-icon="person" hint="Ejemplo: José." v-validate="'required|alpha_spaces|min:3|max:20'" :counter="20" :error-messages="errors.collect('nombre')" data-vv-name="nombre" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="empleado.apellido_p" label="Apellido paterno *" prepend-inner-icon="people" hint="Ejemplo: Pérez." v-validate="'required|alpha|min:3|max:15'" :counter="15" :error-messages="errors.collect('apellido_paterno')" data-vv-name="apellido_paterno" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="empleado.apellido_m" label="Apellido materno *" prepend-inner-icon="people" hint="Ejemplo: León." v-validate="'required|alpha|min:3|max:15'" :counter="15" :error-messages="errors.collect('apellido_materno')" data-vv-name="apellido_materno" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="empleado.correo" label="Correo electrónico *" prepend-inner-icon="email" hint="Ejemplo: jose_123@gmail.com." v-validate="'required|email|min:12|max:30'" :counter="30" :error-messages="errors.collect('correo')" data-vv-name="correo" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field outlined rounded clearable v-model="empleado.telefono" label="Teléfono móvil *" prepend-inner-icon="call" v-mask="telefono" hint="Ejemplo: 123-456-7890." v-validate="'required|alpha_dash|min:12|max:12'" :counter="12" :error-messages="errors.collect('telefono')" data-vv-name="telefono" required></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-select outlined rounded :items="cargos" v-model="empleado.cargo" label="Cargo *" prepend-inner-icon="work" v-validate="'required'" :error-messages="errors.collect('cargo')" data-vv-name="cargo" required></v-select>
                            </v-flex>
                        </v-layout>
                        <p class="body-2 font-weight-bold text-uppercase">( * ) Indica que el campo es requerido.</p>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="validarFormulario" class="mb-1">
            <v-icon left>check_circle</v-icon>Continuar
        </v-btn>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'EmpleadoInicio',
    data() {
        return {
            valido: true,
            validar: true,
            telefono: '###-###-####'
        }
    },
    computed: {
        ...mapState('general', {
            nombre: state => state.nombre,
            telefono: state => state.telefono
        }),
        ...mapFields('setup', [
            'empleado',
        ]),
        ...mapState('setup', {
            cargos: state => state.cargos
        })
    },
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        }),
        ...mapActions('setup', {
            guardarEmpleado: 'guardarEmpleado'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    this.guardarEmpleado();
                }
            });
        }
    }
}
</script>