var gamePattern = []; //array vacio para el patron a seguir

var userClickedPattern = []; //array para seguir el patron del usuario

var buttonColours = ["red","blue","green","yellow"]; //color de los colores que van a igualar el id del boton y llevar el orden del patron

var randomChosenColour;

var started=false;

var level=0;

$("body").on("keydown", function(){

    if (!started) {
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
    }
});

function nextSequence(){ //generador de numero random para escoger el color del array de botones
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber]; //se escoge un color random del array
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour); //se agrega el color random escodigo al array del patron
  playSound(randomChosenColour);
}

$(".btn").click( function(){ //funcion agregada a los botones para detectar el click y saber cual color toco
  var userChoshenColour=this.id;
  playSound(userChoshenColour);
  animatePress(userChoshenColour);
  userClickedPattern.push(userChoshenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChoshenColour));
});

//funcion para verificar las respuestas del usurio

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
    var count=0;

    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i]==userClickedPattern[i]) {
        count++
      }
    }
    if (count==gamePattern.length) {
      setTimeout(function(){
        nextSequence();
        userClickedPattern=[];
      }, 1000);
    }

  }else{
    $("body").addClass("game-over");
    playSound("wrong");
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

  }
}

//funcion que reproduce el sonido de cada color segun el parametro recibido del
function playSound(name){

  switch (name) {
    case "red":
      var audio_Red = new Audio('sounds/red.mp3');
      audio_Red.play();
      break;
    case "blue":
      var audio_Blue = new Audio('sounds/blue.mp3');
      audio_Blue.play();
      break;
    case "green":
      var audio_Green = new Audio('sounds/green.mp3');
      audio_Green.play();
      break;
    case "yellow":
      var audio_Yellow = new Audio('sounds/yellow.mp3');
      audio_Yellow.play();
      break;
    case "wrong":
      var audio_Wrong = new Audio('sounds/wrong.mp3');
      audio_Wrong.play();
      break;

    default:

  }
}

//funcion para restart el juego

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}

  //funcion para animar el boton que el usuario apreto

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}
