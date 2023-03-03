new Morris.Line({
        
    element: 'myfirstchart',
    data: [
        { year: '2008', value: 20, value2: 30 },
        { year: '2009', value: 10, value2: 40 },
        { year: '2010', value: 5, value2: 10 },
        { year: '2011', value: 5, value2: 5 },
        { year: '2012', value: 30, value2: 20 },
        { year: '2013', value: 45, value2: 21 }    , 
        { year: '2014', value: 5, value2: 10 },
        { year: '2015', value: 5, value2: 5 },
        { year: '2016', value: 30, value2: 20 },
        { year: '2017', value: 45, value2: 21 }    ,
        { year: '2018', value: 30, value2: 20 },
        { year: '2019', value: 45, value2: 21 }   ,
        { year: '2020', value: 30, value2: 20 },
        { year: '2021', value: 45, value2: 21 }   
    ],
    
    xkey: 'year',
    
    ykeys: ['value', 'value2'],
    lineWidth: 1,
    
    labels: ['Coca Cola', 'Pepsi'],
    resize: true,
    lineColors: ['#FF5733','#800080']
});