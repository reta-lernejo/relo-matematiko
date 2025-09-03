---
layout: laborfolio
title: Ondoj kaj frekvencoj
js:
  - folio-0c
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/14.6.0/math.js" type="text/javascript"></script>
<script src="https://cdn.plot.ly/plotly-1.35.2.min.js"></script>

<div id="func"></div>
<div id="plot1"></div>
<div id="plot2"></div>

<script type="text/javascript">
  // test
  console.log(math.sqrt(-4).toString()) // 2i

    // desegnu sinusfunkcion
  const f = "sin(x) + cos(x/2) - 0.5"; //"f(x) = sin(x) + cos(x/2) - 0.5";

  let xValues, yValues;
  let magn = [], phi = [];

  try {
        // compile the expression once
        //const expression = document.getElementById('eq').value
        const expr = math.compile(f)

        // evaluate the expression repeatedly for different values of x
        xValues = math.range(-50, 50, 0.5).toArray()
        yValues = xValues.map(function (x) {
            return expr.evaluate({x: x})
        });

    } catch (err) {
        console.error(err)
        alert(err)
    }

  function draw() {

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter'
      }
      const data = [trace1]
      Plotly.newPlot('plot1', data)
  }


  function draw2() {

      const xValues = math.range(1,magn.length,1.0).toArray()
      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: magn,
        //y: phi,
        type: 'scatter'
      }
      const data = [trace1]
      Plotly.newPlot('plot2', data)
  }

  function fft() {
    const ft = math.fft(yValues);
    //console.log(ft);
    for (const n of ft) {
        magn.push(math.sqrt(math.square(n.re) + math.square(n.im)));
        phi.push(math.atan2(n.re,n.im));
    }
  }
/*
  document.getElementById('func').onsubmit = function (event) {
    event.preventDefault()
    draw()
  }*/

    draw();
    fft();
    draw2();
</script>
