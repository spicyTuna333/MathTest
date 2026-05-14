 function handlePlay() {
      const input = document.getElementById('username-input');
      const username = input.value.trim();
      if (username === "") {
        alert("S'il vous plaît, entrez un nom d'utilisateur !");
        return;
      }
      localStorage.setItem('mathAttaqueUser', username);
      window.location.href = "game.html";
    }

    document.getElementById('username-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handlePlay();
    });
