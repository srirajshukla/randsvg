const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


const random = require('random')


function generateLines(width, height){
        let x1 = random.int(0,width);
        let y1 = random.int(0,height);
        let x2 = random.int(0,width);
        let y2 = random.int(0,height);
        // generate a random hexadecimal color
        var color = "#" + Math.random().toString(16).slice(2, 8);
        var sw = random.int(0,10);
        return  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}" />`;
}

function generateCircle(width, height){
    let r = random.int(0,Math.min(width,height));
    let x = random.int(0,width);
    let y = random.int(0,height);
    // generate a random hexadecimal color
    var color = "#" + Math.random().toString(16).slice(2, 8);
    var sw = random.int(0,10);
    return `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="${sw}" fill-opacity="0.0" />`;
}

function generateSVG(width=100, height=100, circles=true){
    var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

    let times = random.int(1, width);
    let upbnd = 0;
    if(circles){
        upbnd = 1;
    }
    for (let i=0; i<times; i++){
        let choice = random.int(0,upbnd);
        if (choice == 0){
            svg += generateLines(width, height);
        } else{
            svg += generateCircle(width, height);
        }
    }
    svg += `</svg>`;

    return svg;
}



app.get('/', (req, res) => {
    let width = req.query.width
    let height = req.query.height
    let circle = req.query.circle
    let drawCircle = false;
    
    if (circle=="on"){
        drawCircle = true;
    }

    if (width && height && width > 0 && height > 0) {
        width = parseInt(width)
        height = parseInt(height)

        const img = generateSVG(width, height, drawCircle)
        res.render('index', {img: img})
    }

    else{
        res.render('index', {img: undefined})
    }
});


app.listen(PORT, () => {
    console.log(`App running at port: ${PORT}`)
});