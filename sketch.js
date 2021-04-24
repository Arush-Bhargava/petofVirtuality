const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var dog, dogImg, happyDog, database, foodS, foodStock;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  var happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250, 40, 40);
  dog.addImage(dogImg);

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}

function draw() {
  background(46, 139, 87);

  text("foodStock", 50, 450);
  textSize(40);
  fill("blue");
  stroke();

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
}

function readStock() {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref("/").update({
    food: x,
  });
}
