import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-victory-dialog',
  templateUrl: './victory-dialog.component.html',
  styleUrls: ['./victory-dialog.component.scss']
})
export class VictoryDialogComponent {
  
  count: number;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<VictoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.count = data.count;
  }

}
