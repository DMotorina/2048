/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BOARD_SIZE: () => (/* binding */ BOARD_SIZE),\n/* harmony export */   BORDER_COLOR: () => (/* binding */ BORDER_COLOR),\n/* harmony export */   BORDER_SIZE: () => (/* binding */ BORDER_SIZE),\n/* harmony export */   CANVAS_SIZE: () => (/* binding */ CANVAS_SIZE),\n/* harmony export */   GAP: () => (/* binding */ GAP),\n/* harmony export */   GRID_SIZE: () => (/* binding */ GRID_SIZE),\n/* harmony export */   OFFSET: () => (/* binding */ OFFSET),\n/* harmony export */   PADDING: () => (/* binding */ PADDING),\n/* harmony export */   SCORE_FOR_WIN: () => (/* binding */ SCORE_FOR_WIN),\n/* harmony export */   TILE_SIZE: () => (/* binding */ TILE_SIZE)\n/* harmony export */ });\nconst GRID_SIZE = 4;\nconst SCORE_FOR_WIN = 2048;\n\nconst GAP = 7;\nconst TILE_SIZE = 68;\nconst PADDING = 14;\nconst BORDER_SIZE = 3;\nconst BORDER_COLOR = '#9e9e9e';\nconst BOARD_SIZE = GRID_SIZE * TILE_SIZE + (GRID_SIZE - 1) * GAP;\nconst OFFSET = PADDING + BORDER_SIZE;\nconst CANVAS_SIZE = BOARD_SIZE + PADDING * 2 + BORDER_SIZE * 2\n\n//# sourceURL=webpack://2048/./src/constants.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _renderer_renderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/renderer.js */ \"./src/renderer/renderer.js\");\n/* harmony import */ var _tilesState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tilesState.js */ \"./src/tilesState.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _moving_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moving.js */ \"./src/moving.js\");\n\n\n\n\n\nclass Game {\n    constructor(canvas) {\n        this.tilesState = new _tilesState_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        this.isMoving = false;\n        this.score = 0;\n        \n        this.renderer = new _renderer_renderer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n        canvas.addEventListener('touchstart', (event) => this.#handleTouchStart(event));\n        canvas.addEventListener('touchmove', (event) => this.#handleTouchMove(event));\n        canvas.addEventListener('touchend', () => this.#handleTouchEnd());\n        canvas.addEventListener('mousedown', (event) => this.#handleMouseDown(event));\n        canvas.addEventListener('mousemove', (event) => this.#handleMouseMove(event));\n        canvas.addEventListener('mouseup', () => this.#handleMouseEnd());\n        canvas.addEventListener('mouseleave', () => this.#handleMouseEnd());\n\n        this.startNewGame();\n    }\n\n    draw() {\n        this.renderer.draw(this.tilesState.get(), this.score);\n    }\n\n    startNewGame() {\n        this.tilesState.clear();      \n        this.score = 0;            \n        this.tilesState.addRandom();  \n        this.tilesState.addRandom();\n        this.isMoving = false;         \n        this.draw(); \n    }\n\n    #handleMouseDown(event) {\n        this.startX = event.clientX;\n        this.startY = event.clientY;\n        this.isMoving = false;\n    }\n\n    #handleMouseMove(event) {\n        if (!this.startX || !this.startY || this.isMoving) return;\n\n        const moveX = event.clientX - this.startX;\n        const moveY = event.clientY - this.startY;\n\n        if (Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 50) {\n            this.#moveTiles(moveX > 0 ? 'right' : 'left');\n            this.isMoving = true;\n        } else if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 50) {\n            this.#moveTiles(moveY > 0 ? 'down' : 'up');\n            this.isMoving = true;\n        }\n    }\n\n    #handleMouseEnd() {\n        this.startX = null;\n        this.startY = null;\n        this.isMoving = false;\n    }\n\n    #handleTouchStart(event) {\n        event.preventDefault();\n        this.startX = event.touches[0].clientX;\n        this.startY = event.touches[0].clientY;\n        this.isMoving = false;\n    }\n\n    #handleTouchMove(event) {\n        if (this.isMoving) return;\n        event.preventDefault();\n        const moveX = event.touches[0].clientX - this.startX;\n        const moveY = event.touches[0].clientY - this.startY;\n\n        if (Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 50) {\n            this.#moveTiles(moveX > 0 ? 'right' : 'left');\n            this.isMoving = true;\n        } else if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 50) {\n            this.#moveTiles(moveY > 0 ? 'down' : 'up');\n            this.isMoving = true;\n        }\n    }\n\n    #handleTouchEnd() {\n        this.isMoving = false;\n    }\n\n    #canMakeMove() {\n        let tiles = this.tilesState.get();\n\n        if (tiles.length < _constants_js__WEBPACK_IMPORTED_MODULE_2__.GRID_SIZE * _constants_js__WEBPACK_IMPORTED_MODULE_2__.GRID_SIZE) {\n            return true;\n        }\n\n        for (let tile of tiles) {\n            if (tile.hasNeighborsWithTheSameValue(tiles)) {\n                return true;\n            }\n        }\n\n        return false;\n    }\n\n    #moveTiles(direction) {\n        const {isTilesWereMoved, scoreUpdate} = (0,_moving_js__WEBPACK_IMPORTED_MODULE_3__.move)(this.tilesState, direction)\n        this.score += scoreUpdate\n\n        if(this.tilesState.hasWithScore(_constants_js__WEBPACK_IMPORTED_MODULE_2__.SCORE_FOR_WIN)) {\n            setTimeout(() => {\n                alert('Уровень пройден');\n                this.startNewGame();\n            }, 100);\n            return\n        }\n\n        if (isTilesWereMoved) {\n            this.tilesState.addRandom();\n\n            if (!this.#canMakeMove()) {\n                setTimeout(() => {\n                    alert('Нельзя сделать ход');\n                    this.startNewGame();\n                }, 500);\n                return;\n            }\n\n            this.draw();\n        }\n    }\n}\n\n//# sourceURL=webpack://2048/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n\nnew _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById('gameCanvas'));\n\n//# sourceURL=webpack://2048/./src/index.js?");

