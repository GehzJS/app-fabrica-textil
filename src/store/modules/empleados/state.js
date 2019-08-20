let state = {
    empleado: {},
    empleados: [],
    busqueda: '',
    columna: 'nombre',
    cargo: 'todos',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [
        { text: 'Nombre', sortable: false, value: 'nombre' },
        { text: 'Apellido paterno', sortable: false, value: 'apellido_p' },
        { text: 'Apellido materno', sortable: false, value: 'apellido_m' },
        { text: 'Correo', sortable: false, value: 'correo' },
        { text: 'Teléfono', sortable: false, value: 'telefono' },
        { text: 'Cargo', sortable: false, value: 'cargo' },
        { text: '¿Es usuario?', sortable: false, value: 'es_usuario' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    cargos: [
        'empleado',
        'gerente',
        'administrativo'
    ],
    campos: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Apellido paterno', clave: 'apellido_p' },
        { nombre: 'Apellido materno', clave: 'apellido_m' },
        { nombre: 'Correo electrónico', clave: 'correo' },
        { nombre: 'Teléfono', clave: 'telefono' }
    ],
    listado: [
        { nombre: 'Todos', clave: 'todos' },
        { nombre: 'Empleados', clave: 'empleado' },
        { nombre: 'Gerentes', clave: 'gerente' },
        { nombre: 'Administrativos', clave: 'administrativo' }
    ]
};

export default state;