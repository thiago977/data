/*CONSTS*/
const NUMBER_OF_LINES = 513
/*Variáveis Globais */
var coluna = ''
var columns = [
  ' fftAccX',
  ' fftAccY',
  ' fftAccZ',
  ' fftVelocX',
  ' fftVelocY',
  ' fftVelocZ'
]
var columns2 = [' rmmsX', ' rmmsY', ' rmmsZ']
var datas_up = []
var datas = []
var tracesx = []
var tracesy = []
var tracesz = []

var tracesx2 = []
var tracesy2 = []
var tracesz2 = []
var colorscalered = [
  [0, 'rgb(0, 0, 255)'],
  [0.33, 'rgb(0,255,0)'],
  [0.67, 'rgb(255,255,0)'],
  [1, 'rgb(255,0,0)']
]

function convertDate(a) {
  var date = new Date(a)
  var formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
  var dateString = date.toLocaleDateString('pt-BR', formatOptions)
  // => "02/17/2017, 11:32 PM"

  dateString = dateString.replace(',', '')

  return dateString
}

function removingFrequenciesUntil(a, b, c, d) {
  i = 0
  while (parseFloat(a[0][i + 1]) < d) {
    ++i
  }
  for (var j = 0; j < i; j++) {
    for (var k = 0; k < a.length; k++) {
      a[k].shift()
      b[k].shift()
      c[k].shift()
    }
  }
}

function cleanArrays(...args) {
  for (i = 0; i < arguments.length; i++) {
    arguments[i].length = 0
  }
}

function getOnlyData(a, b) {
  a.forEach(function (item) {
    if (item != '') {
      b.push(item)
    }
  })
}

function createCascadesSeries(rawa, rawb, rawc, a, b, c, d) {
  for (j = 0; j < d; j++) {
    /*Limpa auxialiares a cada espectro percorrido*/
    x2 = []
    y2 = []
    z2 = []
    /*Percorre todo o espectro e coloca os valores nos respectivos auxiliares*/
    for (var i = 0; i < NUMBER_OF_LINES; i++) {
      x2.push(rawa[i + j * NUMBER_OF_LINES])
      y2.push(rawb[i + j * NUMBER_OF_LINES])
      if (
        rawc[i + j * NUMBER_OF_LINES] != 'NaN' &&
        rawc[i + j * NUMBER_OF_LINES] != 'Infinity'
      ) {
        z2.push(rawc[i + j * NUMBER_OF_LINES])
      } else {
        z2.push('0.0')
      }
    }
    /*Coloca o vetor no array de vetor*/
    a.push(x2)
    b.push(y2)
    c.push(z2)
  }
}

function createObject2Plot(a, b, c, d) {
  switch (d) {
    case '3d':
      if (a.length == b.length && a.length == c.length) {
        var obj = []
        for (var j = 0; j < a.length; j++) {
          testobj = {
            x: a[j],
            y: b[j],
            z: c[j],
            type: 'scatter3d',
            hovertemplate:
              '<i>Data</i>: %{x}' +
              '<br><i>Frequência</i>: <b>%{y}Hz</b>' +
              '<br><i>Amplitude</i>: <b>%{z}g</b>',
            mode: 'lines',
            opacity: 1,
            line: {
              color: c[j],
              cmin: 0,
              cmid: 2.5,
              cmax: 5,
              width: 4,
              colorscale: colorscalered
            }
          }
          obj.push(testobj)
        }
        return obj
      }
      break
    case '2d':
      if (a.length == b.length) {
        //var obj
        testobj = {
          line: {
            shape: 'spline',
            smoothing: 0.3
          },
          x: a,
          y: b,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {
            size: 1,
            symbol: 'circle-open',
            line: {
              width: 1
            }
          },
          hovertemplate:
            '<br><i>Frequência</i>: <b>%{x}Hz</b>' +
            '<br><i>Amplitude</i>: <b>%{y}g</b>'
        }
        //obj.push(testobj)
        return testobj
      }
      break
    default:
      console.log('Sorry, we are out of')
  }
}

function CalculateRMS(arr) {
  // Map will return another array with each
  // element corresponding to the elements of
  // the original array mapped according to
  // some relation
  let Squares = arr.map(val => val * val)

  // Function reduce the array to a value
  // Here, all the elements gets added to the first
  // element which acted as the accumulator initially.
  let Sum = Squares.reduce((acum, val) => acum + val)

  Mean = Sum / arr.length
  return Math.sqrt(Mean)
}

