import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: any[] | undefined;
  xIsNext: boolean | undefined;
  winner: string | null | undefined;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares![idx]) {
      this.squares!.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
  }
  calculateWinner() {
    const lines = [
      [0, 1, 2], // 1st row
      [3, 4, 5], // 2nd row
      [6, 7, 8], // 3rd row
      [0, 3, 6], // 1st column
      [1, 4, 7], // 2nd column
      [2, 5, 8], // 3rd column
      [0, 4, 8], // 1st diagonal
      [2, 4, 6], // 2nd diagonal
    ];
    for (const line of lines) {
      const [a, b, c] = line; // destructuring
      if (
        this.squares![a] &&
        this.squares![a] === this.squares![b] &&
        this.squares![a] === this.squares![c]
      ) {
        return this.squares![a];
      }
    }
    return null;
  }
}
