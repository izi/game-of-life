"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Life;
(function (Life) {
    Life[Life["Dead"] = 0] = "Dead";
    Life[Life["Alive"] = 1] = "Alive";
})(Life = exports.Life || (exports.Life = {}));
var GameOfLife = /** @class */ (function () {
    function GameOfLife(height, width) {
        var elements = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            elements[_i - 2] = arguments[_i];
        }
        var _this = this;
        this.height = height;
        this.width = width;
        this.infiniteSpace = true;
        this.board = this.empty();
        if (elements) {
            elements.forEach(function (e) {
                var row = e[0], cell = e[1];
                _this.board[row][cell] = Life.Alive;
            });
        }
    }
    GameOfLife.prototype.next = function () {
        var newBoard = this.empty();
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                newBoard[i][j] = this.nextCellState(i, j);
            }
        }
        this.board = newBoard;
    };
    GameOfLife.prototype.nextCellState = function (i, j) {
        var liveNeighbours = this.liveNeighbours(i, j);
        var currentCellState = this.board[i][j];
        if (this.isHealthyCell(currentCellState, liveNeighbours)) {
            return Life.Alive;
        }
        else if (this.isNewLifeCell(currentCellState, liveNeighbours)) {
            return Life.Alive;
        }
        return Life.Dead;
    };
    GameOfLife.prototype.isNewLifeCell = function (currentCellState, liveNeighbours) {
        return currentCellState === Life.Dead && liveNeighbours === 3;
    };
    GameOfLife.prototype.isHealthyCell = function (currentCellState, liveNeighbours) {
        return currentCellState === Life.Alive && (liveNeighbours === 2 || liveNeighbours === 3);
    };
    GameOfLife.prototype.liveNeighbours = function (row, col) {
        var liveNeighbours = 0;
        for (var i = row - 1; i <= row + 1; i++) {
            for (var j = col - 1; j <= col + 1; j++) {
                if (!(i === row && j === col)) {
                    if (this.infiniteSpace) {
                        var r = this.indexOnPlane(i, this.height);
                        var c = this.indexOnPlane(j, this.width);
                        liveNeighbours += this.board[r][c];
                    }
                    else if (this.isWithinPlane(i, j)) {
                        liveNeighbours += this.board[i][j];
                    }
                }
            }
        }
        return liveNeighbours;
    };
    GameOfLife.prototype.indexOnPlane = function (index, planeSize) {
        return index < 0 ? index + planeSize : (index >= planeSize ? index - planeSize : index);
    };
    GameOfLife.prototype.isWithinPlane = function (i, j) {
        return i >= 0 && i < this.height && j >= 0 && j < this.width;
    };
    GameOfLife.prototype.empty = function () {
        var board = new Array(this.height);
        for (var i = 0; i < this.height; i++) {
            board[i] = new Array(this.width).fill(Life.Dead);
        }
        return board;
    };
    GameOfLife.prototype.clear = function () {
        this.board = this.empty();
    };
    return GameOfLife;
}());
exports.GameOfLife = GameOfLife;
var GameOfLifePattern = /** @class */ (function () {
    function GameOfLifePattern() {
    }
    GameOfLifePattern.block = function () {
        return new GameOfLife(4, 4, [1, 1], [1, 2], [2, 1], [2, 2]);
    };
    GameOfLifePattern.beehive = function () {
        return new GameOfLife(5, 6, [2, 1], [1, 2], [1, 3], [3, 2], [3, 3], [2, 4]);
    };
    GameOfLifePattern.loaf = function () {
        return new GameOfLife(6, 6, [2, 1], [1, 2], [1, 3], [3, 2], [4, 3], [2, 4], [3, 4]);
    };
    GameOfLifePattern.boat = function () {
        return new GameOfLife(5, 5, [1, 1], [1, 2], [2, 1], [2, 3], [3, 2]);
    };
    GameOfLifePattern.tub = function () {
        return new GameOfLife(5, 5, [1, 2], [2, 1], [2, 3], [3, 2]);
    };
    GameOfLifePattern.blinker = function () {
        return new GameOfLife(5, 5, [1, 2], [2, 2], [3, 2]);
    };
    GameOfLifePattern.toad = function () {
        return new GameOfLife(6, 6, [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3]);
    };
    GameOfLifePattern.beacon = function () {
        return new GameOfLife(6, 6, [1, 1], [1, 2], [2, 1], [4, 3], [4, 4], [3, 4]);
    };
    GameOfLifePattern.glider = function () {
        return new GameOfLife(6, 6, [1, 1], [2, 2], [2, 3], [3, 1], [3, 2]);
    };
    GameOfLifePattern.spaceship = function () {
        return new GameOfLife(10, 10, [1, 1], [1, 4], [3, 1], [4, 2], [4, 3], [4, 4], [4, 5], [3, 5], [2, 5]);
    };
    GameOfLifePattern.gosperGliderGun = function () {
        var game = new GameOfLife(50, 50, [5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13], [3, 14], [9, 14], [6, 15], [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18], [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36]);
        game.infiniteSpace = false;
        return game;
    };
    GameOfLifePattern.empty = function (size) {
        if (size === void 0) { size = 50; }
        return new GameOfLife(size, size);
    };
    return GameOfLifePattern;
}());
exports.GameOfLifePattern = GameOfLifePattern;
