
// Le fichier principal du jeu
//https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
//https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
//https://developer.mozilla.org/fr/docs/Web/API/window/requestAnimationFrame
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//  https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
//https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
// On trouve l'élément <canvas> dans le HTML grâce à son id "myCanvas"
//https://developer.mozilla.org/fr/docs/Web/API/Document/getElementById
const canvas = document.getElementById("myCanvas")

// On récupère le "contexte 2D" — c'est lui qui nous permet de dessiner
//https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext
const ctx = canvas.getContext("2d")
// window.innerWidth  = largeur de la fenêtre du navigateur en pixels
// window.innerHeight = hauteur de la fenêtre du navigateur en pixels
//https://developer.mozilla.org/fr/docs/Web/API/Window/innerWidth
const largeure = window.innerWidth
const hauteure = window.innerHeight

// On positionne le canvas pour qu'il couvre toute la page
// position: fixed = reste en place même si on scrolle
// Référence CSS : https://developer.mozilla.org/fr/docs/Web/CSS/position
canvas.style.position = "fixed"
canvas.style.top= "0"
canvas.style.left = "0"
canvas.style.zIndex = "0"

// On dit au canvas combien de pixels il doit avoir
// IMPORTANT : sans ça, le canvas a une taille par défaut de 300x150
canvas.width = largeure
canvas.height = hauteure

// Math.random() donne un nombre entre 0 et 1
// On le multiplie pour avoir une plage plus grande
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
function randomPositionPlayerX(minX, maxX) {
    minX = Math.ceil(minX)// arrondit vers le haut
    maxX = Math.floor(maxX) // arrondit vers le bas
    return Math.floor(Math.random() * (maxX - minX + 1)) + minX
}
function randomPositionPlayerY(minY, maxY) {
    minY = Math.ceil(minY)
    maxY = Math.floor(maxY)
    return Math.floor(Math.random() * (maxY - minY + 1)) + minY
}
function randomPositionEnemyX(minX, maxX) {
    minX = Math.ceil(minX)
    maxX = Math.floor(maxX)
    return Math.floor(Math.random() * (maxX - minX + 1)) + minX
}
function randomPositionEnemyY(minY, maxY) {
    minY = Math.ceil(minY)
    maxY = Math.floor(maxY)
    return Math.floor(Math.random() * (maxY - minY + 1)) + minY
}

// Ces positions sont en "cases de grille", pas en pixels
// Le joueur est à gauche (colonnes 1-3), l'ennemi à droite (12-15)
var playerX = randomPositionPlayerX(1, 3)
var playerY = randomPositionPlayerY(2, 6)
var enemyX = randomPositionEnemyX(12, 15)
var enemyY = randomPositionEnemyY(2, 6)
// On divise l'écran en 16 colonnes et 10 rangées
// Ça crée un système de coordonnées facile à utiliser
const griCol = 16 // nombre de colonnes
const gridRow = 10 // nombre de rangées
const celWid = largeure / griCol // largeur d'une case en pixels
const celHei = hauteure / gridRow // hauteur d'une case en pixels
// PROBLÈME : en canvas, Y=0 est en HAUT, mais en maths, Y=0 est en BAS
// SOLUTION : on inverse Y avec "hauteure - gy * celHei"
// Exemple : grille (2, 3) → canvas (125px depuis gauche, 280px depuis haut)
// https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function griToPix(gx, gy) {
    return {
        px: gx * celWid,// X normal — va de gauche à droite
        py: hauteure - gy * celHei// Y inversé — 0 est en bas de l'écran
    }
}

