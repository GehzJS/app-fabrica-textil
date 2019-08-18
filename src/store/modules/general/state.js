let state = {
    tema: false,
    navegacion: true,
    cargandoTabla: false,
    precio: '#?#?#?#.##',
    cantidad: '#####',
    telefono: '###-###-####',
    nombre: 'AAAAAAAAAAAAAAAAAAAAA',
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
            titulo: 'Almacén',
            icono: 'move_to_inbox',
            items: [
                { titulo: 'Modelos', icono: 'shopping_basket', enlace: 'modelos' },
                { titulo: 'Telas', icono: 'style', enlace: 'telas' }
            ]
        },
        {
            titulo: 'Extras',
            icono: 'extension',
            items: [
                { titulo: 'Maquinas', icono: 'settings_input_component', enlace: 'maquinas' },
                { titulo: 'Materiales', icono: 'view_carousel', enlace: 'materiales' },
                { titulo: 'Secciones', icono: 'view_compact', enlace: 'secciones' },
                { titulo: 'Tallas', icono: 'dashboard', enlace: 'tallas' },
                { titulo: 'Tipos', icono: 'bookmark', enlace: 'tipos' }
            ]
        },
        {
            titulo: 'Facturación',
            icono: 'assignment_turned_in',
            items: [
                { titulo: 'Adquisiciones', icono: 'local_mall', enlace: 'adquisiciones' },
                { titulo: 'Nóminas', icono: 'beenhere', enlace: 'nominas' },
                { titulo: 'Ventas', icono: 'local_offer', enlace: 'ventas' }
            ]
        },
        {
            titulo: 'Personas',
            icono: 'group_add',
            items: [
                { titulo: 'Clientes', icono: 'shopping_cart', enlace: 'clientes' },
                { titulo: 'Empleados', icono: 'how_to_reg', enlace: 'empleados' },
                { titulo: 'Proveedores', icono: 'local_shipping', enlace: 'proveedores' }
            ]
        },
        {
            titulo: 'Producción',
            icono: 'category',
            items: [
                { titulo: 'Defectos', icono: 'notification_important', enlace: 'defectos' },
                { titulo: 'Lotes', icono: 'vertical_split', enlace: 'lotes' },
                { titulo: 'Operaciones', icono: 'dns', enlace: 'operaciones' }
            ]
        },
        {
            titulo: 'Usuarios',
            icono: 'person_add',
            items: [
                { titulo: 'Perfil', icono: 'folder_shared', enlace: 'perfil' },
                { titulo: 'Usuarios', icono: 'person', enlace: 'usuarios' }
            ]
        }
    ]
};

export default state;