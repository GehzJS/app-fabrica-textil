let state = {
    tallas: [],
    talla: {},
    accion: 0,
    titulos_tallas: [{
            text: 'Nombre de la talla del modelo',
            sortable: false,
            value: 'nombre'
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