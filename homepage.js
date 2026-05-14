
// Gère la page d'accueil : validation du nom et navigation
//https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
// https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
//https://developer.mozilla.org/fr/docs/Web/API/Window/location
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/trim

// Appelée quand le joueur clique sur "Jouer" ou appuie sur Entrée
function handlePlay() {

    // Récupère l'élément input dans le HTML
    //https://developer.mozilla.org/fr/docs/Web/API/Document/getElementById
    const input = document.getElementById('username-input')

    // .value = le texte que le joueur a tapé dans le champ
    // .trim() enlève les espaces au début et à la fin
    // Exemple : "Alex" devient "Alex"
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const username = input.value.trim()

    // Vérifie que le joueur a entré quelque chose
    // Si le nom est vide après trim(), on affiche une alerte
    if (username === "") {
        // alert() affiche une petite fenêtre popup avec un message
        // Référence : https://developer.mozilla.org/fr/docs/Web/API/Window/alert
        alert("S'il vous plaît, entrez un nom d'utilisateur !")
        return// "return" arrête la fonction ici — on ne va pas à game.html
    }
    // localStorage = stockage permanent dans le navigateur
    // Les données restent même si on ferme et rouvre le navigateur
    // setItem('clé', 'valeur') sauvegarde une donnée
    // getItem('clé') la récupère plus tard (utilisé dans game.js)
    // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
    localStorage.setItem('mathAttaqueUser', username)

    // window.location.href = changer de page en JavaScript
    // C'est comme cliquer sur un lien <a href="game.html">
    // https://developer.mozilla.org/fr/docs/Web/API/Window/location
    window.location.href = "game.html"
}
// addEventListener écoute un événement et appelle une fonction quand il se produit
// 'keydown' = une touche du clavier est enfoncée
//https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
//https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent
document.getElementById('username-input').addEventListener('keydown', function(e) {

    // e.key contient le nom de la touche appuyée
    // 'Enter' = la touche Entrée
    //https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key
    if (e.key === 'Enter') {
        handlePlay()// même effet que cliquer sur le bouton
    }
})