/***/ }),

/***/ "./src/moving.js":
/*!***********************!*\
  !*** ./src/moving.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   move: () => (/* binding */ move)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\nconst moveLeft = (tilesState) => {\n    let isTilesWereMoved = false;\n    let scoreUpdate = 0\n\n    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE; y++) {\n        let rowTiles = tilesState.getRow(y);\n        rowTiles.sort((a, b) => a.x - b.x);\n\n        for (let i = 0; i < rowTiles.length; i++) {\n            const tile = rowTiles[i];\n\n            while (\n                tile.x > 0 &&\n                !rowTiles.some((t) => t.x === tile.x - 1 && t.y === tile.y)\n                ) {\n                tile.x--;\n                isTilesWereMoved = true;\n            }\n        }\n\n        const { isTilesWereMerged, scoreTerm } = tilesState.merge(rowTiles);\n\n        scoreUpdate += scoreTerm\n        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;\n\n        rowTiles = tilesState.getRow(y);\n        for (let i = 0; i < rowTiles.length; i++) {\n            const tile = rowTiles[i];\n\n            while (\n                tile.x > 0 &&\n                !rowTiles.some((t) => t.x === tile.x - 1 && t.y === tile.y)\n                ) {\n                tile.x--;\n                isTilesWereMoved = true;\n            }\n        }\n    }\n\n    return {isTilesWereMoved, scoreUpdate}\n}\n\nconst moveRight = (tilesState) => {\n    let isTilesWereMoved = false;\n    let scoreUpdate = 0\n\n    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE; y++) {\n        let rowTiles = tilesState.getRow(y);\n        rowTiles.sort((a, b) => b.x - a.x);\n\n        for (let i = 0; i < rowTiles.length; i++) {\n            const tile = rowTiles[i];\n\n            while (\n                tile.x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE - 1 &&\n                !rowTiles.some((t) => t.x === tile.x + 1 && t.y === tile.y)\n                ) {\n                tile.x++;\n                isTilesWereMoved = true;\n            }\n        }\n\n        const { isTilesWereMerged, scoreTerm } = tilesState.merge(rowTiles);\n\n        scoreUpdate += scoreTerm\n        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;\n\n        rowTiles = tilesState.getRow(y);\n        for (let i = 0; i < rowTiles.length; i++) {\n            const tile = rowTiles[i];\n\n            while (\n                tile.x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE - 1 &&\n                !rowTiles.some((t) => t.x === tile.x + 1 && t.y === tile.y)\n                ) {\n                tile.x++;\n                isTilesWereMoved = true;\n            }\n        }\n    }\n\n    return {isTilesWereMoved, scoreUpdate}\n}\n\nconst moveDown = (tilesState) => {\n    let isTilesWereMoved = false;\n    let scoreUpdate = 0\n\n    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE; x++) {\n        let columnTiles = tilesState.getColumn(x);\n        columnTiles.sort((a, b) => b.y - a.y);\n\n        for (let i = 0; i < columnTiles.length; i++) {\n            const tile = columnTiles[i];\n\n            while (\n                tile.y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE - 1 &&\n                !columnTiles.some((t) => t.y === tile.y + 1 && t.x === tile.x)\n                ) {\n                tile.y++;\n                isTilesWereMoved = true;\n            }\n        }\n\n        const { isTilesWereMerged, scoreTerm } = tilesState.merge(columnTiles);\n\n        scoreUpdate += scoreTerm\n        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;\n\n        columnTiles = tilesState.getColumn(x);\n        for (let i = 0; i < columnTiles.length; i++) {\n            const tile = columnTiles[i];\n\n            while (\n                tile.y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE - 1 &&\n                !columnTiles.some((t) => t.y === tile.y + 1 && t.x === tile.x)\n                ) {\n                tile.y++;\n                isTilesWereMoved = true;\n            }\n        }\n    }\n\n    return {isTilesWereMoved, scoreUpdate}\n}\n\nconst moveUp = (tilesState) => {\n    let isTilesWereMoved = false;\n    let scoreUpdate = 0\n\n    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE; x++) {\n        let columnTiles = tilesState.getColumn(x);\n        columnTiles.sort((a, b) => a.y - b.y);\n\n        for (let i = 0; i < columnTiles.length; i++) {\n            const tile = columnTiles[i];\n\n            while (\n                tile.y > 0 &&\n                !columnTiles.some((t) => t.y === tile.y - 1 && t.x === tile.x)\n                ) {\n                tile.y--;\n                isTilesWereMoved = true;\n            }\n        }\n\n        const { isTilesWereMerged, scoreTerm } = tilesState.merge(columnTiles);\n        \n        scoreUpdate += scoreTerm\n        isTilesWereMoved = isTilesWereMoved || isTilesWereMerged;\n\n        columnTiles = tilesState.getColumn(x);\n        for (let i = 0; i < columnTiles.length; i++) {\n            const tile = columnTiles[i];\n\n            while (\n                tile.y > 0 &&\n                !columnTiles.some((t) => t.y === tile.y - 1 && t.x === tile.x)\n                ) {\n                tile.y--;\n                isTilesWereMoved = true;\n            }\n        }\n    }\n\n    return {isTilesWereMoved, scoreUpdate}\n}\n\nconst typeToFunc = {\n    \"left\": moveLeft,\n    \"right\": moveRight,\n    \"down\": moveDown,\n    \"up\": moveUp\n}\n\nconst move = (tilesState, type) => typeToFunc[type](tilesState)\n\n//# sourceURL=webpack://2048/./src/moving.js?");

