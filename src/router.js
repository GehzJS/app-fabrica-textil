import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "*",
            component: () =>
                import ("./views/Inicio.vue")
        },
        {
            path: "/",
            name: "login",
            component: () =>
                import ("./views/Login.vue")
        },
        {
            path: "/inicio",
            name: "inicio",
            component: () =>
                import ("./views/Inicio.vue")
        },
        {
            path: "/usuarios",
            name: "usuarios",
            component: () =>
                import ("./views/Usuarios.vue")
        },
        {
            path: "/empleados",
            name: "empleados",
            component: () =>
                import ("./views/Empleados.vue")
        },
        {
            path: "/clientes",
            name: "clientes",
            component: () =>
                import ("./views/Clientes.vue")
        },
        {
            path: "/proveedores",
            name: "proveedores",
            component: () =>
                import ("./views/Proveedores.vue")
        },
        {
            path: "/modelos",
            name: "modelos",
            component: () =>
                import ("./views/Modelos.vue")
        },
        {
            path: "/telas",
            name: "telas",
            component: () =>
                import ("./views/Telas.vue")
        },
        {
            path: "/operaciones",
            name: "operaciones",
            component: () =>
                import ("./views/Operaciones.vue")
        },
        {
            path: "/lotes",
            name: "lotes",
            component: () =>
                import ("./views/Lotes.vue")
        },
        {
            path: "/defectos",
            name: "defectos",
            component: () =>
                import ("./views/Defectos.vue")
        },
        {
            path: "/adquisiciones",
            name: "adquisiciones",
            component: () =>
                import ("./views/Adquisiciones.vue")
        },
        {
            path: "/ventas",
            name: "ventas",
            component: () =>
                import ("./views/Ventas.vue")
        },
        {
            path: "/nominas",
            name: "nominas",
            component: () =>
                import ("./views/Nominas.vue")
        },
        {
            path: "/secciones",
            name: "secciones",
            component: () =>
                import ("./views/Secciones.vue")
        },
        {
            path: "/maquinas",
            name: "maquinas",
            component: () =>
                import ("./views/Maquinas.vue")
        },
        {
            path: "/materiales",
            name: "materiales",
            component: () =>
                import ("./views/Materiales.vue")
        },
        {
            path: "/tallas",
            name: "tallas",
            component: () =>
                import ("./views/Tallas.vue")
        },
        {
            path: "/tipos",
            name: "tipos",
            component: () =>
                import ("./views/Tipos.vue")
        }
    ]
});