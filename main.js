sound = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 400);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = "true";
    
}

function preload(){
    sound = loadSound("hogwarts_christmas.mp3");
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0 , 0, 600, 400);
    objectDetector.detect(video, gotResult);
    r = random(255);
    g = random(255);
    b = random(255);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Objects detected";
            fill(r ,g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby found";
                console.log("stop");
                sound.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby not found";
                console.log("play");
                sound.play();
            }
        }

        if(objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "Baby not found";
                console.log("play");
                sound.play();
        }
    }
}