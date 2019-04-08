var nodes = [];
var nodeCount = 100;
var nodeDiameter = 3;
var speed = 0.5;
var animFrame = 0;

function initialize() {

   // Register an event listener to call the resizeCanvas() function
   // each time the window is resized.
   window.addEventListener('resize', resizeCanvas, false);

   setupNodes();

   // Draw canvas border for the first time.
   resizeCanvas();
}

// Display custom canvas. In this case it's a blue, 5 pixel
// border that resizes along with the browser window.
function redraw() {
    // Obtain a reference to the canvas element using its id.
    var htmlCanvas = document.getElementById('mainCanvas');
    // Obtain a graphics context on the canvas element for drawing.
    var context = htmlCanvas.getContext('2d');

   startAnims();
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {

    // Obtain a reference to the canvas element using its id.
    var htmlCanvas = document.getElementById('mainCanvas');
    // Obtain a graphics context on the canvas element for drawing.
    var context = htmlCanvas.getContext('2d');

    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
    redraw();
}



function setupNodes() {
    for( var i=0; i<nodeCount; i++ ) {

        radDirection = Math.radians( Math.random() * 360 );

        var node = { "x":Math.random() * window.innerWidth,
                     "y":Math.random() * window.innerHeight,
                     "direction": radDirection,
                     "diameter": Math.floor( (Math.random() * nodeDiameter) ) + 1,
                     "colour": rgbToHex( 0,
                                         Math.floor( (Math.random() * 255) ) + 10,
                                         0 ) };

        nodes.push( node );
    }
}


function startAnims() {
    if( animFrame != 0 ) {
        window.cancelAnimationFrame( animFrame );
    }

    // Obtain a reference to the canvas element using its id.
    var htmlCanvas = document.getElementById('mainCanvas');
    // Obtain a graphics context on the canvas element for drawing.
    var ctx = htmlCanvas.getContext('2d');

    // Clear out everything
    ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );

    var textX = window.innerWidth / 2;
    var textY = (window.innerHeight / 2) - 120;


    nodes.forEach( function(node) {
        ctx.fillStyle = node.colour; // Red color
        ctx.beginPath(); //Start path
        ctx.arc(node.x, node.y, node.diameter, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.fill(); // Close the path and fill.
    });

    ctx.font = "16px Roboto-Black";
    ctx.fillStyle = "#ffffff"; // Red color
    ctx.textAlign = "center";

    ctx.fillText("Effective June, 2017, Punk Science Studios Inc. ceased taking on", textX, textY );
    ctx.fillText("new projects. We're really proud of the team we built, the games we created", textX, textY + 40 );
    ctx.fillText("and the client work we completed. Today you can find us working with ", textX, textY + 80 );
    ctx.fillText("the expanded team at Gogii Lighthouse Studios Inc. in  Halifax, Nova Scotia.", textX, textY + 120 );
    ctx.fillText("Reach out to info@punkscience.ca", textX, textY + 180 );

    animFrame = window.requestAnimationFrame( updateMovement );
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};


function updateMovement( timeStamp ) {
    nodes.forEach( function(node) {

        node.x = node.x + Math.sin( node.direction ) * speed;
        node.y = node.y + Math.cos( node.direction ) * speed;

        // If I go out of bounds, respawn me
        if( node.x > window.innerWidth - nodeDiameter || node.x < 0 - nodeDiameter ||
            node.y > window.inneHeight - nodeDiameter || node.y < 0 - nodeDiameter ) {

                node.x = Math.random() * window.innerWidth;
                node.y = Math.random() * window.innerHeight;
                node.direction = Math.radians( Math.random() * 360 );
        }
    } );

    redraw();
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    var str = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    return str;
}
