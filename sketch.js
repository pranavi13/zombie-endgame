var canavas, backgroundImage;
var life=3;
var bullets=80;
var gameState="fight"
var score=0;

function preload(){
    shooter1=loadImage("shooter_1.png")
    shooter2=loadImage("shooter_2.png")
    shooter3=loadImage("shooter_3.png")
    backgroundImage=loadImage("bg.jpeg")
    zombieImg=loadImage("zombie.png")
    heart1Img=loadImage("heart_1.png")
    heart2Img=loadImage("heart_2.png")
    heart3Img=loadImage("heart_3.png")
    win=loadSound("win.mp3")
    lose=loadSound("lose.mp3")
    explosion=loadSound("explosion.mp3")
}
function setup(){
    canavas= createCanvas(windowWidth,windowHeight);
    bg=createSprite(displayWidth/2-35,displayHeight/2-45,20,20)
     bg.addImage(backgroundImage)   
     player=createSprite(displayWidth-1200,displayHeight-450,20,20)
        player.addImage(shooter1)
        
        bg.scale=1
        player.scale=0.3
        zombieGroup=new Group()
        bulletGroup=new Group()
      heart1=createSprite(displayWidth-250,50,20,20)
      heart1.addImage(heart1Img)
      heart1.visible=false
      heart1.scale=0.5

      heart2=createSprite(displayWidth-200,50,20,20)
      heart2.addImage(heart2Img)
      heart2.visible=false
      heart2.scale=0.5

      heart3=createSprite(displayWidth-150,50,20,20)
      heart3.addImage(heart3Img)
      heart3.visible=false
      heart3.scale=0.5


}
function draw(){
    background("black")
    if(gameState==="fight"){
    
        if(life===3){
heart3.visible=true
heart2.visible=false
heart1.visible=false
        }
        if(life===2){
heart2.visible=true
heart1.visible=false
heart3.visible=false
        }
        if(life===1){
heart1.visible=true
heart3.visible=false
heart2.visible=false
        }
        if(life===0){
            gameState="lost"
            heart1.visible=false
            lose.play();
        }
        if(score===100){
            gameState="won"
            win.play();

        }
    if(keyWentDown("space")){
        player.addImage(shooter3)    
    }
    else if (keyWentUp("space")){
        player.addImage(shooter2)
    }

    if(keyDown("DOWN_ARROW") ||touches.length>0){

        player.y+=15
    }
    if(keyDown("UP_ARROW") ||touches.length>0){

        player.y-=15
    }
    if(keyWentDown("space")){
        bullet=createSprite(displayWidth-1150,player.y-30,20,10);
        bullet.velocityX=+20
        bulletGroup.add(bullet)
        player.depth = bullet.depth
        player.depth = player.depth+2
        bullets=bullets-1
        explosion.play();
    }
    if(bullets===0){
        gameState="bullet"
        lose.play();
    }
    if(zombieGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombieGroup.length;i++){     
            
         if(zombieGroup[i].isTouching(bulletGroup)){
              zombieGroup[i].destroy()
              bulletGroup.destroyEach()
              explosion.play();
       
              score = score+2
            }

        }
    }
    
    if(zombieGroup.isTouching(player)){
        lose.play()
        for(var i=0; i < zombieGroup.length; i++){
if (zombieGroup[i].isTouching(player)){
    zombieGroup[i].destroy();
    life=life-1
}
        }
    }
    zombies()}

    
drawSprites()
textSize(25)
fill("white")
text("Bullets="+bullets,displayWidth-210,displayHeight/2-250)
text("Score ="+ score,displayWidth-200,displayHeight/2-220)
text("Lives ="+ life,displayWidth-200,displayHeight/2-280)


if(gameState=="lost"){
    textSize(100)
    fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}
else if(gameState == "won"){
 
    textSize(100)
    fill("yellow")
    text("You Won ",400,400)
    zombieGroup.destroyEach();
    player.destroy()
}
else if(gameState == "bullet"){
 
    textSize(50)
    fill("yellow")
    text("You ran out of bullets!!!",470,410)
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  
  }
}


function zombies(){
    if(frameCount%60===0){
        zombie=createSprite(random(100,1000),random(100,800),10,10)
        zombie.addImage(zombieImg)
        //zombie.x+=10
        zombieGroup.add(zombie)
        zombie.scale=0.15
        zombie.velocityX=-4
        zombie.lifetime=400
        zombie.debug=true
        zombie.setCollider("rectangle",0,0,500,500)
    }
    
}
