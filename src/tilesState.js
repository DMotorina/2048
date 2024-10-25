import Tile from './tile.js';
import { GRID_SIZE } from './constants.js';

export default class TilesState {
    constructor() {
        this.tiles = [];
    }

    clear() {
        this.tiles = [];
    }

    removeTile(nextTile) {
        this.set(this.tiles.filter(tile => tile !== nextTile));
    }

    getRow(y) {
        return this.tiles.filter((tile) => tile.y === y);
    }

    getColumn(x) {
        return this.tiles.filter((tile) => tile.x === x);
    }

    get() {
        return this.tiles;
    }

    set(newTiles) {
        this.tiles = newTiles;
    }

    hasWithScore(score) {
        return this.tiles.some(t => t.score === score)
    }

    addRandom() {
        let emptyTiles = [];
        
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                if (!this.tiles.some((tile) => tile.x === x && tile.y === y)) {
                    emptyTiles.push({x, y});
                }
            }
        }

        if (emptyTiles.length > 0) {
            const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

            const isFirstMove = this.tiles.length < 2
            const tileValue = isFirstMove ? 2 : (Math.random() < 0.9 ? 2 : 4)
            this.tiles.push(new Tile(x, y, tileValue));
        }
    }

    merge(tiles) {
        let isTilesWereMerged = false;
        let scoreTerm = 0;

        for (let i = 0; i < tiles.length - 1; i++) {
            const tile = tiles[i];
            const nextTile = tiles[i + 1];

            if (tile.value === nextTile.value) {
                tile.value *= 2;
                scoreTerm += tile.value
                this.removeTile(nextTile)
                isTilesWereMerged = true;
                i++;
            }
        }

        return { isTilesWereMerged, scoreTerm }
    }
}