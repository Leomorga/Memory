import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { COLORS } from '../mock_colors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  deck?: Card[];
  colors = COLORS;

  constructor() { }

  ngOnInit(): void {

    this.createDeck();
    //this.shuffleDeck();
  }

  createDeck(): void {
    for(let i=0; i < 12; i++) {
      let card : Card = {
        id : i,
        color : this.colors[i]
      }
      this.deck?.push(card);
    }
    for(let item in this.deck) {
      console.log(item.id + " "+ item.color);
    }
  }

  shuffleDeck() : void {
    let currentIndex = this.deck!.length,  randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.deck![currentIndex], this.deck![randomIndex]] = [
        this.deck![randomIndex], this.deck![currentIndex]];
    }
  }
}
