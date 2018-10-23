let startingBirdX = -2500;
let birdx = startingBirdX;

function loop() {
    setTimeout(function() {
        birdx += 2;
        document.getElementById("bird").style.left = birdx;

        if (birdx > window.innerWidth + 20) {
            birdx = (Math.random() * -1000) - 5000;
            document.getElementById("bird").style.top = (Math.random() * window.innerHeight*0.6) + window.innerHeight*0.2;
        }
        loop();
    }, 1);
    //ok bascially it buffers when I wanna do like a 100ms interval, but im too scared to make a recursive function with no delay cus my computer my explode in my face
    //and ik with the if statement it is a bit of a mess, but shhhhhhh.
}
loop();
