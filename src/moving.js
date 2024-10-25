import { GRID_SIZE } from "./constants";

const moveLeft = (tilesState) => {
    let isTilesWereMoved = false;
    let scoreUpdate = 0

    for (let y = 0; y < GRID_SIZE; y++) {
        let rowTiles = tilesState.getRow(y);
        rowTiles.sort((a, b) => a.x - b.x);

        for (let i = 0; i < rowTiles.length; i++) {
            const tile = rowTiles[i];

            while (
                tile.x > 0 &&
                !rowTiles.some((t) => t.x === tile.x - 1 && t.y === tile.y)
                ) {
                tile.x--;
                isTilesWereMoved = true;
            }
        }

        const { isTilesWereMerged, scoreTerm } = tilesState.merge(rowTiles);

        scoreUpdate += scoreTerm
        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;

        rowTiles = tilesState.getRow(y);
        for (let i = 0; i < rowTiles.length; i++) {
            const tile = rowTiles[i];

            while (
                tile.x > 0 &&
                !rowTiles.some((t) => t.x === tile.x - 1 && t.y === tile.y)
                ) {
                tile.x--;
                isTilesWereMoved = true;
            }
        }
    }

    return {isTilesWereMoved, scoreUpdate}
}

const moveRight = (tilesState) => {
    let isTilesWereMoved = false;
    let scoreUpdate = 0

    for (let y = 0; y < GRID_SIZE; y++) {
        let rowTiles = tilesState.getRow(y);
        rowTiles.sort((a, b) => b.x - a.x);

        for (let i = 0; i < rowTiles.length; i++) {
            const tile = rowTiles[i];

            while (
                tile.x < GRID_SIZE - 1 &&
                !rowTiles.some((t) => t.x === tile.x + 1 && t.y === tile.y)
                ) {
                tile.x++;
                isTilesWereMoved = true;
            }
        }

        const { isTilesWereMerged, scoreTerm } = tilesState.merge(rowTiles);

        scoreUpdate += scoreTerm
        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;

        rowTiles = tilesState.getRow(y);
        for (let i = 0; i < rowTiles.length; i++) {
            const tile = rowTiles[i];

            while (
                tile.x < GRID_SIZE - 1 &&
                !rowTiles.some((t) => t.x === tile.x + 1 && t.y === tile.y)
                ) {
                tile.x++;
                isTilesWereMoved = true;
            }
        }
    }

    return {isTilesWereMoved, scoreUpdate}
}

const moveDown = (tilesState) => {
    let isTilesWereMoved = false;
    let scoreUpdate = 0

    for (let x = 0; x < GRID_SIZE; x++) {
        let columnTiles = tilesState.getColumn(x);
        columnTiles.sort((a, b) => b.y - a.y);

        for (let i = 0; i < columnTiles.length; i++) {
            const tile = columnTiles[i];

            while (
                tile.y < GRID_SIZE - 1 &&
                !columnTiles.some((t) => t.y === tile.y + 1 && t.x === tile.x)
                ) {
                tile.y++;
                isTilesWereMoved = true;
            }
        }

        const { isTilesWereMerged, scoreTerm } = tilesState.merge(columnTiles);

        scoreUpdate += scoreTerm
        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;

        columnTiles = tilesState.getColumn(x);
        for (let i = 0; i < columnTiles.length; i++) {
            const tile = columnTiles[i];

            while (
                tile.y < GRID_SIZE - 1 &&
                !columnTiles.some((t) => t.y === tile.y + 1 && t.x === tile.x)
                ) {
                tile.y++;
                isTilesWereMoved = true;
            }
        }
    }

    return {isTilesWereMoved, scoreUpdate}
}

const moveUp = (tilesState) => {
    let isTilesWereMoved = false;
    let scoreUpdate = 0

    for (let x = 0; x < GRID_SIZE; x++) {
        let columnTiles = tilesState.getColumn(x);
        columnTiles.sort((a, b) => a.y - b.y);

        for (let i = 0; i < columnTiles.length; i++) {
            const tile = columnTiles[i];

            while (
                tile.y > 0 &&
                !columnTiles.some((t) => t.y === tile.y - 1 && t.x === tile.x)
                ) {
                tile.y--;
                isTilesWereMoved = true;
            }
        }

        const { isTilesWereMerged, scoreTerm } = tilesState.merge(columnTiles);
        
        scoreUpdate += scoreTerm
        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;

        columnTiles = tilesState.getColumn(x);
        for (let i = 0; i < columnTiles.length; i++) {
            const tile = columnTiles[i];

            while (
                tile.y > 0 &&
                !columnTiles.some((t) => t.y === tile.y - 1 && t.x === tile.x)
                ) {
                tile.y--;
                isTilesWereMoved = true;
            }
        }
    }

    return {isTilesWereMoved, scoreUpdate}
}

const typeToFunc = {
    "left": moveLeft,
    "right": moveRight,
    "down": moveDown,
    "up": moveUp
}

export const move = (tilesState, type) => typeToFunc[type](tilesState)