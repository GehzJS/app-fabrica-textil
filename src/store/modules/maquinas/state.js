let state = {
    maquinas: [],
    maquina: {},
    accion: 0,
    titulos_maquinas: [{
            text: 'Nombre de la máquina',
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