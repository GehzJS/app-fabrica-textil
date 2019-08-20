let state = {
    defecto: {},
    defectos: [],
    modelos: [],
    empleados: [],
    busqueda: '',
    columna_empleado: 'nombre',
    columna_modelo: 'nombre',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [
        { text: 'Defecto', sortable: false, value: 'id' },
        { text: 'Cantidad', sortable: false, value: 'cantidad' },
        { text: 'Modelo', sortable: false, value: 'modelo' },
        { text: 'Empleado', sortable: false, value: 'empleado' },
        { text: 'Descripción', sortable: false, value: 'descripcion' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    campos_empleado: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Apellido paterno', clave: 'apellido_p' },
        { nombre: 'Apellido materno', clave: 'apellido_m' },
        { nombre: 'Correo electrónico', clave: 'correo' },
        { nombre: 'Teléfono', clave: 'telefono' }
    ],
    campos_modelo: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Tipo', clave: 'tipo' },
        { nombre: 'Material', clave: 'material' },
        { nombre: 'Para', clave: 'para' },
        { nombre: 'Talla', clave: 'talla' },
        { nombre: 'Precio', clave: 'precio' }
    ]
};

export default state;