/***/ }),

/***/ "./src/renderer/renderer.js":
/*!**********************************!*\
  !*** ./src/renderer/renderer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _rendererUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rendererUtils.js */ \"./src/renderer/rendererUtils.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ \"./src/constants.js\");\n\n\n\n\nclass Renderer {\n    constructor(canvas) {\n        this.ctx = canvas.getContext('2d');\n        canvas.width = _constants_js__WEBPACK_IMPORTED_MODULE_1__.CANVAS_SIZE;\n        canvas.height = _constants_js__WEBPACK_IMPORTED_MODULE_1__.CANVAS_SIZE;\n    }\n\n    draw(tiles, score) {\n        this.drawBoard();\n        this.drawTiles(tiles);\n        this.updateScore(score)\n    }\n\n    drawBoard() {\n        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);\n        this.ctx.fillStyle = _constants_js__WEBPACK_IMPORTED_MODULE_1__.BORDER_COLOR;\n        \n        (0,_rendererUtils_js__WEBPACK_IMPORTED_MODULE_0__.drawRoundedRect)(\n            this.ctx,\n            0,\n            0,\n            _constants_js__WEBPACK_IMPORTED_MODULE_1__.BOARD_SIZE + _constants_js__WEBPACK_IMPORTED_MODULE_1__.PADDING * 2 + _constants_js__WEBPACK_IMPORTED_MODULE_1__.BORDER_SIZE * 2,\n            _constants_js__WEBPACK_IMPORTED_MODULE_1__.BOARD_SIZE + _constants_js__WEBPACK_IMPORTED_MODULE_1__.PADDING * 2 + _constants_js__WEBPACK_IMPORTED_MODULE_1__.BORDER_SIZE * 2,\n            15\n        );\n\n        this.ctx.fill();\n\n        this.ctx.fillStyle = '#d0c0b0';\n        \n        (0,_rendererUtils_js__WEBPACK_IMPORTED_MODULE_0__.drawRoundedRect)(\n            this.ctx,\n            _constants_js__WEBPACK_IMPORTED_MODULE_1__.BORDER_SIZE,\n            _constants_js__WEBPACK_IMPORTED_MODULE_1__.BORDER_SIZE,\n            _constants_js__WEBPACK_IMPORTED_MODULE_1__.BOARD_SIZE + _constants_js__WEBPACK_IMPORTED_MODULE_1__.PADDING * 2,\n            _constants_js__WEBPACK_IMPORTED_MODULE_1__.BOARD_SIZE + _constants_js__WEBPACK_IMPORTED_MODULE_1__.PADDING * 2,\n            15\n        );\n        this.ctx.fill();\n    }\n\n    drawTile(tile) {\n        const { x, y } = tile.calculatePosition(_constants_js__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE, _constants_js__WEBPACK_IMPORTED_MODULE_1__.GAP, _constants_js__WEBPACK_IMPORTED_MODULE_1__.OFFSET);\n        this.drawTileBackground(x, y, tile)\n        this.drawTileValue(x, y, tile)\n    }\n\n    drawTileValue(x, y, tile) {\n        this.ctx.fillStyle = '#000';\n        this.ctx.font = '32px Arial';\n        this.ctx.textAlign = 'center';\n        this.ctx.textBaseline = 'middle';\n        this.ctx.fillText(tile.value, x + _constants_js__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE / 2, y + _constants_js__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE / 2);\n    }\n\n    drawTileBackground(x, y, tile) {\n        this.ctx.fillStyle = tile.getTileColor();\n        (0,_rendererUtils_js__WEBPACK_IMPORTED_MODULE_0__.drawRoundedRect)(this.ctx, x, y, _constants_js__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE, _constants_js__WEBPACK_IMPORTED_MODULE_1__.TILE_SIZE, 10);\n        this.ctx.fill();\n    }\n\n    drawTiles(tiles) {\n        for (const tile of tiles) {\n            this.drawTile(tile);\n        }\n    }\n    \n    updateScore(score) {\n        const scoreField = document.querySelector('#score');\n        scoreField.innerHTML = `Счет: ${score}`;\n    }\n}\n\n//# sourceURL=webpack://2048/./src/renderer/renderer.js?");

