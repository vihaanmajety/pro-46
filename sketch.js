var missileImg,backgroundimg,spaceshipimg,ufoImg
var Ufo,Missilebase,missile,missileGroup
var number,missileCount=10,UfoLife=15,score=0,gameState="fight"
function preload(){
  missileImg=loadImage('Missile.png')
  backgroundimg=loadImage('Background.png')
  spaceshipimg=loadImage('walker (1).png')
  ufoImg=loadImage('Ufo enemy.png')
}


function setup(){
  
  createCanvas(windowWidth,windowHeight);
   Ufo=createSprite(width/2,height/2-300)
Ufo.addImage('ufo',ufoImg)
Ufo.scale=0.75
Missilebase=createSprite(width/2,height-150)
Missilebase.addImage('base',spaceshipimg)
Missilebase.scale=0.25
Ufo.velocityX=5
edges = createEdgeSprites()
missileGroup=new Group()

}

function draw() {
  background(0);
  image(backgroundimg,0,0,width,height)
if(gameState=="fight"){


  if(keyDown(RIGHT_ARROW)){
    Missilebase.x+=2
  }
  if(keyDown(LEFT_ARROW)){
    Missilebase.x-=2
  }
 /* if(Ufo.x>1000){
    Ufo.x=500
    Ufo.velocityX=-5
  }
  console.log(Ufo.x)
  if(Ufo.x>200){
    Ufo.velocityX=5
  }*/
 
  Ufo.bounceOff(edges);
  //UFo.bounceOff(rightEdge);
 if(keyWentDown("space")){
   spawnMissiles()
 }
if(missileGroup.isTouching(Ufo)){
for(var i=0;i<missileGroup.length;i++){
  if(missileGroup[i].isTouching(Ufo)){
    missileGroup[i].destroy()
    UfoLife-=1
    score+=5
  }
 
}
}
if(missileCount==0){
  
  Ufo.destroy()
  missileGroup.destroyEach()
  Missilebase.destroy()
  gameState="end"
}
}
if(gameState=="end"){
  fill("red")
  textSize(60)
  text("You Ran Out Of Missiles,You Lose",width/2-300,height/2)
}
  drawSprites()
  fill("white")
  textSize(20)
  text("Score:"+score,width-200,40)
  text("MissilesLeft:"+missileCount,width-200,60)
}
function spawnMissiles(){
missile=createSprite(Missilebase.x,height-200)
missile.addImage(missileImg)
missile.velocityY=-5
missile.scale=0.25
missileCount-=1
missile.lifeTime=400
missileGroup.add(missile)
}