//Create variables here
var dog, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  saddog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happydog.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  
  dog  = createSprite(250,250,30,30);
  dog. addImage(saddog);
  dog.scale = 0.2;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Press UP_ARROW Key To Feed Tom Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}