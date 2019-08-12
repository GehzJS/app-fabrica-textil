<template>
    <div>
        <v-card flat class=" pa-0 mb-5" height="55vh">
            <v-card-text>
                <v-container grid-list-md>
                    <h6 class="text-center display-1 mb-5">¡Bienvenid@!</h6>
                    <p class="body-1">Ésta aplicación de inventario le ayudará a llevar una 
                        <span class="font-weight-bold">mejor gestión de los recursos materiales y humanos </span> 
                    de su fábrica textil, incluyendo entre sus principales funciones:</p>
                    <ul class="body-1">
                        <li><span class="font-weight-bold">Gestión </span>de sus <span class="font-weight-bold">empleados, proveedores y clientes</span>.</li>
                        <li><span class="font-weight-bold">Gestión </span>de <span class="font-weight-bold">usuarios del sistema</span>, con <span class="font-weight-bold">distintos tipos de roles</span>.</li>
                        <li><span class="font-weight-bold">Gestión </span>de las <span class="font-weight-bold">telas con las que cuenta en su almacén </span> así como de los <span class="font-weight-bold">modelos producidos por su empresa</span>.</li>
                        <li><span class="font-weight-bold">Gestión </span>de las <span class="font-weight-bold">operaciones necesarias para fabricar los modelos </span> así como de los <span class="font-weight-bold">defectos de producción</span>.</li>
                        <li><span class="font-weight-bold">Creación </span>de <span class="font-weight-bold">nóminas </span>mediante las operaciones realizadas por sus empleados.</li>
                        <li><span class="font-weight-bold">Creación </span>de <span class="font-weight-bold">facturas de adquisición de telas y venta de modelos</span>.</li>
                        <li><span class="font-weight-bold">Sistema de notificaciones </span>que lo mantienen al día acerca de todas las operaciones relizadas en el sistema.</li>
                        <li>Entre <span class="font-weight-bold">varias funciones más</span>...</li>
                    </ul>
                </v-container>
            </v-card-text>
        </v-card>
        <v-btn rounded large color="info" @click="cambiarPagina({tipo: true, pagina: 2})" class="mb-1"><v-icon left>check_circle</v-icon>Continuar</v-btn>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Bienvenida',
    methods: {
        ...mapMutations('setup', {
            cambiarPagina: 'cambiarPagina'
        })
    },
}
</script>