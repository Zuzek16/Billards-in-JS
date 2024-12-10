var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

let canvas = document.getElementById("canvas");
let canvasSize = 850;
// canvas.width = canvasSize*2;
// canvas.height = canvasSize;
// create an engine
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
        showVelocity: true
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(410, 200, 120, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);