import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvertOutputModelComponent } from './convert-output-model/convert-output-model.component';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.scss'],
})
export class TextToSpeechComponent implements OnInit {
  public inputText: string;
  wordCount: number = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  convert() {
    const model = this.dialog.open(ConvertOutputModelComponent, {
      width: '50%',
      data: {
        inputText: this.inputText,
        gender: 'male'
      },
    });
    model.afterClosed().subscribe(() => {});
  }

  updateWordCount() {
    const words = this.inputText.trim().split(/\s+/);
    this.wordCount = words.length;
  }
}
