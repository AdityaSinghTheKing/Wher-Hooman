song=""
status_model=""
objects=[]
function preload(){
    song=loadSound("alarm.mp3")
}
function setup(){
    canvas=createCanvas(640 , 420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd" , modelLoaded)
}
function draw(){
    image(video , 0 , 0 , 640 , 420);
    if(status_model!=""){
        objectdetector.detect(video , gotresults)
        song.stop()

        for(i=0 ; i < objects.length ; i++){

            document.getElementById("status").innerHTML="Baby Detected"
            document.getElementById("n.o.objects").innerHTML=objects.length;
            r=random(255)

            g=random(255)

            b=random(255)
            
            percent=floor(objects[i].confidence * 100);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height ,)
            fill(r , g , b);
            text(objects[i].label + percent + "%", objects[i].x + 15 , objects[i].y  + 15);
            noFill()
            stroke(r , g , b)
        }
    }
    else{
        document.getElementById("status").innerHTML="Baby is gone........say good bye"
        song.play()
    }
}
function modelLoaded(){
    console.log("The model is loaded");
    status_model=true
}
function gotresults(error , results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects=results
    }
}
