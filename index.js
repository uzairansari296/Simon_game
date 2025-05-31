var buttonColours  = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true; 
    }
})



function  nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}

$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log(gamePattern[currentLevel]);
        // console.log(userClickedPattern[currentLevel]);
        // console.log("succes");

        if(userClickedPattern.length === gamePattern.length) {
        //     console.log(gamePattern.length);
        // console.log(userClickedPattern.length);
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        gamePattern = [];
        userClickedPattern = [];
        started = false;
        level = 0;
    }
}


































// $("")

// $(".yellow").on("click",function(){
//     var audio = new Audio("sounds/yellow.mp3");
//     audio.play();
// })
// $(".blue").on("click",function(){
//     var audio = new Audio("sounds/blue.mp3");
//     audio.play();
// })
// $(".red").on("click",function(){
//     var audio = new Audio("sounds/red.mp3");
//     audio.play();
// })