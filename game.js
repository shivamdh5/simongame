var buttoncolours = ["red", "blue", "green", "yellow"];

var gamepattern = [];
var userclickedpattern = [];

var start=false;
var level=0;
$(document).keypress(function (){
    if(!start){
        $("#level-title").text("level " + level);
        $("#level1-title").text("Play on")
        nextsequence();
        start=true;
    }
});
$(".btn").click(function(){
    var userchosencolour=$(this).attr("id");
    userclickedpattern.push(userchosencolour);
    playsound(userchosencolour);
    animatepress(userchosencolour);
    checkAnswer(userclickedpattern.length-1);
});
function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userclickedpattern[currentLevel]) {

      if (userclickedpattern.length === gamepattern.length){

        setTimeout(function () {
          nextsequence();
        },1000);
      }
    } 
   else{
      playsound("wrong");

      $("body").addClass("game-over");
      $("#level-title").text("Game Over,Press Any Key to Restart");
      $("#level1-title").text("Score:"+ level);
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
   }
}
function nextsequence() {
  userclickedpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomchosencolour = buttoncolours[randomnumber];
  gamepattern.push(randomchosencolour);

  $("#" + randomchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomchosencolour);
  animatepress(userchosencolour);
}
function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatepress(currentcolor) {

    $("#" + currentcolor).addClass("pressed");
  
    setTimeout(function () {
      $("#" + currentcolor).removeClass("pressed");
    }, 100);
}
function startOver() {
    level=0;
    gamepattern=[];
    start=false;
}
  