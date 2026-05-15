document.getElementById("usernameDisplay").innerText = "Joueur : " + localStorage.getItem("nom")

function nouveauNom() {
    nom = document.getElementById("username-input").value
    if (nom == ""){
        localStorage.setItem("nom", "iconu")
    } else {
        localStorage.setItem("nom", nom)
        document.getElementById("niveau").style.display = "block"
    }
}