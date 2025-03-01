/*
    1. New Game
    2. Players Enter Names
    3. Coin flip determines who goes first
    4. Player chooses tile to place their marker
        4a. Tile changes to player's marker
        4b. Tile prevents other player from claiming it
    5. Game checks if there was a winning move or all tiles
        are claimed
        5a. Declares winner if there was
        5a. Declares draw if there wasn't
        5c. Prompts to rematch, resetting board while retaining names
        5d. Prompts to new game, going back to [1.]
    6. If moves can still be made or tiles are still open
        next player plays, then goes back to [4.]
*/

(function (){
    document.addEventListener("DOMContentLoaded", function() {
        const gameBoard = document.getElementById("game-board");
        let currentPlayer = "X";

        function newBoard() {
            for (let i = 0; i < 9; i++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.index = i;
                tile.addEventListener("click", playerMove, {once: true});
                gameBoard.appendChild(tile);
            }
        }

        function playerMove(event) {
            const tile = event.target;
            tile.textContent = currentPlayer;
            if (checkForWinner()) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 10);
                restartGame();
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }

        function checkForWinner() {
            const tiles = [...document.querySelectorAll(".tile")];
            const winningSets = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

            return winningSets.some(set => {
                const [a,b,c] = set;
                return (tiles[a].textContent && tiles[a].textContent === tiles[b].textContent && tiles[a].textContent === tiles[c].textContent);
            });
        }

        function restartGame() {
            gameBoard.innerHTML = "";
            newBoard();
            currentPlayer = "X";
        }

        newBoard();
    });
})();