let state = {
    usuario: {},
    usuarios: [],
    empleados: [],
    busqueda: '',
    columna_usuario: 'usuario',
    columna_empleado: 'nombre',
    rol: 'todos',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [
        { text: 'Usuario', sortable: false, value: 'usuario' },
        { text: 'Empleado', sortable: false, value: 'empleado' },
        { text: 'Rol', sortable: false, value: 'rol' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    roles: [
        'usuario',
        'superusuario',
        'administrador'
    ],
    campos_usuario: [
        { nombre: 'Usuario', clave: 'usuario' }
    ],
    campos_empleado: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Apellido paterno', clave: 'apellido_p' },
        { nombre: 'Apellido materno', clave: 'apellido_m' },
        { nombre: 'Correo electrónico', clave: 'correo' },
        { nombre: 'Teléfono', clave: 'telefono' }
    ],
    listado: [
        { nombre: 'Todos', clave: 'todos' },
        { nombre: 'Usuarios', clave: 'usuario' },
        { nombre: 'Superusuarios', clave: 'superusuario' },
        { nombre: 'Administradores', clave: 'administrador' }
    ]
};

export default state;