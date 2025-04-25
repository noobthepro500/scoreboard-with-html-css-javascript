export default class ScoreboardView {
    constructor(root, playerNames, onControlButtonClick) {
        this.root = root;
        this.playerNames = playerNames;

        // Generate the scoreboard HTML dynamically based on the number of players
        this.root.innerHTML = `
            <div class="scoreboard">
                ${this.playerNames
                    .map(
                        (name, index) => `
                    <div class="scoreboard__name" data-player-index="${index}">${name}</div>
                    <div class="scoreboard__score" data-player-index="${index}">0</div>
                    <div class="scoreboard__controls" data-player-index="${index}">
                        <button class="scoreboard__control-button">-</button>
                        <button class="scoreboard__control-button">+</button>
                    </div>
                `
                    )
                    .join("")}
            </div>
        `;

        // Add event listeners to all control buttons
        this.root.querySelectorAll(".scoreboard__control-button").forEach(controlButton => {
            controlButton.addEventListener("click", () => {
                const direction = controlButton.textContent === "-" ? "minus" : "plus";
                const playerIndex = controlButton
                    .closest(".scoreboard__controls")
                    .dataset.playerIndex;

                onControlButtonClick(playerIndex, direction);
            });
        });
    }

    /**
     * Updates the scores for all players.
     * @param {Object} scores - An object where keys are player indices (as strings) and values are their scores.
     */
    update(scores) {
        Object.entries(scores).forEach(([playerIndex, score]) => {
            this.root.querySelector(
                `.scoreboard__score[data-player-index="${playerIndex}"]`
            ).textContent = score;
        });
    }
}
