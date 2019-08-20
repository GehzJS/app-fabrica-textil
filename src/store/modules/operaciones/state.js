let state = {
    operacion: {},
    operaciones: [],
    modelos: [],
    telas: [],
    tela: [],
    maquinas: [],
    busqueda: '',
    columna_operacion: 'nombre',
    columna_modelo: 'nombre',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [
        { text: 'Nombre', sortable: false, value: 'nombre' },
        { text: 'Modelo', sortable: false, value: 'modelo' },
        { text: 'Tela', sortable: false, value: 'tela' },
        { text: 'Color', sortable: false, value: 'colores' },
        { text: 'Cantidad necesaria', sortable: false, value: 'necesario' },
        { text: 'Máquina', sortable: false, value: 'maquina' },
        { text: 'Precio', sortable: false, value: 'precio' },
        { text: 'Descripción', sortable: false, value: 'descripcion' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    campos_operacion: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Precio', clave: 'precio' },
        { nombre: 'Máquina', clave: 'maquina' }
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