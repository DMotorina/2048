
export default class Score {
    constructor(initialScore = 0, renderer) {
        this.score = initialScore;
    }

    set(score) {
        this.score = score;
    }

    add(value) {
        this.score += value;
    }
}