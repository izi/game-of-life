export enum Life {
  Dead,
  Alive,
}

export class GameOfLife {
  public board: Life[][];
  public infiniteSpace = true;

  constructor(
    public height: number,
    public width: number,
    ...elements: Array<[number, number]>
  ) {
    this.board = this.empty();

    if (elements) {
      elements.forEach(e => {
        const [row, cell] = e;
        this.board[row][cell] = Life.Alive;
      });
    }
  }

  public next() {
    const newBoard = this.empty();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        newBoard[i][j] = this.nextCellState(i, j);
      }
    }

    this.board = newBoard;
  }

  public liveNeighbours(row: number, col: number) {
    let liveNeighbours = 0;

    for (let i: number = row - 1; i <= row + 1; i++) {
      for (let j: number = col - 1; j <= col + 1; j++) {
        if (!(i === row && j === col)) {
          if (this.infiniteSpace) {
            const r = this.indexOnPlane(i, this.height);
            const c = this.indexOnPlane(j, this.width);
            liveNeighbours += this.board[r][c];
          } else if (this.isWithinPlane(i, j)) {
            liveNeighbours += this.board[i][j];
          }
        }
      }
    }

    return liveNeighbours;
  }

  public empty() {
    const board: Life[][] = new Array(this.height);

    for (let i = 0; i < this.height; i++) {
      board[i] = new Array<Life>(this.width).fill(Life.Dead);
    }

    return board;
  }

  public clear() {
    this.board = this.empty();
  }

  private nextCellState(i: number, j: number) {
    const liveNeighbours = this.liveNeighbours(i, j);
    const currentCellState = this.board[i][j];

    if (this.isHealthyCell(currentCellState, liveNeighbours)) {
      return Life.Alive;
    } else if (this.isNewLifeCell(currentCellState, liveNeighbours)) {
      return Life.Alive;
    }

    return Life.Dead;
  }

  private isNewLifeCell(currentCellState: Life, liveNeighbours: number) {
    return currentCellState === Life.Dead && liveNeighbours === 3;
  }

  private isHealthyCell(currentCellState: Life, liveNeighbours: number) {
    return (
      currentCellState === Life.Alive &&
      (liveNeighbours === 2 || liveNeighbours === 3)
    );
  }

  private indexOnPlane(index: number, planeSize: number) {
    return index < 0
      ? index + planeSize
      : index >= planeSize
        ? index - planeSize
        : index;
  }

  private isWithinPlane(i: number, j: number) {
    return i >= 0 && i < this.height && j >= 0 && j < this.width;
  }
}
