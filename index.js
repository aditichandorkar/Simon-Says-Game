var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level"+level);
        nextSequence();
    started=true;    }
});





$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);


   
});


function nextSequence(){
    userClickedPattern=[];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random(randomNumber)*3+1);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
 
    
    
    
}

function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
   
}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");


    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
        //....and whatever else you need to do
}, 100);

    
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
    
            },1000);
        
        }
    }
   

    else{
        console.log("wrong");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play()
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
            //....and whatever else you need to do
    }, 200);
    
    $("#level-title").text("Game over. Press any key to Restart.");
    startOver();


    }
      

}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}









