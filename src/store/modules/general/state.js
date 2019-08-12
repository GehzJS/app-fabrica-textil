let state = {
    tema: false,
    navegacion: true,
    cargandoTabla: false,
    precio: '#?#?#?#.##',
    cantidad: '#####',
    telefono: '###-###-####',
    nombre: 'A?AAAAAAAAAAAAAAAAAAA',
    seccionesBusqueda: [],
    titulos: [],
    notificaciones: [],
    modal: {
        guardar: false,
        borrar: false,
        detalle: false,
        imprimir: false,
        items: false,
        item: false,
        registro: false,
        tipo: '',
        informacion: '',
        enlace: '',
        destino: '',
        local: null,
        boton: null
    },
    carga: {
        texto: '',
        estado: false,
    },
    notificacion: {
        texto: '',
        tipo: '',
        fecha: '',
        estado: false
    },
    fecha: '',
    secciones: [{
            icono: 'local_activity',
            titulo: 'Administrador',
            items: [
                { titulo: 'Gestión de empleados', icono: 'local_activity', enlace: 'empleados' },
                { titulo: 'Gestión de usuarios', icono: 'local_activity', enlace: 'usuarios' },
                { titulo: 'Gestión de modelos', icono: 'local_activity', enlace: 'modelos' },
                { titulo: 'Cantidad por modelo', icono: 'local_activity', enlace: 'lotes' },
                { titulo: 'Detalle de nómina', icono: 'local_activity', enlace: 'nominas' },
                { titulo: 'Datos de la empresa', icono: 'local_activity', enlace: 'empresa' },
                // { titulo: 'Mi cuenta', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Tutoriales', icono: 'local_activity', enlace: '/' }
            ]
        },
        {
            icono: 'local_activity',
            titulo: 'Usuario',
            items: [
                { titulo: 'Mi cuenta', icono: 'local_activity', enlace: 'perfil' },
                // { titulo: 'Tutoriales', icono: 'local_activity', enlace: '/' }
            ]
        },
        {
            icono: 'local_activity',
            titulo: 'Corte',
            items: [
                { titulo: 'Listado de telas', icono: 'local_activity', enlace: 'telas' },
                // { titulo: 'Gestión de secciones', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Inventario de telas', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Gestion de inventario', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Listado de colores', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Tutoriales', icono: 'local_activity', enlace: '/' }
            ]
        },
        {
            icono: 'local_activity',
            titulo: 'Confección',
            items: [
                { titulo: 'Gestión de operaciones', icono: 'local_activity', enlace: 'operaciones' },
                // { titulo: 'Gestión de máquinas', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Operaciones por modelo', icono: 'local_activity', enlace: '/modelos' },
                { titulo: 'Gestión de defectos', icono: 'local_activity', enlace: 'defectos' },
                { titulo: 'Nóminas', icono: 'local_activity', enlace: 'nominas' },
                // { titulo: 'Tutoriales', icono: 'local_activity', enlace: '/' }
            ]
        },
        {
            icono: 'local_activity',
            titulo: 'Terminado',
            items: [
                // { titulo: 'Seguimiento de modelo', icono: 'local_activity', enlace: '/' }
            ]
        },
        {
            icono: 'local_activity',
            titulo: 'Almacén',
            items: [
                // { titulo: 'Tallas', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Tipo de producto', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Secciones', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Almacén de prendas', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Gestión de almacén', icono: 'local_activity', enlace: '/' },
                // { titulo: 'Tutoriales', icono: 'local_activity', enlace: '/' }
            ]
        }
    ]
};

export default state;