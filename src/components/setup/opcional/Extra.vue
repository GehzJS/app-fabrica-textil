<template>
    <div>
        <v-card flat class="mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">Registre las opciones extra de modelo y tela</h6>
                    <p class="body-1">Las opciones extra de modelo (tipo, talla, material) y tela (seccion) no estan directamente relacionadas con éstos, sin embargo, son de gran utilidad para crear los registros de
                        <span class="font-weight-bold">modelos y telas</span>.</p>
                    <v-form ref="form" v-model="valido" lazy-validation>
                        <v-layout wrap>
                            <v-flex xs6>
                                <v-text-field outlined rounded clearable v-model="tela.seccion" label="Sección *" prepend-inner-icon="view_compact" hint="Ejemplo: Modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('seccion')" data-vv-name="seccion" required></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field outlined rounded clearable v-model="modelo.tipo" label="Tipo *" prepend-inner-icon="bookmark" hint="Ejemplo: Modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('tipo')" data-vv-name="tipo" required></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field outlined rounded clearable v-model="modelo.talla" label="Talla *" prepend-inner-icon="dashboard" hint="Ejemplo: Modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('talla')" data-vv-name="talla" required></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field outlined rounded clearable v-model="modelo.material" label="Material *" prepend-inner-icon="view_carousel" hint="Ejemplo: Modelo X." v-validate="'required|alpha_spaces|min:5|max:20'" :counter="20" :error-messages="errors.collect('material')" data-vv-name="material" required></v-text-field>
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
        <v-btn text rounded large color="success" @click="cambiarPagina({tipo: false, pagina: 7})" class="mb-1">
            <v-icon left>check_circle</v-icon>Omitir
        </v-btn>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'ModeloInicio',
    data() {
        return {
            verificar: '',
            mostrar: false,
            valido: true,
            // precio: '##.##'
        }
    },
    computed: {
        ...mapState('general', {
            nombre: state => state.nombre,
        }),
        ...mapFields('setup', [
            'modelo',
            'tela'
        ])
    },
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        }),
        ...mapActions('setup', {
            guardarSeccion: 'guardarSeccion',
            guardarTalla: 'guardarTalla',
            guardarTipo: 'guardarTipo',
            guardarMaterial: 'guardarMaterial'
        }),
        validarFormulario() {
            this.$validator.validate().then(valido => {
                if (valido) {
                    this.guardarTodo();
                }
            });
        },
        async guardarTodo() {
            await this.guardarSeccion();
            await this.guardarTalla();
            await this.guardarTipo();
            await this.guardarMaterial();
            this.cambiarPagina({ tipo: false, pagina: 5 });
        }
    }
}
</script>