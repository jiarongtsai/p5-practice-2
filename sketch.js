var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

var xoff = 0.0;
var yoff = 0.0;
var zoff = 0.0;


xoff = xoff + .03;
function mousePressed() {
  for(var i=0; i<10; i++){
    yoff = yoff + .01;
    for(var j=0; j<10; j++){
      zoff = zoff + .01;
      var p = new Particle(mouseX+i*windowHeight/10, mouseY+j*windowHeight/10, 2*noise(xoff, yoff, zoff));
        particles.push(p);
    }
  }
}

function draw() {
  background(51);

  for (var i = 0; i < particles.length; i++) {
    var gravity = createVector(0, 1 * particles[i].mass * noise(xoff, yoff, zoff));
    particles[i].applyForce(gravity);

    particles[i].update();
    particles[i].edges();
    particles[i].display();
  }
}

function Particle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill(255, 150);
    ellipse(this.pos.x, this.pos.y, this.mass*20, this.mass*20);
  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }

  }
}
