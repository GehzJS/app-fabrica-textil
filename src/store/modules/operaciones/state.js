let state = {
    operacion: {},
    operaciones: [],
    modelos: [],
    telas: [],
    tela: [],
    maquinas: [],
    busqueda: '',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [{
            text: 'Nombre',
            sortable: false,
            value: 'nombre'
        },
        {
            text: 'Modelo',
            sortable: false,
            value: 'modelo'
        },
        {
            text: 'Tela',
            sortable: false,
            value: 'tela'
        },
        {
            text: 'Color',
            sortable: false,
            value: 'colores'
        },
        {
            text: 'Cantidad necesaria',
            sortable: false,
            value: 'necesario'
        },
        {
            text: 'Máquina',
            sortable: false,
            value: 'maquina'
        },
        {
            text: 'Precio',
            sortable: false,
            value: 'precio'
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