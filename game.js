var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

function playSound(name) {
    var audio = new Audio('./'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    },100);

    // $('#'+currentColour).addClass('pressed').delay(100).removeClass('pressed'); 
    // these will not work as .delay() only works with animations such as slideIN or fadeOut etc 
    // and removeClass is not an animation of jQuery
}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;    
    $("h1").text("Level "+level);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    
    playSound(userChosenColour);

    currentAnswer(userClickedPattern.length-1);
});

function currentAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if(currentLevel+1 === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        while(level>=10) {
            $(".btn").delay(500).fadeIn(100).fadeOut(100).fadeIn(100);
            level-=10;
        }
        while(level>0) {
            $("#green").delay(500).fadeOut(100).fadeIn(100);
            level-=1;
        }

        $("h1").text("Game-Over, Press any key to Restart");
        startover();
    }
}

// start the game when keyboard key is pressed
var started = false;
$(document).on('keydown', function() {  // here instead of document, "body" can be used and instead of keydown, keypress can e used
    if(started===false) nextSequence();
    started = true;
});

function startover() {
    level = 0;
    gamePattern = [];
    started = false;
}