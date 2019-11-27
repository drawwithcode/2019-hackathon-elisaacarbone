
var song;
var play;
var video;
var k = 0;
var analyzer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(40);
  song = loadSound("assets/TG1_new.mp3");

  video = createVideo(['assets/TV Static.mp4'], videoLoaded);
  video.hide();

  analyzer = new p5.Amplitude();
  analyzer.setInput(song);

  noStroke();
  fill('#9c640c');
  rect(0, height/2, width, 100); //tavolo

  rectMode(CENTER);
  fill('#85929e');
  rect(width / 2 + 300, height / 2 - 75, 200, 150, 10); //radio
  rect(width / 2 - 100, height / 2 - 175, 550, 350, 10); //television
  rect(width / 2 - 100, height / 2 + 550, 200, 500, 20); //controller
  fill('BLACK');
  rect(width / 2 - 100, height / 2 - 175, 474, 266); //screen
  rect(width / 2 + 300, height / 2 - 90, 150, 5, 20); //radio lines
  rect(width / 2 + 300, height / 2 - 110, 150, 5, 20); //radio lines
  rect(width / 2 + 300, height / 2 - 130, 150, 5, 20); //radio lines

}

function draw() {
  //video
  imageMode(CENTER);
  image(video, width / 2 - 100, height / 2 - 175, 474, 266);

  videoLoaded();
  basic();

  push();
  fill('red');
  noStroke();
  textSize(18)
  textAlign(CENTER, CENTER)
  text("Turn on the TV to see the news, get creative if it doesn't work", width/2 - 100, height/2 + 250);
  pop();
}


function basic() {
  //define the volume function
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  noFill();
  stroke(255);
  arc(width / 2 + 300, height / 2 - 150, volume*2, volume*2, PI, TWO_PI, OPEN);
}

function videoLoaded() { //once the video is loaded the on off button will appear
  on = createButton("O");

  on.position(width / 2 - 125, height / 2 + 330);
  on.size(50);

  //when the button is pressed, the function videoStarts is called
  on.mousePressed(videoStarts);
}

function videoStarts() {
  if (k == 1) {
    on.html("OFF");
    k = 0;
    video.loop();
    loaded();
} else if (k == 0) {
    on.html("ON");
    k = 1;
    video.stop();
  }
}

function loaded() { //once the TV is on the play/pause button will appear
  play = createButton("PLAY");

  play.position(width / 2 + 260, height / 2 - 65);
  play.size(80);

  //when the button is pressed, the function togglePlaying is called
  play.mousePressed(togglePlaying);
  console.log("loaded");
}

function togglePlaying() {
  if (!song.isPlaying()) { //if the song is not playing, by clicking the button it starts
    song.loop();
    play.html("PAUSE");
  } else { //if the song is already playing, if you press the button it pauses
    song.pause();
    play.html("PLAY");
  }
}
