var dog, happydog;
var dogimg1, dogimg2;
var database;
var foodS, foodStock;

function preload(){
  dogimg1 = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dogimg1);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  push();
  fill("white");
  textAlign(CENTER);
  textSize(20);
  text("VIRTUAL PET 1", 250, 50);
  fill("lightblue");
  text("Press UP ARROW key to feed the Dog.", 250, 80);
  fill("orange");
  text("Food Left: "+foodS, 250, 110);
  pop();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimg2);
  } else {
    //dog.addImage(dogimg1);
  }

  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}



