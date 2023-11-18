import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pich-change',
  templateUrl: './pich-change.component.html',
  styleUrls: ['./pich-change.component.scss'],
})
export class PichChangeComponent {
  isDataLoaded: boolean = false;
  audioUrl: string;
  audioFile: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }
}
