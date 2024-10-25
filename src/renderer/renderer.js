import { drawRoundedRect } from './rendererUtils.js';

import { 
    TILE_SIZE, 
    BORDER_COLOR, 
    BORDER_SIZE, 
    PADDING, 
    GAP, 
    BOARD_SIZE,
    OFFSET,
    CANVAS_SIZE
} from '../constants.js';

export default class Renderer {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
    }

    draw(tiles, score) {
        this.drawBoard();
        this.drawTiles(tiles);
        this.updateScore(score)
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = BORDER_COLOR;
        
        drawRoundedRect(
            this.ctx,
            0,
            0,
            BOARD_SIZE + PADDING * 2 + BORDER_SIZE * 2,
            BOARD_SIZE + PADDING * 2 + BORDER_SIZE * 2,
            15
        );

        this.ctx.fill();

        this.ctx.fillStyle = '#d0c0b0';
        
        drawRoundedRect(
            this.ctx,
            BORDER_SIZE,
            BORDER_SIZE,
            BOARD_SIZE + PADDING * 2,
            BOARD_SIZE + PADDING * 2,
            15
        );
        this.ctx.fill();
    }

    drawTile(tile) {
        const { x, y } = tile.calculatePosition(TILE_SIZE, GAP, OFFSET);
        this.drawTileBackground(x, y, tile)
        this.drawTileValue(x, y, tile)
    }

    drawTileValue(x, y, tile) {
        this.ctx.fillStyle = '#000';
        this.ctx.font = '32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(tile.value, x + TILE_SIZE / 2, y + TILE_SIZE / 2);
    }

    drawTileBackground(x, y, tile) {
        this.ctx.fillStyle = tile.getTileColor();
        drawRoundedRect(this.ctx, x, y, TILE_SIZE, TILE_SIZE, 10);
        this.ctx.fill();
    }

    drawTiles(tiles) {
        for (const tile of tiles) {
            this.drawTile(tile);
        }
    }
    
    updateScore(score) {
        const scoreField = document.querySelector('#score');
        scoreField.innerHTML = `Счет: ${score}`;
    }
}