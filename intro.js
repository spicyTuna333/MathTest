// INTRO.JS — Math Attaque
// la lecture des deux vidéos d'intro, puis redirige
// vers la page d'accueil quand elles sont terminées.
//  uniquement sur index.html.
// On récupère les deux éléments vidéo dans la page
// https://developer.mozilla.org/fr/docs/Web/API/Document/getElementById
const opening = document.getElementById("opening")
const loading  = document.getElementById("loading")
// Lance une vidéo et appelle "next" quand elle est terminée.
// Si la vidéo ne se lance pas (ex: format non supporté),
// le minuteur "fallback" appelle quand même "next" après fallbackTime millisecondes.
// https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/play
function play(video, next, fallbackTime = 6000) {
    // Minuteur de secours — déclenché si la vidéo ne se lance jamais
    const fallback = setTimeout(next, fallbackTime)
 
    video.play().then(() => {
        // La vidéo joue — on attend qu'elle soit terminée
        video.onended = () => {
            clearTimeout(fallback)  // annule le minuteur de secours
            next()                  // passe à l'étape suivante
        }
    }).catch(() => {
        // La vidéo n'a pas pu jouer — on passe quand même à la suite
        clearTimeout(fallback)
        next()
    })
}

function startIntro() {
    opening.hidden = false  // affiche la première vidéo
    loading.hidden = true   // cache la deuxième
    play(opening, startLoading, 8000)  // 8 secondes de secours
}
function startLoading() {
    opening.hidden = true   // cache la première vidéo
    loading.hidden = false  // affiche la deuxième
    play(loading, goToHome, 10000)  // 10 secondes de secours
}
// https://developer.mozilla.org/fr/docs/Web/API/Location/href
function goToHome() {
    window.location.href = "homepage.html"
}
 
// On lance l'intro dès que le script est chargé
startIntro()
