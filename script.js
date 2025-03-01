(function (){
    document.addEventListener("DOMContentLoaded", function() {
        const gameBoard = document.getElementById("game-board");
        const gameHeader = document.getElementById("game-header");
        const gameWinner = document.getElementById("game-winner");
        let currentPlayer = "X";
        let moves = 0;

        function newBoard() {
            moves = 0;
            for (let i = 0; i < 9; i++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.index = i;
                tile.addEventListener("click", playerMove, {once: true});
                gameBoard.appendChild(tile);
            }
            currentTurnPlayer();
        }

        function playerMove(event) {
            const tile = event.target;
            tile.textContent = currentPlayer;
            moves++;

            if (checkForWinner(currentPlayer)) {
                gameWinner.textContent = `${currentPlayer} wins!`;
                restartGame();
                return;
            }

            if (moves === 9) {
                gameWinner.textContent = `It's a draw! Restarting...`;
                restartGame();
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            currentTurnPlayer();
        }

        function currentTurnPlayer(){
            gameHeader.textContent = `It is currently ${currentPlayer}'s turn.`;
        }

        function checkForWinner(player) {
            const tiles = [...document.querySelectorAll(".tile")];
            const winningSets = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

            return winningSets.some(set => {
                const [a,b,c] = set;
                return (tiles[a].textContent === player && tiles[b].textContent === player && tiles[c].textContent === player);
            });
        }

        function restartGame() {
            gameBoard.innerHTML = "";
            newBoard();
            currentPlayer = "X";
            moves = 0;
            currentTurnPlayer();
        }

        newBoard();
    });
})();