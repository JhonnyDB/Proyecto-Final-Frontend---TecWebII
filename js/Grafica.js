fetch('http://localhost:3000/graficos')
    .then(response => response.json())
    .then(data => {
    const datos = [];

    data.forEach((fila) => {
        const objeto = {
        NombreProducto: fila.NombreProducto,
        Cantidad: fila.Cantidad
        };
        datos.push(objeto);
    });

    new Morris.Bar({
        element: 'grafico',
        data: datos,
        xkey: 'NombreProducto',
        ykeys: ['Cantidad'],
        labels: ['Cantidad']
    });
})

.catch(error => console.error(error));