/*
TODO
*/
function plotHarmonics() {
  // a mydiv to plot
  //data.map(function(i))
  //console.log(Math.max(parseFloat(document.getElementById('myDiv2').data[0].y)))
  console.log(document.getElementById('myDiv2').layout.yaxis.range[1])
  const a = document.getElementById('myDiv2').layout.yaxis.range[1]

  const b = document.getElementById('myDiv2').layout.yaxis.range[0]
  trace1 = {
    x: [46, 46],
    y: [0, 99],
    mode: 'lines',
    hoverinfo: 'none'
  }
  trace2 = {
    x: [2 * 46, 2 * 46],
    y: [0, 99],
    mode: 'lines',
    hoverinfo: 'none'
  }
  Plotly.addTraces('myDiv2', [trace1, trace2])
  /*Plotly.addTraces('myDiv2', {
    x: [46, 46, 2 * 46, 2 * 46, 3 * 46, 3 * 46, 4 * 46, 4 * 46],
    y: [0, 99, 0, 9999, 0, 9999, 0, 9999],
    mode: 'lines',
    hoverinfo: 'none',
    line: {
      shape: 'hv'
    }
  })*/
  Plotly.relayout('myDiv2', { yaxis: { range: [b, a] } })
  console.log(document.getElementById('myDiv2').layout.yaxis.range[1])
}
/*
TODO
*/
document.getElementById('addHarmonic').addEventListener('click', function () {
  plotHarmonics()
})
document.getElementById('BT4').addEventListener('click', function () {
  testando((coluna = ' fftVelocX'))
  //testando2((coluna = ' fftVelocX'))
})
document.getElementById('BT5').addEventListener('click', function () {
  testando((coluna = ' fftVelocY'))
  //testando2((coluna = ' fftVelocY'))
})
document.getElementById('BT6').addEventListener('click', function () {
  testando((coluna = ' fftVelocZ'))
  //testando2((coluna = ' fftVelocZ'))
})
document.getElementById('BT1').addEventListener('click', function () {
  testando((coluna = ' fftAccX'))
  //testando2((coluna = ' fftAccX'))
})
document.getElementById('BT2').addEventListener('click', function () {
  testando((coluna = ' fftAccY'))
  //testando2((coluna = ' fftAccY'))
})
document.getElementById('BT3').addEventListener('click', function () {
  testando((coluna = ' fftAccZ'))
  //testando2((coluna = ' fftAccZ'))
})
document.getElementById('BTOK').addEventListener('click', function () {
  var c = document.getElementById('TestOption').value
  d3.csv(
    'https://raw.githubusercontent.com/thiago977/data/main/TEST_PUMP',
    function (err, rows) {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key]
        })
      }
      var x = unpack(rows, ' time')
      var y = [
        unpack(rows, columns2[0]),
        unpack(rows, columns2[1]),
        unpack(rows, columns2[2])
      ]
      dateString = x.map(function (item) {
        return convertDate(item)
      })
      console.log(dateString)

      traces = [
        {
          x: x,
          y: y[0],
          hovertemplate:
            '<br><i>Data</i>: <b>%{x}</b>' +
            '<br><i>Amplitude</i>: <b>%{y}mm/s</b>',
          type: 'scatter'
        },
        {
          x: x,
          y: y[1],
          hovertemplate:
            '<br><i>Data</i>: <b>%{x}</b>' +
            '<br><i>Amplitude</i>: <b>%{y}mm/s</b>',
          type: 'scatter'
        },
        {
          x: x,
          y: y[2],
          hovertemplate:
            '<br><i>Data</i>: <b>%{x}</b>' +
            '<br><i>Amplitude</i>: <b>%{y}mm/s</b>',
          type: 'scatter',
          line: {
            shape: 'spline',
            smoothing: -1
          }
        }
      ]
      Plotly.newPlot('myDiv2', traces)
      document.getElementById('demo').value = CalculateRMS(y[2])
      /*if (c) {
    d3.csv(
      'https://raw.githubusercontent.com/thiago977/data/main/TEST_PUMP',
      function (err, rows) {
        function unpack(rows, key) {
          return rows.map(function (row) {
            return row[key]
          })
        }

        const fftsQuantity = rows.length / NUMBER_OF_LINES
        var x = []
        var y = unpack(rows, ' freq')
        var z = [
          unpack(rows, columns[0]),
          unpack(rows, columns[1]),
          unpack(rows, columns[2]),
          unpack(rows, columns[3]),
          unpack(rows, columns[4]),
          unpack(rows, columns[5])
        ]
        console.log(z)
        datas_up2 = []

        getOnlyData(unpack(rows, ' time'), datas_up2)

        dateString = datas_up2.map(function (item) {
          return convertDate(item)
        })
        console.log(dateString)
        for (var j = 0; j < fftsQuantity; j++) {
          for (var i = 0; i < NUMBER_OF_LINES; i++) {
            x.push(datas_up2[j])
          }
        }
        var tx = []
        var ty = []
        var tz = []
        for (var j = 0; j < columns.length; j++) {
          createCascadesSeries(x, y, z[j], tx, ty, tz, fftsQuantity)
        }

        var traces = []
        for (var j = 0; j < columns.length; j++) {
          var tracesaux
          if (c == 0) {
            tracesaux = createObject2Plot(ty[j * 1], tz[j * 1], tx[j * 1], '2d')
          } else {
            tracesaux = createObject2Plot(ty[j * c], tz[j * c], tx[j * c], '2d')
          }
          console.log(tracesaux)
          traces.push(tracesaux)
        }
        Plotly.newPlot('myDiv2', traces)
      }
    )
  }*/
    }
  )
})

