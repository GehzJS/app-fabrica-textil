let state = {
    materiales: [],
    material: {},
    accion: 0,
    titulos_materiales: [{
            text: 'Nombre del material de modelo',
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