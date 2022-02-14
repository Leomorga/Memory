import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card?: Card;

  constructor() { }

  ngOnInit(): void {
  }

  getState(): string {
    if(this.card) {
      return this.card.state;
    }
    return "";
  }

  getColor(): string {
    if(this.card) {
      return this.card.color;
    }
    return "";
  }
}
