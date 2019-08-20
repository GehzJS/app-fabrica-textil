let state = {
    adquisicion: {},
    item: {},
    adquisiciones: [],
    items: [],
    itemsAdquisiciones: [],
    itemsBorrados: [],
    proveedores: [],
    telas: [],
    indiceItem: -1,
    busqueda: '',
    columna: 'nombre',
    estado: 'todas',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [
        { text: 'Adquisicion', sortable: false, value: 'id' },
        { text: 'Proveedor', sortable: false, value: 'proveedor' },
        { text: 'Estado', sortable: false, value: 'estado' },
        { text: 'Total', sortable: false, value: 'total' },
        { text: 'Descripción', sortable: false, value: 'descripcion' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    estados: ['pendiente', 'pagada'],
    itemsTitulos: [
        { text: 'Tela', sortable: false, value: 'tela' },
        { text: 'Cantidad', sortable: false, value: 'cantidad' },
        { text: 'Precio', sortable: false, value: 'precio' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    campos: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Apellido paterno', clave: 'apellido_p' },
        { nombre: 'Apellido materno', clave: 'apellido_m' },
        { nombre: 'Correo electrónico', clave: 'correo' },
        { nombre: 'Teléfono', clave: 'telefono' }
    ],
    listado: [
        { nombre: 'Todas', clave: 'todas' },
        { nombre: 'Pendientes', clave: 'pendiente' },
        { nombre: 'Pagadas', clave: 'pagada' }
    ]
};

export default state;