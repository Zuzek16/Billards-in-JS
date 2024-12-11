var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

let canvas = document.getElementById("canvas");
let canvasSize = 850;

let ColoredBallsNum = 15;
// let cueBallNum = 1;
let cueBallId = 0;
let eightBallId = 8;

class Color {
    
    static black = "#000000";
    static white = "#ffffff";
    static red = "#FF0000";
    static yellow = "#FFFF00";
    static green = "#00FF00";
    static blue = "#0000FF";
    static purple = "#FF00FF";
    static orange = "#FFA500";
    static brown = "#8B4513";
}
// console.log(Color.black);
// console.log(black);



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

//color the balls

balls[cueBallId] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.white} });
console.log(balls);

for (let i = 1; i <= ColoredBallsNum; i++) {
    console.log("ran init of balls");
    if (i == cueBallId) {
        continue;
    }
    if (i == eightBallId) {
        balls[i] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.black} });
        continue;
    } 

console.log("val of i " + i);


    balls[i] = Bodies.circle(x, y, radius, {render: { fillStyle: Color.white } });

    
}

console.log(balls);

var boxA = Bodies.rectangle(410, 200, 120, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true,
    render: {
        fillStyle: "#342323"
    }
 });
const arr = [boxA, boxB, ground];
// add all of the bodies to the world
Composite.add(engine.world, balls);
// Composite.add(engine.world, arr);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);