/*d3.csv(
  'https://raw.githubusercontent.com/thiago977/data/main/MCLOA_TB2.csv',
  function (err, rows) {
    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key]
      })
    }

    getOnlyData(unpack(rows, ' time'), datas_up)
    datas_up = datas_up.map(function (item) {
      return convertDate(item)
    })
    var test = document.getElementById('TestOption')

    for (var i = test.options.length - 1; i >= 0; i--) {
      test.remove(i)
    }
    for (i in datas_up) {
      test.add(new Option(datas_up[i], i))
    }
  }
)*/

function testando() {
  d3.csv(
    'https://raw.githubusercontent.com/thiago977/data/main/454822000009%20(1).csv',
    function (err, rows) {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key]
        })
      }

      const fftsQuantity = rows.length / NUMBER_OF_LINES

      /*VARIABLES DECLARATION*/
      var x = []
      var y = unpack(rows, ' freq')
      var z = unpack(rows, coluna)

      /*CLEAN GLOBAL ARRAYS DECLARED*/
      cleanArrays(tracesx, tracesy, tracesz)
      datas_up = []

      getOnlyData(unpack(rows, ' time'), datas_up)
      datas_up = datas_up.map(function (item) {
        return convertDate(item)
      })
      /*FILL TIME COLUMN*/
      for (var j = 0; j < fftsQuantity; j++) {
        for (var i = 0; i < NUMBER_OF_LINES; i++) {
          x.push(datas_up[j])
        }
      }
      console.log(tracesy)
      createCascadesSeries(x, y, z, tracesx, tracesy, tracesz, fftsQuantity)
      removingFrequenciesUntil(tracesy, tracesx, tracesz, 8)

      console.log(tracesy)
      /*Configuração do gráfico*/
      var layoutPlot = {
        showlegend: false,
        scene: {
          aspectmode: 'manual',
          xaxis: {
            type: 'category',
            showgrid: false,
            title: '',
            tickfont: {
              size: 11,
              showticklabels: false
            }
          },
          yaxis: { title: 'Frequência (Hz)' },
          zaxis: {
            title: 'Amplitude (mm/s²)'
          },
          aspectratio: {
            x: 1.3,
            y: 2.2,
            z: 1
          },
          camera: {
            eye: {
              x: 1,
              y: 0,
              z: 00
            },
            projection: {
              type: 'orthographic'
            }
          }
        },
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0
          //pad: -10
        }
      }
      var layoutTrace = {
        type: 'scatter3d',
        mode: 'lines',
        opacity: 1,
        line: {
          cmin: 0,
          cmid: 2.5,
          cmax: 5,
          width: 4,
          colorscale: colorscalered
        }
      }
      traces = createObject2Plot(tracesx, tracesy, tracesz, '3d')
      tiricas = []
      traces.forEach(function (item, index) {
        if (index % 4 === 0) {
          tiricas.push(item)
        }
      })
      Plotly.newPlot('myDiv', traces, layoutPlot)

      var myPlot = document.getElementById('myDiv')

      // @@@@@@@@@@@@@@@@@@ UNCOMENT @@@@@@@@@@@@@@@@@@@@@@\\\\\\\
      myPlot.on('plotly_click', function (data) {
        var j = data.points[0].pointNumber
        var trendz = []
        var trendy = []

        for (var i = 0; i < fftsQuantity; i++) {
          trendz.push(tracesz[i][j])
          trendy.push(tracesy[i][j])
        }

        setTimeout(() => {
          Plotly.addTraces('myDiv', [
            {
              type: 'scatter3d',
              mode: 'lines markers',
              x: datas_up,
              y: trendy,
              z: trendz,
              hovertemplate:
                '<i>Data</i>: %{x}' +
                '<br><i>Frequência</i>: <b>%{y}Hz</b>' +
                '<br><i>Amplitude</i>: <b>%{z}g</b>',
              opacity: 1,
              line: {
                width: 6,
                reversescale: false
              },
              marker: {
                color: 'rgb(127, 127, 127)',
                size: 6,
                symbol: 'square-open',
                line: {
                  width: 1
                },
                opacity: 0.8
              }
            }
          ])
          nLayout = { width: 0 }
          Plotly.newPlot(
            'myDiv3',
            [
              {
                x: datas_up,
                y: trendz,
                type: 'scatter',
                hovertemplate:
                  '<br><i>Data</i>: <b>%{x}</b>' +
                  '<br><i>Amplitude</i>: <b>%{y}g</b>'
              }
            ],
            nLayout
          )
        }, 1000)
      })
    }
  )
}
var myCbBox = document.getElementById('TestOption')
