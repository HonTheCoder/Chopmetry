document.addEventListener('DOMContentLoaded', () => {
  const waitForFirebase = () => {
    if (!window.firestore || !window.firebaseDB) {
      return setTimeout(waitForFirebase, 50);
    }

    const {
      collection,
      addDoc,
      getDocs,
      query,
      orderBy,
      limit
    } = window.firestore;

    const leaderboardBtn = document.getElementById('leaderboard-btn');
    const leaderboardModal = document.getElementById('leaderboard-modal');
    const closeBtn = document.querySelector('.close-leaderboard-btn');
    const leaderboardList = document.getElementById('leaderboard-list');
    const submitBtn = document.getElementById('submit-score-btn');
    const nameInput = document.getElementById('player-name-input');

    async function fetchLeaderboard(mode = 'ranked') {
      leaderboardList.innerHTML = '<li>Loading...</li>';
      const scoresRef = collection(window.firebaseDB, mode);
      const q = query(scoresRef, orderBy("score", "desc"), limit(10));
      const querySnapshot = await getDocs(q);

      leaderboardList.innerHTML = '';
      querySnapshot.forEach(doc => {
        const { name, score } = doc.data();
        const li = document.createElement('li');
        li.textContent = `${name} - ${score}`;
        leaderboardList.appendChild(li);
      });
    }

    // ⬇️ Show leaderboard modal
    leaderboardBtn.addEventListener('click', () => {
      leaderboardModal.style.display = 'block';
      fetchLeaderboard('ranked');
    });

    // ⬇️ Close modal
    closeBtn.addEventListener('click', () => {
      leaderboardModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === leaderboardModal) {
        leaderboardModal.style.display = 'none';
      }
    });

    // ⬇️ Submit Score Button Handler
    if (submitBtn) {
      submitBtn.addEventListener('click', async () => {
        const playerName = nameInput.value.trim() || 'Anonymous';
        const score = state?.game?.score ?? 0;

        if (!score || score <= 0) {
          alert("Score is zero or undefined.");
          return;
        }

        try {
          await addDoc(collection(window.firebaseDB, 'ranked'), {
            name: playerName,
            score: score
          });
          alert("Score submitted!");
          showLeaderboardOnGameOver('ranked');
        } catch (err) {
          console.error("Error submitting score:", err);
          alert("Failed to submit score.");
        }
      });
    }

    // Called on game over to update leaderboard
    window.showLeaderboardOnGameOver = function (mode) {
      fetchLeaderboard(mode === GAME_MODE_RANKED ? 'ranked' : 'casual');
    };
  };

  waitForFirebase();
});
