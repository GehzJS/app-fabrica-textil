import Vue from "vue";
import Vuex from "vuex";
import general from "./modules/general/index";
import navegacion from "./modules/navegacion/index";
import usuarios from "./modules/usuarios/index";
import empleados from "./modules/empleados/index";
import clientes from "./modules/clientes/index";
import proveedores from "./modules/proveedores/index";
import modelos from "./modules/modelos/index";
import operaciones from "./modules/operaciones/index";
import lotes from "./modules/lotes/index";
import defectos from "./modules/defectos/index";
import telas from "./modules/telas/index";
import nominas from "./modules/nominas/index";
import adquisiciones from "./modules/adquisiciones/index";
import ventas from "./modules/ventas/index";
import secciones from "./modules/secciones/index";
import maquinas from "./modules/maquinas/index";
import materiales from "./modules/materiales/index";
import tallas from "./modules/tallas/index";
import tipos from "./modules/tipos/index";
import setup from "./modules/setup/index";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        general,
        navegacion,
        usuarios,
        empleados,
        clientes,
        proveedores,
        modelos,
        operaciones,
        lotes,
        defectos,
        telas,
        nominas,
        adquisiciones,
        ventas,
        secciones,
        maquinas,
        materiales,
        tallas,
        tipos,
        setup
    }
});