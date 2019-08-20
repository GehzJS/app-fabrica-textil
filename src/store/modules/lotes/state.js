let state = {
    lote: {},
    lotes: [],
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
        { text: 'Lote', sortable: false, value: 'id' },
        { text: 'Cantidad', sortable: false, value: 'cantidad' },
        { text: 'Modelo', sortable: false, value: 'modelo' },
        { text: 'Descripción', sortable: false, value: 'descripcion' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
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