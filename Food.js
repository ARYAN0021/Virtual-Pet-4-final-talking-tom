class Food{
    constructor(){}

display(){
    fill("red")

    var button=createButton("Feed the Tom");
    button.position(400,125)

    if(button.mousePressed(function(){
        if(foods>0){
foods=foods-1;
        }
GameState=1;
database.ref('/').update({'GameState':GameState});
    }));

var addFood=createButton("Add Food")
addFood.position(500,125);
 if(addFood.mousePressed(function(){
foods=foods+1
GameState=2;
database.ref('/').update({'GameState':GameState});
 }));
}
}