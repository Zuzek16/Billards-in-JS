// const Matter = require("matter-js");
//fututre updates? 
//- canvas is the limit to hte 'ball pull'; would be nice to extend it

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let canvasSize = 850;

//ball ordered is scrambeled?

let Engine = Matter.Engine,
    World = Matter.World,
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
  

    static pool = "#1a4a1a";
    static hole = "#44280b";
}

const colors = [Color.red, Color.yellow, Color.green, Color.purple, Color.orange, Color.brown, Color.blue]

let engine = Engine.create({
    gravity: {
        scale: 0
    },
});

let render = Render.create({//was hard to find info on this!
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

balls[cueBallId] = Bodies.circle(cueballStartX, cueBallStartY, radius, {render: { fillStyle: Color.white}, label: "cueBall"});
balls[eightBallId] = Bodies.circle(initX, initY, radius, {render: { fillStyle: Color.black}, label: "8-ball" });
let timesUsed = 0;

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

balls.forEach(el => {
    let airFri = 0.01;
    el.frictionAir = 0.0099999;
    el.setMass = el.mass/2;
    el.restitution = 0.8

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
            },
            label: "triangle"

        });    
    } else if (i == 1) {
        triangle[i] = Bodies.rectangle(initX-12+offset, initY+(sideLength/4), 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            },
            label: "triangle"

        });
    } else {
        triangle[i] = Bodies.rectangle(initX-12+offset+(sideLength/2), initY, 12, sideLength, {
            isStatic: true,
            render: {
                fillStyle: "brown"
            },
            label: "triangle"

        });
    }
    
    Body.rotate(triangle[i], degrees_to_radians(60*(counter)));
    
}
triangle.forEach(e => {
buffer.push(e);
});

let numberOfPockets = 6;//only even ?
        let pocketSize = radius*1.6;
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
            isStatic: true,
            label: "pocket",
            isSensor: true
          });

          buffer.push(pockets[i]);
         
        }

createBounds();

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

World.add(engine.world, buffer)


let start = false;

//https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect(); // abs. size of element
    let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
    let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

function returnCueBall(cue) {
    console.log("ran return cueball");
    Body.setPosition(cue, {x: cueballStartX, y: cueballStartX});
    Body.setVelocity(cue, {x: 0, y: 0});   
}

function placeCueBall(cue, x, y) {
    Body.setPosition(cue, {x: x, y: y});
    Body.setVelocity(cue, {x: 0, y: 0});   
}

function gameOverCheck(){

    
    let eight = buffer[eightBallId];
    let cue = buffer[cueBallId];
    let otherBallsOut = [];
    balls.forEach(ball=>{
        if (ball != eight && ball != cue) {
            if (!Composite.allBodies(engine.world).includes(ball)) {
                otherBallsOut.push(true)
            } else {
                otherBallsOut.push(false);

            }
        }
    })

    let gameOverF = false;
    otherBallsOut.forEach(a=>{
        if (!a) {
            gameOverF = true;
        }
    })
    
    if (!Composite.allBodies(engine.world).includes(eight) && gameOverF) {
        alert("OH NO! You pocketed the 8-ball before the other balls! \nGame over\nYou can try again");
        location.reload();
    }

    if (!Composite.allBodies(engine.world).includes(eight) && !gameOverF) {
        alert("Thanks for playing!\nYou can hit f5 to refresh and play again!")
    }
}

