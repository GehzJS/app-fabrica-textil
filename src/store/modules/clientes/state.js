let state = {
    cliente: {},
    clientes: [],
    busqueda: '',
    paginacion: {
        pagina: 1,
        total: 0,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [{
            text: 'Nombre',
            sortable: false,
            value: 'nombre'
        },
        {
            text: 'Apellido paterno',
            sortable: false,
            value: 'apellido_p'
        },
        {
            text: 'Apellido materno',
            sortable: false,
            value: 'apellido_m'
        },
        {
            text: 'Correo',
            sortable: false,
            value: 'correo'
        },
        {
            text: 'Teléfono',
            sortable: false,
            value: 'telefono'
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
    cargos: [
        'cliente',
        'supercliente',
        'administrador'
    ]
};

export default state;