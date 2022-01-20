//2
const boxPink = document.getElementById("test-event");

//3
function mouseOver(){
    boxPink.innerHTML = "Hai!";
    boxPink.style.backgroundColor = "blue";
}

function mouseOut(){
    boxPink.innerHTML = "Mouse Over Me!";
    boxPink.style.backgroundColor = "pink";
}

//4
boxPink.addEventListener("mouseover",mouseOver);
boxPink.addEventListener("mouseout", mouseOut);

function removeHandler(){
    boxPink.removeEventListener("mouseover",mouseOver);
    boxPink.removeEventListener("mouseout",mouseOut);
}

document.getElementById("mine").addEventListener("mousemove", myFunction);

function myFunction() {
  document.getElementById("demo").innerHTML = Math.random();
}

function removeHandler() {
  document.getElementById("mine").removeEventListener("mousemove", myFunction);
}