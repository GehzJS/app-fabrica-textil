let state = {
    secciones: [],
    seccion: {},
    accion: 0,
    titulos_secciones: [{
            text: 'Nombre de la sección',
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