 const username = document.getElementById('txtusername-input').value.trim();
  if (username === "") {
    alert("S'il vous plaît, entrez un nom d'utilisateur !");
    return;
  }
  localStorage.setItem('mathAttaqueUser', username);
  window.location.href = "game.html";


 
