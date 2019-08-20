let state = {
    tela: {},
    telas: [],
    secciones: [],
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
        { text: 'Seccion', sortable: false, value: 'seccion' },
        { text: 'Color', sortable: false, value: 'colores' },
        { text: 'Stock', sortable: false, value: 'stock' },
        { text: 'Precio', sortable: false, value: 'precio' },
        { text: 'Características', sortable: false, value: 'caracteristicas' },
        { text: 'Fecha de registro', sortable: false, value: 'registro' },
        { text: 'Acciones', sortable: false, value: 'action' }
    ],
    campos: [
        { nombre: 'Nombre', clave: 'nombre' },
        { nombre: 'Sección', clave: 'seccion' },
        { nombre: 'Precio', clave: 'precio' }
    ],
};

export default state;