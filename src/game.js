import Renderer from './renderer/renderer.js';
import TilesState from './tilesState.js';
import Score from './score.js';
import { GRID_SIZE, SCORE_FOR_WIN } from './constants.js';
import { move } from './moving.js';

export default class Game {
    constructor(canvas) {
        this.tilesState = new TilesState();
        this.isMoving = false;
        this.score = 0;
        
        this.renderer = new Renderer(canvas);

        canvas.addEventListener('touchstart', (event) => this.#handleTouchStart(event));
        canvas.addEventListener('touchmove', (event) => this.#handleTouchMove(event));
        canvas.addEventListener('touchend', () => this.#handleTouchEnd());
        canvas.addEventListener('mousedown', (event) => this.#handleMouseDown(event));
        canvas.addEventListener('mousemove', (event) => this.#handleMouseMove(event));
        canvas.addEventListener('mouseup', () => this.#handleMouseEnd());
        canvas.addEventListener('mouseleave', () => this.#handleMouseEnd());

        this.startNewGame();
    }

    draw() {
        this.renderer.draw(this.tilesState.get(), this.score);
    }

    startNewGame() {
        this.tilesState.clear();      
        this.score = 0;            
        this.tilesState.addRandom();  
        this.tilesState.addRandom();
        this.isMoving = false;         
        this.draw(); 
    }

    #handleMouseDown(event) {
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.isMoving = false;
    }

    #handleMouseMove(event) {
        if (!this.startX || !this.startY || this.isMoving) return;

        const moveX = event.clientX - this.startX;
        const moveY = event.clientY - this.startY;

        if (Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 50) {
            this.#moveTiles(moveX > 0 ? 'right' : 'left');
            this.isMoving = true;
        } else if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 50) {
            this.#moveTiles(moveY > 0 ? 'down' : 'up');
            this.isMoving = true;
        }
    }

    #handleMouseEnd() {
        this.startX = null;
        this.startY = null;
        this.isMoving = false;
    }

    #handleTouchStart(event) {
        event.preventDefault();
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
        this.isMoving = false;
    }

    #handleTouchMove(event) {
        if (this.isMoving) return;
        event.preventDefault();
        const moveX = event.touches[0].clientX - this.startX;
        const moveY = event.touches[0].clientY - this.startY;

        if (Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 50) {
            this.#moveTiles(moveX > 0 ? 'right' : 'left');
            this.isMoving = true;
        } else if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 50) {
            this.#moveTiles(moveY > 0 ? 'down' : 'up');
            this.isMoving = true;
        }
    }

    #handleTouchEnd() {
        this.isMoving = false;
    }

    #canMakeMove() {
        let tiles = this.tilesState.get();

        if (tiles.length < GRID_SIZE * GRID_SIZE) {
            return true;
        }

        for (let tile of tiles) {
            if (tile.hasNeighborsWithTheSameValue(tiles)) {
                return true;
            }
        }

        return false;
    }

    #moveTiles(direction) {
        const {isTilesWereMoved, scoreUpdate} = move(this.tilesState, direction)
        this.score += scoreUpdate

        if(this.tilesState.hasWithScore(SCORE_FOR_WIN)) {
            setTimeout(() => {
                alert('Уровень пройден');
                this.startNewGame();
            }, 100);
            return
        }

        if (isTilesWereMoved) {
            this.tilesState.addRandom();

            if (!this.#canMakeMove()) {
                setTimeout(() => {
                    alert('Нельзя сделать ход');
                    this.startNewGame();
                }, 500);
                return;
            }

            this.draw();
        }
    }
}