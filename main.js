import ScoreboardView from "./scoreboard/ScoreboardView.js";

// Define the number of players (up to 10)
const MAX_PLAYERS = 10;

// Dynamically generate player names (e.g., "Player 1", "Player 2", ..., "Player 10")
const playerNames = Array.from({ length: MAX_PLAYERS }, (_, i) => `Player ${i + 1}`);

// Initialize scores as an object with player indices as keys
const scores = playerNames.reduce((acc, _, index) => {
    acc[index] = 0; // Initialize all scores to 0
    return acc;
}, {});

// Select the root element where the scoreboard will be rendered
const root = document.querySelector("#app");

// Create the ScoreboardView instance
const view = new ScoreboardView(root, playerNames, (playerIndex, direction) => {
    // Convert the playerIndex string to a number
    const index = Number(playerIndex);

    // Calculate the score difference based on the direction
    const difference = direction === "minus" ? -1 : 1;

    // Update the score for the corresponding player, ensuring it doesn't go below 0
    scores[index] = Math.max(scores[index] + difference, 0);

    // Update the scoreboard view
    view.update(scores);
});

// Initial render of scores
view.update(scores);
