
var ball;

var myDatabase, position;

function setup(){
    createCanvas(500,500);

    //to create the DB object
    myDatabase = firebase.database();


    //3 main functions taht we will use to use our DB-
    //.ref() --->help us to go that location in the DB - to a particular node
    //.on() -->to fetch the value from the location in the DB
    //.update() --> to save the data in the DB

    var dbref = myDatabase.ref("ballposition"); //to refer to that node or location in the DB
    //the parameters for the .on("value", what to do with the value (it automatically gets the value), what to do if theres an error)
    dbref.on("value",readPosition, showErr)
 


    //we are creating the ball object with the help of Sprite
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(+3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }
    drawSprites();
}

function changePosition(xPos,yPos){
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;

    //to save the data in the DB
    var dbref= myDatabase.ref("ballposition"); //1st we have to refer to the location in the DB
    //the data in the DB is saved in the Json format
    // we are saving the balls latest position into the DB
    dbref.update({
        x: ball.x + xPos,
        y: ball.y + yPos
    })


}

function readPosition(data){
    //.val() helps us to store the data in a variable
    position= data.val();
    console.log(position);

    ball.x= position.x;//the x value from the json object position - we are using that to make the balls x pos
    ball.y=position.y;
}


function showErr(){
    console.log("Err in DB")
}