function startGame() {
    let oldMouse = {
        x: 0,
        y: 0
    };
    let newMouse = {
        x: 0,
        y: 0
    };
    let dragStrength = 0.02;
    let userMouse = Matter.Mouse.create(canvas);
    start = true;
    buffer.forEach(el => {
        
        if (el.label == "triangle") {
                Composite.remove(engine.world, el);
        }
    });
    let userMConst = MouseConstraint.create(engine, {
        mouse: userMouse
    });

    let cueBallAction = false;
    document.addEventListener("mousedown", (e) => {
        oldMouse.x = e.clientX;
        oldMouse.y = e.clientY;
    })
    
    Events.on(userMConst, "startdrag", (e)=>{
        if (e.body.id == 1) {//cue ball is id 1 for matter js
            cueBallAction = true;
        } else {
            cueBallAction = false;
        }
    });

    document.addEventListener("mouseup", (e) => {
        newMouse.x = e.clientX;
        newMouse.y = e.clientY;
        
    })
    let distLimit = 400;
    let tooFar = false;

    Events.on(userMConst, "enddrag", (e)=>{
        if (cueBallAction == true) {//id 1 for matter js!
            var difX = Math.abs(oldMouse.x - newMouse.x)
            var difY = Math.abs(oldMouse.y - newMouse.y)
            // console.dir(e.body.position);
            let sign = vectorSign(oldMouse, newMouse);
            
            if (difX > distLimit) {
                difX = distLimit;
            } 

            if (difY > distLimit) {
                difY = distLimit;
            } 

            var power = Math.sqrt(Math.pow(difX,2) + Math.pow(difY, 2))/1000000
            let force = {x: (sign.dx)*difX*power, y: (sign.dy)*difY*power};
            Body.applyForce(e.body, {x: e.body.position.x, y: e.body.position.y}, force);
            
        }
        cueBallAction = false;
    });


    ///collision
    console.dir(engine);
    let oldBacklog = [];
    let backlog = [];

    function clearBacklog() {
        oldBacklog.forEach(group =>{

            group.forEach((pair, pairId)=>{

                let bodyA = pair.bodyA;
                let bodyB = pair.bodyB;
                if (bodyA.label == "pocket") {
                    backlog.push(bodyB);
                } else if (bodyB.label == "pocket"){
                    backlog.push(bodyA);

                }
            })
        })

        backlog.forEach(el=>{
            if (el.label == "cueBall") {
                returnCueBall(el)                
            } else {
           Composite.remove(engine.world, el);
                        gameOverCheck()

            }
        })

        backlog = [];
        oldBacklog = [];
    }

    Events.on(engine, 'collisionStart',(event)=>{
        oldBacklog.push(event.source.pairs.collisionActive)
        
        event.source.pairs.collisionActive.forEach(el=>{

            let bodyA = el.bodyA;
            let bodyB = el.bodyB;
            
            if (!(bodyA.label  == "bounds" || bodyB.label == "bounds")) {


                if (bodyA.label == "pocket") {
                    console.log("its a pocket");
                    
                    if (bodyB.label == "cueBall") {
                        returnCueBall(bodyB);
                    } else {
                        console.log("removing");
                        
                        Composite.remove(engine.world, bodyB);
                        gameOverCheck()
                    } 
                
                } else if (bodyB.label == "pocket") {
                    console.log("its a pocket");
        
                    if (bodyA.label == "cueBall") {
                        returnCueBall(bodyA);
                    } else {
                        console.log("removing");
                        
                        Composite.remove(engine.world, bodyA);
                        gameOverCheck()
        
                    } 
                }
            }

          
        })
        

        clearBacklog();

    });

}

function createBounds() {
    let t;
    let b;
    let l;
    let r;
    let height = 500;
    let width = canvasSize*2;
    let label = "bounds";
    let a = 0.6;

    let options = {isStatic: true, render: { fillStyle: Color.white}, label: label, restitution: a};

    t = Bodies.rectangle(canvasSize, 0-(height/2), width, height, options);
    b = Bodies.rectangle(canvasSize, canvasSize+ (height/2), width, height, options);

    let Vwidth = height;
    let Vheight = canvasSize;
    l = Bodies.rectangle(0-Vwidth/2, canvasSize/2, Vwidth, Vheight, options);
    r = Bodies.rectangle((canvasSize*2)+Vwidth/2, canvasSize/2, Vwidth, Vheight, options);
    console.log(r.position);
    
    buffer.push(t);
    buffer.push(b);
    buffer.push(l);
    buffer.push(r);
}

function vectorSign(oldP, newP) {
    const isPositiveX = oldP.x < newP.x;
    const isPositiveY = oldP.y < newP.y;
  
    return {
      dx: isPositiveX ? 1 : -1,
      dy: isPositiveY ? 1 : -1
    };
}

setTimeout(() => {
startGame();

    
}, 1800);