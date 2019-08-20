let state = {
    modelo: {},
    modelos: [],
    busqueda: '',
    columna: 'nombre',
    paginacion: {
        pagina: 1,
        total: 10,
        registros: 10
    },
    registros: [10, 25, 50, 100],
    titulos: [
        { text: 'Nombre', sortable: false, value: 'nombre' },
        { text: 'Tipo', sortable: false, value: 'tipo' },
        { text: 'Material', sortable: false, value: 'material' },
        { text: 'Para', sortable: false, value: 'para' },
        { text: 'Talla', sortable: false, value: 'talla' },
        { text: 'Colores', sortable: false, value: 'colores' },
        { text: 'Stock', sortable: false, value: 'stock' },
        { text: 'Precio', sortable: false, value: 'precio' },
        { text: 'Descripción', sortable: false, value: 'descripcion' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    materiales: [],
    tallas: [],
    tipos: [],
    para: [
        'Niña',
        'Niño',
        'Dama',
        'Caballero'
    ],
    campos: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Tipo', clave: 'tipo' },
        { nombre: 'Material', clave: 'material' },
        { nombre: 'Para', clave: 'para' },
        { nombre: 'Talla', clave: 'talla' },
        { nombre: 'Precio', clave: 'precio' }
    ]
};

export default state;