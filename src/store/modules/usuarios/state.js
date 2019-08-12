let state = {
    usuario: {},
    usuarios: [],
    empleados: [],
    busqueda: '',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [{
            text: 'Usuario',
            sortable: false,
            value: 'usuario'
        },
        {
            text: 'Empleado',
            sortable: false,
            value: 'empleado'
        },
        {
            text: 'Rol',
            sortable: false,
            value: 'rol'
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
    roles: [
        'usuario',
        'superusuario',
        'administrador'
    ]
};

export default state;