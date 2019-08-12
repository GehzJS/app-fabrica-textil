let state = {
    lote: {},
    lotes: [],
    modelos: [],
    busqueda: '',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [{
            text: 'Lote',
            sortable: false,
            value: 'id'
        },
        {
            text: 'Cantidad',
            sortable: false,
            value: 'cantidad'
        },
        {
            text: 'Modelo',
            sortable: false,
            value: 'modelo'
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
    ]
};

export default state;