/*
function genereParabole(){
    const canvas = document.getElementById("paraboleCanvas");
    const ctx = canvas.getContext("2d");

    ctx.rotate((Math.PI/180)*20);

    ctx.fillStyle = "red";
    ctx.fillRect(50, 10, 100, 50);

    ctx.strokeStyle = "blue";
    ctx.strokeRect(70, 30, 100, 50);
}
*/
/*const parabole = document.getElementById("paraboleCanvas").getContext("2d")
let equation = randomParabole()
function genereParabole(){
    let y
    let a = parseFloat(document.getElementById("a").value)
    let b = parseFloat(document.getElementById("b").value)
    let c = parseFloat(document.getElementById("c").value)
    console.log(a+b+c)
    parabole.clearRect(0, 0, 1000, 400)
    parabole.beginPath()
    parabole.translate(1, 400)
    parabole.scale(1, -1)
    console.log("arriver")
    for (let x = 0; x <= 1000; x++) {
        switch (equation) {
            case 1 :
                y = a * x * x + b * x + c
                console.log(equation)
                break
            case 2 : 
                y = a * (x - b) * (x - c)
                console.log(equation)
                break
            case 3 :
                y = a * (x - b)**2 + c
                console.log(equation)
                 break
        }
        if (y<0 || y>400 || x<0 || x>1000) {
            let canvasX = x*20 
            let canvasY = y*20
            parabole.lineTo(canvasX, canvasY)
            console.log("je dessine")
        } else {
            console.log("je suis trop haut")
        }
    }
    parabole.strokeStyle = "red"
    parabole.stroke()
}
function randomParabole() {
    let forme = Math.random()*3
    if (forme <= 1) {
        return 1 //Parabole générale
    } else if (forme <= 2) {
        return 2 //parabole factorisée
    } else {
        return 3 //parabole canonique
    }
}


function formuleAleatoire() {
    let formule = ""
        switch(equation){
        case 1 : formule = "y = ax^2 + bx + c"
            break
        case 2 : formule = "y = a(x-r)(x-s)"
            break
        case 3 : formule = "y = a(x-h)^2 + k"
            break

    }
    document.getElementById("divformule").innerText = "metre votre equation sous la formule "+formule;
}

function nouvelleparabole(){
    formuleAleatoire()
    document.getElementById("a").value = ""
    document.getElementById("b").value = ""
    document.getElementById("c").value = ""
    document.getElementById("divAffiche").innerText = ""
}
*/
//https://stackoverflow.com/questions/8145154/how-do-i-load-a-video-into-a-html5-page-with-javascript-using-onclick

const opening = document.getElementById("opening");
const loading = document.getElementById("loading");

function play(video, next, fallbackTime = 6000){
  const fallback = setTimeout(next, fallbackTime);
  video.play().then(() => {
    video.onended = () => {
      clearTimeout(fallback);
      next();
    };
  }).catch(() => {
    clearTimeout(fallback);
    next();
  });
}

function startIntro(){
  opening.hidden = false;
  loading.hidden = true;
  play(opening, startLoading);
}

function startLoading(){
  opening.hidden = true;
  loading.hidden = false;
  play(loading, goToGame);
}

function goToGame(){
  window.location.href = "homepage.html";
}

// Only runs on index.html where the videos exist
if (opening && loading) {
  startIntro();
}

 function handlePlay() {
            const username = document.getElementById('username-input').value.trim();
            if (username === "") {
                alert("S'il vous plaît, entrez un nom d'utilisateur !");
                return;
            }
            localStorage.setItem('mathAttaqueUser', username);
            window.location.href = "game.html";
        }

        // Pressing Enter in the input also triggers play
        document.getElementById('username-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') handlePlay();
        });
}


