

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;


    function renderTable(size = 100) {//
        let railRadius = 15;
        let width;
        let height;
    
        let tablex = two.width * 0.5;
        let tabley = two.height * 0.5;
        let rail = two.makeRoundedRectangle(tablex, tabley, width, height, railRadius);
        rail.stroke = Color.rail;
        rail.linewidth = 15;
        rail.fill = Color.field;
        const detail = [];
        let pf = 16;
        // for (let i = 0; i < 4; i++) {
    
        //   switch (i) {
        //     case 0:
        //   detail[i] = two.makeRoundedRectangle(tablex - (width/2) + pf, tabley - height/2 + pf, size/10, size/10, 25);
              
        //       break;
        //     case 1:
        //   detail[i] = two.makeRoundedRectangle(tablex + (width/2) - pf, tabley - height/2 + pf, size/10, size/10, 25);
              
        //       break;
        //     case 2:
        //   detail[i] = two.makeRoundedRectangle(tablex - (width/2) +pf, tabley + height/2 - pf, size/10, size/10, 25);
              
        //       break;
        //     case 3:
        //   detail[i] = two.makeRoundedRectangle(tablex + (width/2) - pf, tabley + height/2 - pf, size/10, size/10, 25);
              
        //       break;
            
        //   }
          
        // }
        detail.forEach(el => {
          el.fill = Color.field;
          el.stroke = Color.field;
        });
    
    
        let numberOfPockets = 6;//only even ?
        let pocketSize = size/40;
        const pockets = [];//starting from the upper left corner -> clockwise
        const isCornerPocket = [1, 0, 1, 1, 0, 1];
        let y = 0;
        let x = 0;
        for (let i = 0; i < numberOfPockets; i++) {
          
          if ((numberOfPockets/2) > i) {
            if (i == 0) {
            x = tablex - (width/2);
            } else {
            x = tablex - (width/2) + (width/i);
            }
            y = tabley - height/2;
          } else {
            if (i == 0 || (i-(numberOfPockets/2)) == 0) {
              x = tablex - (width/2);
              } else {
              x = tablex - (width/2) + (width/(i-(numberOfPockets/2)));
              }
      
            y = tabley + height/2;
          }
    
          pockets[i] = two.makeCircle(x, y, pocketSize);
          pockets[i].fill = "white";
          pockets[i].stroke = "white";
        }
    
    }


let canvas = document.getElementById("canvas");
let canvasSize = 850;

const buffer = [];
let ColoredBallsNum = 15;
let cueBallId = 0;
let eightBallId = 1;

class Color {
    static black = "#000000";
    static white = "#FFFFFF";

    static red = "#FF0000";
    static yellow = "#FFFF00";
    static green = "#00FF00";
    static blue = "#0000FF";
    static purple = "#FF00FF";
    static orange = "#FFA500";
    static brown = "#8B4513";
    static redDark = "#CC0000";
    static yellowDark = "#DDDD00";
    static greenDark = "#00CC00";
    static blueDark = "#0000CC";
    static purpleDark = "#DD00FF";
    static orangeDark = "#FFA050";
    static brownDark = "#7B2F03";
}

const colors = [Color.red, Color.yellow, Color.green, Color.purple, Color.orange, Color.brown]
// const colors = [
//     "#FF0000",
//     "#FFFF00",
//     "#00FF00",
//     "#0000FF",
//     "#FF00FF",
//     "#FFA500",
//     "#8B4513",
//     "#CC0000",
//     "#DDDD00",
//     "#00CC00",
//     "#0000CC",
//     "#DD00FF",
//     "#FFA050",
//     "#7B2F03"
//   ];

var engine = Engine.create({
    gravity: {
        scale: 0
    },
});

// create a renderer
var render = Render.create({//was hard to find info on this!
    element: document.body,
    engine: engine,
    canvas: canvas,
    options: {
        height: canvasSize,
        width: canvasSize*2,
        showVelocity: true,
        wireframes: false
    }
});




//init balls
const balls = [];
let radius = 20;//Srednica!
let x = 600;
let y = 340;
let line = 10;
//color the balls

balls[cueBallId] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.white} });
balls[eightBallId] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.black} });
let timesUsed = 0;
// for (let i = 1; i <= ColoredBallsNum; i++) {
//     console.log("ran init of balls");
//     if (i == cueBallId) {
//         continue;
//     }
//     if (i == eightBallId) {
//         continue;
//     } 

//     if (i%2 == 0) {

//         balls[i] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.orange } });

//     } else {//halves

//         balls[i] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.purple } });

//     }

    
// }

colors.forEach(color => {
        
        balls.push(Bodies.circle(x, y, radius, {render: { fillStyle: color} }));
        //halves
        balls.push(Bodies.circle(x, y, radius, {
            render: {fillStyle: color,
                     lineWidth: line,
                     strokeStyle: Color.white
            } 
        }));
        
});



let size = 200;
let table = {
    height: size,
    width: size*2
}

var boxA = Bodies.rectangle(410, 200, 120, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true,
    render: {
        fillStyle: "#342323"
    }
 });
const arr = [boxA, boxB, ground];

balls.forEach(el => {
    buffer.push(el);
    
});
// add all of the bodies to the world
Composite.add(engine.world, buffer);
// Composite.add(engine.world, arr);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);