// tire : true quand un projectile est en vol (empêche de tirer 2 fois)
// path : tableau de tous les points par où le projectile est passé
// highlightPath : le dernier tir raté — reste affiché en pointillés
// t : paramètre qui avance de 0.05 à chaque image (fait bouger le tir)
let tire= false
let path = []
let highlightPath = []
let t= 0
// Cette fonction est appelée à CHAQUE image de l'animation
// Elle efface tout et redessine depuis zéro
// https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
function drawScene() {

    // Efface tout avec un rectangle noir qui couvre tout le canvas
    //https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, largeure, hauteure)

    // rgba(255,255,255,0.1) = blanc très transparent (presque invisible)
// https://developer.mozilla.org/fr/docs/Web/CSS/color_value
    ctx.strokeStyle = "rgba(255,255,255,0.1)"
    ctx.lineWidth = 1

    // Lignes verticales (une par colonne)
    for (let j = 0; j <= griCol; j++) {
        ctx.beginPath()
        ctx.moveTo(j * celWid, 0)// part du haut
        ctx.lineTo(j * celWid, hauteure) // va jusqu'en bas
        ctx.stroke()
    }

    // Lignes horizontales (une par rangée)
    for (let i = 0; i <= gridRow; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * celHei) // part de la gauche
        ctx.lineTo(largeure, i * celHei) // va jusqu'à droite
        ctx.stroke()
    }

    // arc(x, y, rayon, angleDepart, angleFin) dessine un cercle
    // Math.PI * 2 = 360 degrés = un cercle complet
    //https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/arc
    var player = griToPix(playerX, playerY)
    ctx.beginPath()
    ctx.arc(player.px, player.py, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#0cc"// cyan
    ctx.fill()
    var enemy = griToPix(enemyX, enemyY)
    ctx.beginPath()
    ctx.arc(enemy.px, enemy.py, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#e44"// rouge
    ctx.fill()

    // Dessine le dernier tir raté en pointillés
    drawHighlight()
}

// highlightPath contient les points du dernier tir manqué
// setLineDash([6, 4]) = tirets de 6px séparés par des espaces de 4px
//https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/setLineDash
function drawHighlight() {
    if (highlightPath.length < 2) return// rien à dessiner si vide

    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"// blanc semi-transparent
    ctx.lineWidth = 2
    ctx.setLineDash([6, 4])// style pointillé — montre que c'est un "vieux" tir

    ctx.moveTo(highlightPath[0].px, highlightPath[0].py)
    for (let i = 1; i < highlightPath.length; i++) {
        ctx.lineTo(highlightPath[i].px, highlightPath[i].py)
    }
    ctx.stroke()

    ctx.setLineDash([])// IMPORTANT : remet les lignes normales pour la suite
}

// path = tous les points par où le projectile est passé
// currentPos = la position actuelle du projectile (le "bout" de la traînée)
//https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
function drawTrail(path, currentPos) {
    if (path.length < 2) return// besoin d'au moins 2 points pour tracer une ligne

    // Dessine la ligne de la traînée
    ctx.beginPath()
    ctx.strokeStyle = "rgba(100, 180, 255, 0.9)"// bleu clair
    ctx.lineWidth = 2
    ctx.moveTo(path[0].px, path[0].py)
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].px, path[i].py)
    }
    ctx.stroke()

    // Dessine un petit point blanc à la tête du projectile
    ctx.beginPath()
    ctx.arc(currentPos.px, currentPos.py, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"
    ctx.fill()
}
// Vérifie si le projectile est assez proche de l'ennemi pour compter comme un tir
// On utilise le théorème de Pythagore : distance = √(dx² + dy²)
// Si la distance est moins de 14 pixels → c'est un HIT !
// https://fr.wikipedia.org/wiki/Théorème_de_Pythagore
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
function isNearEnemy(px, py) {
    var e  = griToPix(enemyX, enemyY)// position de l'ennemi en pixels
    var dx = px - e.px // distance horizontale
    var dy = py - e.py // distance verticale
    return Math.sqrt(dx*dx + dy*dy) < 14 // distance totale < 14px = touché!
}

