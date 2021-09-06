const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var stones = []
var engine, world, base, rightSide, leftSide, bridge, jointLink, jointPoint
var backgroundImage, zombie1, zombie2, zombie3, zombie4, zombie, background, buttonImg, breakButton, wood 


function preload() {
  backgroundImage = loadImage("./zombie-crush-assets-main/assets/background.png")
  zombie1 = loadImage("./zombie-crush-assets-main/zombie1.png")
  zombie2 = loadImage("./zombie-crush-assets-main/zombie2.png")
  zombie3 = loadImage("./zombie-crush-assets-main/zombie3.png")
  zombie4 = loadImage("./zombie-crush-assets-main/zombie4.png")
  wood = loadImage("./zombie-crush-assets-main/assets/wood.png")
 }
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  base = new Base(width/2, height/2 + 300, width, 20)
	rightSide = new Base(width-10, height/2, width-1100,100)
	leftSide = new Base(10, height/2, width-1100, 100)
  bridge = new Bridge(25, { x: width / 2 - 700, y: height / 2 });
  //bridge.addImage("bridge", wood)
  jointPoint = new Base(width - 100, height / 2 + 10, 40, 20, "#8d6e63", true);
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);
 for(var i = 0; i<=7; i++){
  var x =  random(width/2+180, width/2-50)
  var y = height/2-300
  var stone = new Stone(x, y)
  stones.push(stone)
   
 }
 zombie = createSprite(width/2-800, height-110)
 zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1) 
 zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3)
 zombie.scale = 0.07
 zombie.velocityX = 2
 breakButton = createImg("./zombie-crush-assets-main/assets/axe.png")
 breakButton.position(width-200, height/2-50);
 breakButton.size(50, 50)
 breakButton.mouseClicked(handleButtonPress)
}

  



function draw() {
  background(51);
  image(backgroundImage,0,0,displayWidth,displayHeight)
  for(stone of stones){
    stone.display()
    var pos = stone.body.position
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
    if(distance<=50){
      zombie.velocityX = 0
      Matter.Body.setVelocity(stone.body, {x:10, y:-10})
      collided = true
    }
  }
  base.show()
  //rightSide.show()
  //leftSide.show()
  bridge.show()
  /*for(var stone of stones){
    stone.show()
  }*/
 
 
  Engine.update(engine);
  drawSprites()

}
function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 5000)
}