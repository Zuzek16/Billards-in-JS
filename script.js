// const Matter = require("matter-js");

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let canvasSize = 850;

//ball ordered is scrambeled?

var Engine = Matter.Engine,
    Body = Matter.Body,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Composite = Matter.Composite;

    //https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php
function degrees_to_radians(degrees) {
    return degrees * ((Math.PI)/180);
}

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
    static hole = "#44280b";
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

balls[cueBallId] = Bodies.circle(cueballStartX, cueBallStartY, radius, {render: { fillStyle: Color.white}, body:{label:"cueBall"} });
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
let sideLength = radius*12;
let offset = 2;
for (let i = 0; i < 3; i++) {
    let counter = i+1;
    if (i == 0) {
        triangle[i] = Bodies.rectangle(initX-12+offset, initY-(sideLength/4), 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            }
        });    
    } else if (i == 1) {
        triangle[i] = Bodies.rectangle(initX-12+offset, initY+(sideLength/4), 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            }
        });
    } else {
        triangle[i] = Bodies.rectangle(initX-12+offset+(sideLength/2), initY, 12, sideLength, {
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

let numberOfPockets = 6;//only even ?
        let pocketSize = radius*1.4;
        const pockets = [];//starting from the upper left corner -> clockwise
        y = 0;
        x = 0;
        for (let i = 0; i < numberOfPockets; i++) {
          
          if ((numberOfPockets/2) > i) {
            if (i == 0) {
            x = 0;
            } else {
            x = canvasSize*i;
            }
            y = 0;
          } else {
            if (i == 0) {
              x = 0
              } else {
              x = canvasSize*(i-(numberOfPockets/2));
              }
      
            y = canvasSize;
          }
    
          pockets[i] = Bodies.circle(x, y, pocketSize, {
            render: {
                fillStyle: Color.hole
            },
            isStatic: true
          });

          buffer.push(pockets[i]);
         
        }

pockets.forEach(el => {
    console.log(el.position.x);
    console.log(el.position.y);
    console.log("--");
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

let start = false;
document.addEventListener("keypress", (e)=>{
    if (e.key == "Enter") {
        console.log("start game?");
        startGame();
    }
})

//https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect(); // abs. size of element
    let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
    let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

function startGame() {
    let userMouse = Matter.Mouse.create(canvas);
    // userMouse.setElement(canvas)
    start = true;
    buffer.forEach(el => {
        if (el.label == "Rectangle Body") {
                Composite.remove(engine.world ,el);
        }
    });
    let userMConst = MouseConstraint.create(engine, {
        mouse: userMouse
    });
    console.log(userMConst);
    
    console.log(userMConst.constraint);
    

    Events.on(userMConst, "startdrag", (e)=>{
        console.dir(e);
        console.log(e.body.id);
        if (e.body.id == 1) {//id 1 for matter js!
            console.log("dragging cue ball");
         
            // console.log(e.clientX);
            
            e.body.position.x = +10; 
            e.body.position.y = +10; 
            
        }
        console.dir(e.body.position)

    });
}

startGame();