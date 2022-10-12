song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCanvas(600, 500);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;



        leftWristX = results[0].pose.leftWrist.x;
        lwftWristY = results[0].pose.leftWrist.y;


        
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    imagw(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000")
if(scoreRightWrist > 0.2)
{
    circle(rightWristY,rightWristY,20);

    song2.stop();

    if(song1_status == false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Playing - song1"
    }
}
if(scoreLeftWrist > 0.2)
{
    circle(leftWristY,leftWristY,20);

    song1.stop();

    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song").innerHTML = "Playing - song2"
    }
}
}