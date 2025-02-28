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

const PlayGame = (function () {
    let gameBoard = [];
    let currentPlayer = 0;

    function newGame(){
        gameBoard = [["N","N","N"],["N","N","N"],["N","N","N"]];
        displayGameBoard();

        currentPlayer = Math.random() < 0.5 ? 1 : 2;
        console.log(`It is currently Player ${currentPlayer}'s turn.`);

        return playerMove(currentPlayer);
    }

    function displayGameBoard(){
        console.log(gameBoard[0].join(" | "));
        console.log(gameBoard[1].join(" | "));
        console.log(gameBoard[2].join(" | "));
    }

    function playerMove(player){
        let action = Number(prompt(`Make your move Player ${player}`));
        let marker = "";
        let matchState = "";

        if(player == 1){
            marker = "X";
        }else if (player == 2){
            marker = "O";
        }
        
        if(action < 4){
            gameBoard[0][(action-1)] = marker;
        }else if(action > 3 && action < 7){
            gameBoard[1][(action-4)] = marker;
        }else if(action > 6 && action < 10){
            gameBoard[2][(action-7)] = marker;
        }else{
            console.log("Invalid move try again.");
            return playerMove(player);
        }

        changeCurrentPlayer(player);

        matchState = checkForWinner();

        if (matchState == "X" || matchState == "O"){
            weHaveWinner(matchState);
        }else if (matchState == true){
            return playerMove(player);
        }else if(matchState == false){
            return outOfMoves();
        }
    }

    function changeCurrentPlayer(player) {
        if (player == 1){
            currentPlayer = 2;
            return;
        }else if (player == 2){
            currentPlayer = 1;
            return;
        }else{ 
            console.log("You're not supposed to see this! D:");
            return;
        }
    }

    function checkForWinner(){
        let winningMarker = "N";
        
        //Checking rows
        for (let i = 0; i < 3; i++){
            if(gameBoard[i][0] !== "N" && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]){
                winningMarker = gameBoard[i][0];
                return winningMarker;
            }
        }

        //Checking columns
        for (let j = 0; j < 3; j++){
            if(gameBoard[0][j] !== "N" && gameBoard[0][j] === gameBoard[1][j] && gameBoard[1][j] === gameBoard[2][j]){
                winningMarker = gameBoard[0][j];
                return winningMarker;
            }
        }

        //Checking diagonals
        if(gameBoard[0][0] !== "N" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]){
            winningMarker = gameBoard[0][0];
            return winningMarker;
        }

        if(gameBoard[0][2] !== "N" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]){
            winningMarker = gameBoard[0][0];
            return winningMarker;
        }

        //Check if out of moves
        let canStillPlay = false;
        for (let i = 0; i < gameBoard.length; i++){
            for (let j = 0; j < gameBoard[i].length; j++){
                if(gameBoard[i][j] === "N"){
                    canStillPlay = true;
                }
            }
        }

        return canStillPlay;
    }

    function weHaveWinner(marker) {
        if (marker == "X"){
            return console.log("Player 1 Wins!");
        }else if(marker == "O"){
            return console.log("Player 2 Wins!");
        }else{
            return console.log("Ooops...");
        }
    }

    function outOfMoves(){
        console.log("Match is a draw, no more moves can be played.");
    }

    return {newGame};
})();

PlayGame.newGame();