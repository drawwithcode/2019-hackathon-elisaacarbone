var video;
var k = 0;

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(40);
  song = loadSound("assets/TG1_new.mp3");

  video = createVideo(['assets/TV Static.mp4'], videoLoaded);
  video.hide();
}

function draw() {
  translate(-width/2, -height/2, 0);
  videoLoaded();
}

function videoLoaded() { //once the song is loaded the play/pause button will appear
  on = createButton("ON");

  on.position(width / 2 - 25, height / 2 + 230);
  on.size(50);

  //when the button is pressed, the function togglePlaying is called
  on.mousePressed(videoStarts);

  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2 - 200, 550, 350, 10); //television
  rect(width / 2, height / 2 - 200, 474, 266); //screen
  rect(width / 2, height / 2 + 450, 200, 500, 20); //controller

  imageMode(CENTER);
  image(video, width / 2, height / 2 - 200, 474, 266);
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
    song.stop();
    video.stop();
    play.remove();
  }
}

function loaded() { //once the song is loaded the play/pause button will appear
  play = createButton("PLAY");

  play.position(width / 2 - 40, height / 2 + 270);
  play.size(80);

  //when the button is pressed, the function togglePlaying is called
  play.mousePressed(togglePlaying);
  console.log("loaded");
}

function togglePlaying() {
  if (!song.isPlaying()) { //if the song is not playing, by clicking the button it starts
    song.loop();
    play.html("PAUSE");
    a = 1
    video.stop();
  } else { //if the song is already playing, if you press the button it pauses
    song.pause();
    play.html("PLAY");
    a = 0;
    video.loop();
  }
}
