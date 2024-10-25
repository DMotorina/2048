import { getTileColor } from './renderer/rendererUtils.js';

export default class Tile {
    constructor(x, y, value = 2) {
        this.x = x;
        this.y = y;
        this.value = value;
        
    }

    hasNeighborsWithTheSameValue(tiles) {
        const neighbors = [
            { x: this.x + 1, y: this.y },
            { x: this.x - 1, y: this.y },
            { x: this.x, y: this.y + 1 },
            { x: this.x, y: this.y - 1 },
        ];
    
        for (let neighbor of neighbors) {
            if (
                tiles.some(
                    (t) => t.x === neighbor.x && t.y === neighbor.y && t.value === this.value
                )
            ) {
                return true;
            }
        }

        return false
    }

    getTileColor() {
        return getTileColor(this.value);
    }

    calculatePosition(tileSize, gap, offset) {
        const x = this.x * (tileSize + gap) + offset;
        const y = this.y * (tileSize + gap) + offset;
        return { x, y };
    }
}