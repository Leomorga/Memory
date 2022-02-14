import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { COLORS } from '../mock_colors';
import { VictoryDialogComponent } from '../victory-dialog/victory-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  deck: Card[] = [];
  colors = COLORS;
  flippedCards: Card[] = [];
  count: number = 0;
  successCount: number = 0;
  unclickableCards = false;
  gameActive: boolean = false;
  gameTimer: number = 5000;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  setBoard(): void {
    this.deck = [];
    this.createDeck();
    this.deck = this.shuffleDeck(this.deck);
    this.flippedCards = [];
    this.count = 0;
    this.successCount = 0;
    this.gameActive = true;
  }

  backToMenu(): void {
    this.gameActive = false;
  }

  createDeck(): void {
    for(let i=0; i < 6; i++) {
      let card : Card = {
        color: this.colors[i],
        state: 'default'
      }
      let card2 : Card = {
        color: this.colors[i],
        state: 'default'
      }
      this.deck.push(card, card2);
    }
  }

  shuffleDeck(array: any[]): any[] {
    return array.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  cardClicked(item: Card): void {
    if(!this.unclickableCards) {
      if (item.state === 'default')
      {
        item.state = 'flipped';
        this.flippedCards.push(item);

        if (this.flippedCards.length === 2) {
          this.checkCardMatch();
        }

      } else if (item.state === 'flipped') {
        item.state = 'default';
        this.flippedCards.pop();

      }
    }
  }

  checkCardMatch(): void {
    this.count++;
    this.unclickableCards = true;

    setTimeout(() => {
      const card1 = this.flippedCards[0];
      const card2 = this.flippedCards[1];
      const nextState = card1.color === card2.color ? 'matched' : 'default';
      card1.state = nextState;
      card2.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.successCount++;

        if (this.successCount === (this.deck.length)/2) {
          const dialogRef = this.dialog.open(VictoryDialogComponent, {
            data: {
              count: this.count
            },
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if(result) {
              this.setBoard();
            } else {
              this.backToMenu();
            }
          });
        }
      }
      this.unclickableCards = false;
    }, this.gameTimer);

  }
}
