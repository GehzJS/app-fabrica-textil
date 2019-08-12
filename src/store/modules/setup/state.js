let state = {
    existe: null,
    carga: false,
    pagina: {
        obligatorio: 0,
        opcional: 0
    },
    setup: {
        obligatorio: true,
        opcional: false,
    },
    empleado: {},
    usuario: {
        rol: 'administrador',
        usuario_id: 0,
    },
    cliente: {},
    proveedor: {},
    tela: {},
    modelo: {
        seccion: '',
        talla: '',
        tipo: ''
    },
    empleadoValido: null,
    usuarioValido: null,
    clienteValido: null,
    proveedorValido: null,
    telaValida: null,
    modeloValido: null,
    cargos: [
        'Empleado',
        'Gerente',
        'Administrador'
    ],
    roles: [
        'Usuario',
        'Superusuario',
        'Administrador'
    ],
    para: [
        'Niña',
        'Niño',
        'Dama',
        'Caballero'
    ]
};

export default state;