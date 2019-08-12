let state = {
    venta: {},
    item: {},
    ventas: [],
    items: [],
    itemsVentas: [],
    itemsBorrados: [],
    clientes: [],
    modelos: [],
    indiceItem: -1,
    busqueda: '',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [{
            text: 'Venta',
            sortable: false,
            value: 'id'
        },
        {
            text: 'Cliente',
            sortable: false,
            value: 'cliente'
        },
        {
            text: 'Estado',
            sortable: false,
            value: 'estado'
        },
        {
            text: 'Total',
            sortable: false,
            value: 'total'
        },
        {
            text: 'Descripción',
            sortable: false,
            value: 'descripcion'
        },
        {
            text: 'Fecha de registro',
            sortable: false,
            value: 'registro'
        },
        {
            text: 'Acciones',
            sortable: false,
            value: 'action'
        }
    ],
    estados: ['pendiente', 'pagada'],
    itemsTitulos: [{
            text: 'Modelo',
            sortable: false,
            value: 'modelo'
        },
        {
            text: 'Cantidad',
            sortable: false,
            value: 'cantidad'
        },
        {
            text: 'Precio',
            sortable: false,
            value: 'precio'
        },
        {
            text: 'Acciones',
            sortable: false,
            value: 'action'
        }
    ]
};

export default state;