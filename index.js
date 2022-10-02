function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generateLines(width, height) {
    const x1 = randomInt(0, width);
    const y1 = randomInt(0, height);
    const x2 = randomInt(0, width);
    const y2 = randomInt(0, height);
    const color = generateRandomColor();
    const sw = randomInt(0, 10);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}" />`;
}

function generateCircle(width, height) {
    const r = randomInt(0, Math.min(width, height));
    const x = randomInt(0, width);
    const y = randomInt(0, height);
    const color = generateRandomColor();
    const sw = randomInt(0, 10);
    return `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" stroke-width="${sw}" fill-opacity="0.0" />`;
}

// Generate a random hexadecimal color
function generateRandomColor() {
    return "#" + Math.random().toString(16).slice(2, 8);
}

function generateRectangle(origin, width, height, color) {
    return `<rect x="${origin[0]}" y="${origin[1]}" width="${width}" height="${height}" fill="${color}" />`;
}

function generateSVG(width = 100, height = 100, circles = true) {
    var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

    let times = randomInt(1, width);
    let upbnd = 0;
    if (circles) {
        upbnd = 2;
    }

    for (let i = 0; i < 5; i++) {
        let color = generateRandomColor();
        let origin = [randomInt(0, width), randomInt(0, height)];
        let w = randomInt(0, width);
        let h = randomInt(0, height);
        svg += generateRectangle(origin, w, h, color);
    }

    for (let i = 0; i < times; i++) {
        let choice = randomInt(0, upbnd);
        if (choice == 0) {
            svg += generateLines(width, height);
        } else {
            svg += generateCircle(width, height);
        }
    }

    svg += `</svg>`;
    return svg;
}


function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const imgDiv = document.querySelector("#imgRender")

    let width = formData.get("width")
    let height = formData.get("height")
    const circle = formData.get("circle")

    if (width && height && width > 0 && height > 0) {
        width = parseInt(width)
        height = parseInt(height)

        const img = generateSVG(width, height, circle === "yes")
        imgDiv.innerHTML = img;
    } else {
        const err = `<p class="text-xl text-lime-500">Error: Please check query parameters.</span>`
        imgDiv.innerHTML = err;
    }
};

const form = document.querySelector('#form');
form.addEventListener("submit", handleSubmit)
