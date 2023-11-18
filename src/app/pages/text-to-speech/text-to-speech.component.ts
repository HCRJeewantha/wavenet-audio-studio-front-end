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
  gender: number = 1;
  selectedPitch: number = 1;

  pitchList: any[] = [
    {
      name: 'Robot',
      image: '../../../assets/images/robot.png',
      pitch: 1.5,
    },
    {
      name: 'Chipmunk',
      image: '../../../assets/images/chipmunk.png',
      pitch: 1.5,
    },
    {
      name: 'Alien',
      image: '../../../assets/images/alien.png',
      pitch: 1.5,
    },
    {
      name: 'Custom',
      image: '../../../assets/images/girl.png',
      pitch: 1.5,
    },
  ];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  selectGender(type: number) {
    this.gender = type;
  }

  selectPitch(index: number) {
    this.selectedPitch = index;
  }

  clear() {
    this.inputText = '';
    this.wordCount = 0;
  }
  convert() {
    var genderType;
    if (this.gender == 1) {
      genderType = 'male';
    } else {
      genderType = 'female';
    }
    const model = this.dialog.open(ConvertOutputModelComponent, {
      width: '50%',
      data: {
        inputText: this.inputText,
        gender: genderType,
      },
    });
    model.afterClosed().subscribe(() => {});
  }

  updateWordCount() {
    const words = this.inputText.trim().split(/\s+/);
    this.wordCount = words.length;
  }
}