/***/ }),

/***/ "./src/renderer/rendererUtils.js":
/*!***************************************!*\
  !*** ./src/renderer/rendererUtils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawRoundedRect: () => (/* binding */ drawRoundedRect),\n/* harmony export */   getTileColor: () => (/* binding */ getTileColor)\n/* harmony export */ });\nfunction drawRoundedRect(ctx, x, y, width, height, radius) {\n    ctx.beginPath();\n    ctx.moveTo(x + radius, y);\n    ctx.lineTo(x + width - radius, y);\n    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);\n    ctx.lineTo(x + width, y + height - radius);\n    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);\n    ctx.lineTo(x + radius, y + height);\n    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);\n    ctx.lineTo(x, y + radius);\n    ctx.quadraticCurveTo(x, y, x + radius, y);\n    ctx.closePath();\n}\n\nfunction getTileColor(value) {\n    const tileColors = {\n        2: '#eee4da',\n        4: '#eee0c6',\n        8: '#f9b377',\n        16: '#ff9b60',\n        32: '#cb6a49',\n        64: '#ec6233',\n        128: '#e8c463',\n        256: '#e0ba55',\n        512: '#f3c54b',\n        1024: '#f2c138',\n        2048: '#f3bd29',\n    };\n\n    return tileColors[value] || '#cfc0af';\n}\n\n\n//# sourceURL=webpack://2048/./src/renderer/rendererUtils.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tile)\n/* harmony export */ });\n/* harmony import */ var _renderer_rendererUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/rendererUtils.js */ \"./src/renderer/rendererUtils.js\");\n\n\nclass Tile {\n    constructor(x, y, value = 2) {\n        this.x = x;\n        this.y = y;\n        this.value = value;\n        \n    }\n\n    hasNeighborsWithTheSameValue(tiles) {\n        const neighbors = [\n            { x: this.x + 1, y: this.y },\n            { x: this.x - 1, y: this.y },\n            { x: this.x, y: this.y + 1 },\n            { x: this.x, y: this.y - 1 },\n        ];\n    \n        for (let neighbor of neighbors) {\n            if (\n                tiles.some(\n                    (t) => t.x === neighbor.x && t.y === neighbor.y && t.value === this.value\n                )\n            ) {\n                return true;\n            }\n        }\n\n        return false\n    }\n\n    getTileColor() {\n        return (0,_renderer_rendererUtils_js__WEBPACK_IMPORTED_MODULE_0__.getTileColor)(this.value);\n    }\n\n    calculatePosition(tileSize, gap, offset) {\n        const x = this.x * (tileSize + gap) + offset;\n        const y = this.y * (tileSize + gap) + offset;\n        return { x, y };\n    }\n}\n\n//# sourceURL=webpack://2048/./src/tile.js?");

