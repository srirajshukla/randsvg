const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


const random = require('random')

function generateSVG(width=100, height=100){
    var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

    for (let i=0; i<random.int(1,width); i++){
        let x1 = random.int(0,width);
        let y1 = random.int(0,height);
        let x2 = random.int(0,width);
        let y2 = random.int(0,height);
        // generate a random hexadecimal color
        var color = "#" + Math.random().toString(16).slice(2, 8);
        var sw = random.int(0,10);
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}" />`;
    }
    svg += `</svg>`;

    return svg;
}



app.get('/', (req, res) => {
    let width = req.query.width
    let height = req.query.height

    if (width && height && width > 0 && height > 0) {
        width = parseInt(width)
        height = parseInt(height)
        const img = generateSVG(width, height)
        res.render('index', {img: img})
    }

    else{
        res.render('index', {img: undefined})
    }
});


app.listen(PORT, () => {
    console.log(`App running at port: ${PORT}`)
});