// Appelée quand le projectile touche l'ennemi OU sort de l'écran
// didHit = true si c'est un HIT, false si c'est un MISS
function finishShot(didHit) {
    tire = false// permet de tirer à nouveau

    if (didHit) {
        // Tir réussi !
        document.getElementById("divAffiche").innerText = "HIT!"
        highlightPath = []// efface le dernier tir raté
        nouvelleparabole() // génère de nouvelles positions
    } else {
        // Tir raté
        document.getElementById("divAffiche").innerText = "Miss"
        highlightPath = path.slice() // .slice() copie le tableau pour le garder affiché
        drawScene()
    }
}

// Appelée quand le joueur clique sur "TIRER"
// Lance l'animation du projectile avec requestAnimationFrame
//https://developer.mozilla.org/fr/docs/Web/API/window/requestAnimationFrame
function lancer() {

    // Lit les valeurs entrées par le joueur
    // parseFloat convertit le texte de l'input en nombre décimal
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
    let a = parseFloat(document.getElementById("a").value)
    let b = parseFloat(document.getElementById("b").value)

    // isNaN = "is Not a Number" — vérifie si la valeur est invalide
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    if (isNaN(a) || isNaN(b)) {
        document.getElementById("divAffiche").innerText = "Entrez des valeurs pour a et b!"
        return// arrête la fonction ici
    }

    if (tire) return// déjà en train de tirer, on ignore le clic

    // Prépare un nouveau tir
    tire = true
    t    = 0
    path = []
    document.getElementById("divAffiche").innerText = ""
    // step() est appelée ~60 fois par seconde par requestAnimationFrame
    // À chaque appel, le projectile avance d'un petit pas
    function step() {

        // Calcule où est le projectile MAINTENANT en coordonnées de grille
        // worldX avance de 0.05 à chaque image (va vers la droite)
        // worldY suit la formule de parabole : y = playerY + (-a·t² + b·t)
        // Le "-a" force la parabole vers le HAUT (comme un vrai tir d'artillerie)
        // https://fr.wikipedia.org/wiki/Parabole
        var worldX = playerX + t
        var worldY = playerY + (-a*t*t + b*t)

        // Convertit les coordonnées de grille en pixels pour dessiner
        var pos = griToPix(worldX, worldY)

        // Ajoute ce point à la traînée
        // .push() ajoute un élément à la fin d'un tableau
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push
        path.push(pos)

        // Redessine toute la scène + la traînée du tir
        drawScene()
        drawTrail(path, pos)
        // Cas 1 : touche l'ennemi
        if (isNearEnemy(pos.px, pos.py)) {
            finishShot(true)
            return // "return" arrête la boucle requestAnimationFrame
        }

        // Cas 2 : sort de l'écran (trop à droite, en dessous du sol, ou trop à gauche)
        if (worldX > griCol || worldY < 0 || worldX < 0) {
            finishShot(false)
            return // "return" arrête la boucle requestAnimationFrame
        }

        t += 0.05 // avance le projectile de 0.05 case vers la droite
        requestAnimationFrame(step) // demande au navigateur d'appeler step() à la prochaine image
    }

    step() // lance la première image pour démarrer tout
}

// Génère de nouvelles positions aléatoires et remet tout à zéro
function nouvelleparabole() {
    playerX = randomPositionPlayerX(1, 3)
    playerY = randomPositionPlayerY(2, 6)
    enemyX = randomPositionEnemyX(12, 15)
    enemyY = randomPositionEnemyY(2, 6)
    tire= false
    path= []
    t= 0
    document.getElementById("a").value = ""
    document.getElementById("b").value= ""
    document.getElementById("divAffiche").innerText = ""
    drawScene()
}
drawScene()
// localStorage permet de sauvegarder des données dans le navigateur
// On récupère le nom entré sur la page d'accueil
//https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
let username = localStorage.getItem('mathAttaqueUser') || "Joueur"
document.getElementById("usernameDisplay").innerText = "Joueur : " + username