/***/ }),

/***/ "./src/tilesState.js":
/*!***************************!*\
  !*** ./src/tilesState.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TilesState)\n/* harmony export */ });\n/* harmony import */ var _tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile.js */ \"./src/tile.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\n\n\nclass TilesState {\n    constructor() {\n        this.tiles = [];\n    }\n\n    clear() {\n        this.tiles = [];\n    }\n\n    removeTile(nextTile) {\n        this.set(this.tiles.filter(tile => tile !== nextTile));\n    }\n\n    getRow(y) {\n        return this.tiles.filter((tile) => tile.y === y);\n    }\n\n    getColumn(x) {\n        return this.tiles.filter((tile) => tile.x === x);\n    }\n\n    get() {\n        return this.tiles;\n    }\n\n    set(newTiles) {\n        this.tiles = newTiles;\n    }\n\n    hasWithScore(score) {\n        return this.tiles.some(t => t.score === score)\n    }\n\n    addRandom() {\n        let emptyTiles = [];\n        \n        for (let x = 0; x < _constants_js__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE; x++) {\n            for (let y = 0; y < _constants_js__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE; y++) {\n                if (!this.tiles.some((tile) => tile.x === x && tile.y === y)) {\n                    emptyTiles.push({x, y});\n                }\n            }\n        }\n\n        if (emptyTiles.length > 0) {\n            const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];\n\n            const isFirstMove = this.tiles.length < 2\n            const tileValue = isFirstMove ? 2 : (Math.random() < 0.9 ? 2 : 4)\n            this.tiles.push(new _tile_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, tileValue));\n        }\n    }\n\n    merge(tiles) {\n        let isTilesWereMerged = false;\n        let scoreTerm = 0;\n\n        for (let i = 0; i < tiles.length - 1; i++) {\n            const tile = tiles[i];\n            const nextTile = tiles[i + 1];\n\n            if (tile.value === nextTile.value) {\n                tile.value *= 2;\n                scoreTerm += tile.value\n                this.removeTile(nextTile)\n                isTilesWereMerged = true;\n                i++;\n            }\n        }\n\n        return { isTilesWereMerged, scoreTerm }\n    }\n}\n\n//# sourceURL=webpack://2048/./src/tilesState.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("fd688356db91669f8871")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "2048:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdate_2048"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;