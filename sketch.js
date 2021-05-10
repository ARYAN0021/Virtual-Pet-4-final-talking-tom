var dog,dogimg,happyDog,foodStock,foods;
var database;
var food1,readState;
var fedTime,lastFed,foodObj
var garden,washroom,bedroom
var milk,milk2
var GameState

function preload(){
dogimg = loadImage("p.jpg");
happyDog = loadImage("sa.jpg");
 garden = loadImage("u.jpg");
 bedroom= loadImage("s.jpg");
 washroom= loadImage("m.jpg");
 livingroom=loadImage("d.jpg");
 bottle=loadImage("Milk.png");
 bottle2=loadImage("Milk.png");
 notify=loadSound("v.mp3")
 faat=loadSound("o.mp3")
 sleeping=loadSound("Yawn.mp3")
 anglena=loadSound("t.wav")
 burp=loadSound("l.mp3")
}

function setup() {
  database = firebase.database();
  createCanvas(500,600);
  
  foodObj = new Food();

  dog = createSprite(260,370,20,60);
  dog.addImage(dogimg);
  dog.scale = 1;
  
 // milk=createSprite(140,435,10,10);
 // milk.addImage(bottle)
  //milk.scale=0.025

  milk2=createSprite(280,210,10,10);
  milk2.addImage(bottle2);
  milk2.scale=0.025
  bottle2.visible = false;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


}


function draw() {
  background(46,139,87); 

 
 foodObj.display();
 //writeStock(foods);

 if(foods==0){
   dog.addImage(happyDog);
   milk2.visible = false;
 }else{
   dog.addImage(dogimg)
   milk2.visible = true;
 }

 var gameStateRef=database.ref('GameState');
  gameStateRef.on('value',function(data){
    GameState = data.val();
  });

  if(GameState===1){
    dog.addImage(happyDog);
    dog.scale=3.1
    dog.y=250;
    burp.play();
  }
  
  if(GameState===2){
    dog.addImage(dogimg);
    dog.scale=3.1;
    milk2.visible=false;
    dog.y=250;
    burp.play();
  }
  
  var Bath=createButton("I want to toilet");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
  GameState=3;
  database.ref('/').update({'GameState':GameState});
faat.play();
  }));
  
  if(GameState===3){
    dog.y=295
    dog.addImage(washroom);
    dog.scale=4.2;
    milk2.visible=false;
  }
  var Sleep=createButton("I am very sleepy");
  Sleep.position(690,125);
  if(Sleep.mousePressed(function(){
  GameState=4;
  database.ref('/').update({'GameState':GameState});
  sleeping.play();
  }));
  if(GameState===4){
      dog.addImage(bedroom);
      dog.scale=3.9;
      milk2.visible=false;  
  }
  var Play =createButton("Let's Play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
  GameState=5;
  database.ref('/').update({'GameState':GameState});
  notify.play();
  }));
  if(GameState===5){
    dog.addImage(livingroom)
  dog.scale=3;
  milk2.visible=false;
  }
  
  var PlayInGarden=createButton("Lets talk to Angela")
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
  GameState=6
  database.ref('/').update({'GameState':GameState});
  anglena.play();
  }));
  if(GameState===6){
    dog.y=370;
    dog.addImage(garden);
    dog.scale=3.1;
    milk2.visible=false;
  }
  
  
  



/*if(GameState!=="Hungry"){
feed.hide();
addFood.hide();
dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(dogimg)
}*/

  drawSprites();
 
  
  fill ("black")
  textSize(20);
  text("Cat Food remaining :" + foods,170,490)
  

}

function readStock(data){
  foods = data.val();
 
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  });
}

















