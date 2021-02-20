const symbols = " .':,\"!/r(l1Z4H9W8$@";

const Vector3 = require(__dirname + '/vector.js');
const { Plane, Rectangle } = require(__dirname + '/geometry.js'); 
const rayCast = require(__dirname + '/raycast.js'); 

function render (width, height, depth, list) {

    let msg = "";

    for(let i = 0; i < height; i ++) {
        for(let j = 0; j < width; j ++) {

            
            // const symbol = getSymbol(j, i, width, height, vax, vay);
            // msg += symbol+" "+symbol+" ";

            const symbol = symbols[symbols.length-1-getSymbol(j, i, width, height, depth, list)];
            msg += symbol+symbol;

        }
        msg += "\n";
    }

    console.log(msg);
    // console.log("\n\n\n");
}

const c = Math.cos(60*Math.PI/180);

const plane = new Plane(new Vector3(0, 0, 1), new Vector3(0, 0, 5));
// const r1 = new Rectangle(new Vector3(-6, -6, 6), new Vector3(6, -6, 5), new Vector3(6, 6, 5));

function getSymbol (x, y, w, h, depth, list) {

    const vec = new Vector3(x-w/2, y-h/2, 4);

    const dist = rayCast(vec, list, depth);

    return getValue(dist, depth, symbols.length-1);

}

function getValue (n, max1, max2) {

    return Math.floor(n/max1*max2);

}

let angle = 0;

setInterval(() => {
    render(80, 50, 30, [plane]);

    plane.normal.y += 0.001;
    plane.normal.x += 0.001;
    
    plane.normal = plane.normal.norm();

    angle ++;
});

// console.log(r1.normal);

// render(1, 50);

// console.log(symbols[getValue(dist, 30, symbols.length-1)]);