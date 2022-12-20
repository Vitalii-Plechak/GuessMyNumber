'use strict';

class GuessMyNumber {
    /**
     * @param {number} minNumber
     * @param {number} maxNumber
     * @param {number} scoreValue
     */
    constructor(minNumber = 1, maxNumber = 20, scoreValue = 15) {
        this.randomNumber = this.getRandomNumber(minNumber, maxNumber);
        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.input = document.querySelector('.guess');
        this.inputValue = this.setInputValue();
        this.btnAgain = document.querySelector('.btn.again');
        this.btnCheck = document.querySelector('.btn.check');
        this.numberBox = document.querySelector('.number');
        this.message = document.querySelector('.message');
        this.score = document.querySelector('.score');
        this.scoreValue = scoreValue;
        this.highscore = document.querySelector('.highscore');
        this.highscoreStorageKey = 'highscore';
        this.messageList = {
            low: '📉 Too low',
            high: '📈 Too high',
            correct: '🎉 Correct number',
            error: '🧐 Something went wrong',
            lost: '🫣 You lost the game!'
        }

        this.init();
    };

    /**
     * Init method
     */
    init = () => {
        this.onLoadInitialization();

        /**
         * Check button click listener
         */
        this.btnCheck.addEventListener('click', () => {
            if (this.inputValue) {
                this.setValueToNumberBox();
                this.messageProcessing();
                this.setScore();

                this.lose();

                this.guess();
            }
        });

        this.btnAgain.addEventListener('click', () => window.location.reload());
    }

    /**
     * On load initialization
     */
    onLoadInitialization = () => {
        document.addEventListener('DOMContentLoaded', () => {
            // Append between value
            this.setBetweenValue();

            // Set initial score value
            this.setScore();

            // Set high score
            this.setInitialHighScore();
        })
    }

    /**
     * Set current input value
     */
    setInputValue = () => this.input.addEventListener('change', (e) => this.inputValue = parseInt(e.currentTarget.value))

    setBetweenValue = () => {
        document.querySelector('.between .min').textContent = this.minNumber;
        document.querySelector('.between .max').textContent = this.maxNumber;
    }

    /**
     * Generate random number
     *
     * @param {number} min
     * @param {number} max
     */
    getRandomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Set input value to number box
     */
    setValueToNumberBox = () => this.numberBox.textContent = this.inputValue;

    /**
     * Get message
     */
    messageProcessing = () => {
        let message;

        switch (true) {
            case (this.scoreValue === 0):
                message = this.messageList.lost;
                break;
            case (this.inputValue < this.randomNumber):
                message = this.messageList.low;
                break;
            case (this.inputValue > this.randomNumber):
                message = this.messageList.high;
                break;
            case (this.inputValue === this.randomNumber):
                message = this.messageList.correct;
                break;
            default:
                message = this.messageList.error;
        }

        this.message.textContent = message;
    }

    /**
     * Set score
     */
    setScore = () => {
        this.score.textContent = this.scoreValue;

        this.scoreValue--;
    }

    /**
     * Set initial high score
     */
    setInitialHighScore = () => {
        this.highscore.textContent = localStorage.getItem(this.highscoreStorageKey)
            ? localStorage.getItem(this.highscoreStorageKey)
            : 0;
    }

    /**
     * Check if input value is equal to random number
     */
    guess = () => {
        if (this.inputValue === this.randomNumber) {
            const scoreValue = this.scoreValue + 1;
            const highScoreStorageValue = parseInt(localStorage.getItem(this.highscoreStorageKey))
                ? parseInt(localStorage.getItem(this.highscoreStorageKey))
                : scoreValue;

            if (scoreValue >= highScoreStorageValue) {
                this.highscore.textContent = scoreValue;
                localStorage.setItem(this.highscoreStorageKey, scoreValue);
            }

            // Add guessed class to body
            document.querySelector('body').classList.add('guessed');

            // Disable check button after guess
            this.btnCheck.disabled = true;
        }
    }

    /**
     * Verify if the user lost
     */
    lose = () => {
        const scoreValue = this.scoreValue + 1;

        if (scoreValue === 0) {
            // Add lose class to body
            document.querySelector('body').classList.add('lose');

            // Disable check button after guess
            this.btnCheck.disabled = true;
        }
    }
}

new GuessMyNumber();