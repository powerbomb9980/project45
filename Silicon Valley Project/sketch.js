var player, playerImg, plrAnimation, plrAnimationLeft;
var ground, ground2, ground3, ground4, groundImg;
var back;
var backgroundImg;
var topBorder, rightBorder, leftBorder, bottomBorder;
var obstacle;
var obsImgUp, obsImgDown;
var obstacleGroup;
var gameState = 0;
var gameOver, gmOverImg;
var restart, restartImg;
var health = 3;
var heart1, heart2, heart3, heartImg;







function preload() {
  playerImg = loadAnimation("Images/Player.png");
  plrAnimation = loadAnimation("Images/Player Walk/sprite_0.png", "Images/Player Walk/sprite_1.png")
  plrAnimationLeft = loadAnimation("Images/Player Walk Left/sprite_0.png", "Images/Player Walk/sprite_1.png")
  groundImg = loadImage("Images/Ground.Png");
  backgroundImg = loadImage("Images/Background.png");
  gmOverImg = loadImage("Images/Game Over.png");
  restartImg = loadImage("Images/Restart.png");
  heartImg = loadImage("Images/Heart.png");


}

function setup() {
  createCanvas(1400, 700);
  ground = new Ground(600, 165, 1200, 20, "Images/Ground.png");
  ground2 = new Ground(800, 350, 1200, 20, "Images/Ground.png");
  ground3 = new Ground(600, 535, 1200, 20, "Images/Ground.png");
  ground4 = new Ground(800, 695, 1200, 20, "Images/Ground.png");

  player = new Player(40, 50, 25, 25);

  topBorder = createSprite(700, -50, 1400, 10);
  rightBorder = createSprite(1400, 350, 10, 1400);
  leftBorder = createSprite(0, 350, 10, 1400);
  bottomBorder = createSprite(700, 700, 1400, 10);

  obstacleGroup = new Group();

  gameOver = createSprite(700, 200, 50, 50);
  gameOver.addImage(gmOverImg);
  gameOver.scale = 1.5;

  restart = createSprite(700, 400, 50, 50);
  restart.addImage(restartImg);
  restart.scale = 0.25;

  heart1 = createSprite(1275, 25, 25, 25);
  heart1.addImage(heartImg);
  heart1.scale = 0.25;
  
  heart2 = createSprite(1325, 25, 25, 25);
  heart2.addImage(heartImg);
  heart2.scale = 0.25;

  heart3 = createSprite(1375, 25, 25, 25);
  heart3.addImage(heartImg);
  heart3.scale = 0.25;

  for (var i = 150; i < 1200; i = i + 300) {
    obstacle = new Obstacles(i, 137, 25, 25, "Images/Ice Spike Up.png");
    obstacleGroup.add(obstacle.sprite);
    obstacle.sprite.setCollider("rectangle", 0, 0, 25, 25);
  }

  for (var i = 300; i < 1200; i = i + 300) {
    obstacle = new Obstacles(i, 18, 25, 25, "Images/Ice Spike Down.png");
    obstacleGroup.add(obstacle.sprite);
    obstacle.sprite.setCollider("rectangle", 0, 0, 25, 35);
  }
}



function draw() {

  if (gameState == 0) {
    background(backgroundImg);
    player.sprite.changeAnimation("player", playerImg);
    if (keyDown(RIGHT_ARROW)) {
      player.sprite.x = player.sprite.x + 10;
      player.sprite.changeAnimation("playerA", plrAnimation);
    }

    if (keyWentDown(UP_ARROW)) {
      player.sprite.y = player.sprite.y - 75;
      player.sprite.x = player.sprite.x + 15;
    }

    if (keyDown(LEFT_ARROW)) {
      player.sprite.x = player.sprite.x - 10;
      player.sprite.changeAnimation("playerB", plrAnimationLeft);
    }
    player.sprite.y += 5;
  }

  gameOver.visible = false;
  restart.visible = false;

  ground.display();
  ground2.display();
  ground3.display();
  ground4.display();

  //topBorder.visible = false;
  bottomBorder.visible = false;
  rightBorder.visible = false;
  leftBorder.visible = false;

  player.sprite.collide(ground.sprite);
  player.sprite.collide(ground2.sprite);
  player.sprite.collide(ground3.sprite);
  player.sprite.collide(ground4.sprite);
  player.sprite.collide(bottomBorder);
  player.sprite.collide(rightBorder);
  player.sprite.collide(leftBorder);
  player.sprite.collide(topBorder);

  console.log(health);
  
  if (player.sprite.isTouching(obstacleGroup)) {
    health = health - 1;
    player.sprite.x = 40;
    player.sprite.y = 50;
  }

  if(health == 2){
    heart1.visible = false;
  }
  
  if(health == 1){
    heart2.visible = false;
  }

  if(health == 0){
    heart3.visible = false;
    gameState = 1;
  }

  if (gameState == 1) {
    background(0);
    player.sprite.visible = false;
    obstacleGroup.setVisibleEach(false);
    gameOver.visible = true;
    restart.visible = true;
    textSize(35);
    fill(255);
    text("RESTART", 625, 500);
    
    if(mousePressedOver(restart)){
      gameState = 0;
      player.sprite.visible = true;
      player.sprite.x = 40;
      player.sprite.y = 50;
      obstacleGroup.setVisibleEach(true);
      health = 3;
      heart1.visible = true;
      heart2.visible = true;
      heart3.visible = true;
    }
  }

  

  drawSprites();
}
