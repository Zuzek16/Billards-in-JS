let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let canvasSize = 850;

var Engine = Matter.Engine,
    Body = Matter.Body,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    //https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php
function degrees_to_radians(degrees) {
    return degrees * ((Math.PI)/180);
}
// const halfBallTexture = new Image("img/ball_half.png");

// halfBallTexture.addEventListener("load", (e) => {
//     ctx.drawImage(halfBallTexture, 33, 71, 104, 124, 21, 20, 87, 104);
//   });
  


//     function renderTable(size = 100) {//
//         let railRadius = 15;
//         let width;
//         let height;
    
//         let tablex = two.width * 0.5;
//         let tabley = two.height * 0.5;
//         let rail = two.makeRoundedRectangle(tablex, tabley, width, height, railRadius);
//         rail.stroke = Color.rail;
//         rail.linewidth = 15;
//         rail.fill = Color.field;
//         const detail = [];
//         let pf = 16;
//         // for (let i = 0; i < 4; i++) {
    
//         //   switch (i) {
//         //     case 0:
//         //   detail[i] = two.makeRoundedRectangle(tablex - (width/2) + pf, tabley - height/2 + pf, size/10, size/10, 25);
              
//         //       break;
//         //     case 1:
//         //   detail[i] = two.makeRoundedRectangle(tablex + (width/2) - pf, tabley - height/2 + pf, size/10, size/10, 25);
              
//         //       break;
//         //     case 2:
//         //   detail[i] = two.makeRoundedRectangle(tablex - (width/2) +pf, tabley + height/2 - pf, size/10, size/10, 25);
              
//         //       break;
//         //     case 3:
//         //   detail[i] = two.makeRoundedRectangle(tablex + (width/2) - pf, tabley + height/2 - pf, size/10, size/10, 25);
              
//         //       break;
            
//         //   }
          
//         // }
//         detail.forEach(el => {
//           el.fill = Color.field;
//           el.stroke = Color.field;
//         });
    
    
//         let numberOfPockets = 6;//only even ?
//         let pocketSize = size/40;
//         const pockets = [];//starting from the upper left corner -> clockwise
//         const isCornerPocket = [1, 0, 1, 1, 0, 1];
//         let y = 0;
//         let x = 0;
//         for (let i = 0; i < numberOfPockets; i++) {
          
//           if ((numberOfPockets/2) > i) {
//             if (i == 0) {
//             x = tablex - (width/2);
//             } else {
//             x = tablex - (width/2) + (width/i);
//             }
//             y = tabley - height/2;
//           } else {
//             if (i == 0 || (i-(numberOfPockets/2)) == 0) {
//               x = tablex - (width/2);
//               } else {
//               x = tablex - (width/2) + (width/(i-(numberOfPockets/2)));
//               }
      
//             y = tabley + height/2;
//           }
    
//           pockets[i] = two.makeCircle(x, y, pocketSize);
//           pockets[i].fill = "white";
//           pockets[i].stroke = "white";
//         }
    
//     }



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
    static pool = "#1a4a1a";
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
        background: Color.pool,
        height: canvasSize,
        width: canvasSize*2,
        showVelocity: true,
        wireframes: false
    }
});


let initX = canvasSize*1.5;
let initY = canvasSize/2;

//init balls
const balls = [];
let radius = 20;//Srednica!
let x = canvasSize*1.4;
let y = canvasSize/2;
let line = 10;

let cueballStartX = canvasSize/2;
let cueBallStartY = canvasSize/2
//color the balls

balls[cueBallId] = Bodies.circle(cueballStartX, cueBallStartY, radius, {render: { fillStyle: Color.white} });
balls[eightBallId] = Bodies.circle(initX, initY, radius, {render: { fillStyle: Color.black} });
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

colors.forEach((color, i) => {
        
        balls.push(Bodies.circle(initX, initY, radius, {render: { fillStyle: color} }));
        //halves
        balls.push(Bodies.circle(initX, initY, radius, {
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

let triangle = [];
let sideRotation = 60;
let sideLength = radius*10;
for (let i = 0; i < 3; i++) {
    let counter = i+1;
    if (i == 0) {
        triangle[i] = Bodies.rectangle(initX-12, initY-(sideLength/4), 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            }
        });    
    } else if (i == 1) {
        triangle[i] = Bodies.rectangle(initX-12, initY+(sideLength/4), 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            }
        });
    } else {
        triangle[i] = Bodies.rectangle(initX-12+(sideLength/2), initY, 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            }
        });
    }
    

    Body.rotate(triangle[i], degrees_to_radians(60*(counter)));
    
}
triangle.forEach(e => {
buffer.push(e);

});


//debug dot
// buffer.push(Bodies.circle(initX, initY, 10, {render: { fillStyle: "black"}, isStatic: true }))


// add all of the bodies to the world
Composite.add(engine.world, buffer);
// Composite.add(engine.world, arr);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

document.addEventListener("keypress", (e)=>{
    console.log(e);
    if (e.key == "Enter") {
        console.log("start game?");
        
    }
    
})