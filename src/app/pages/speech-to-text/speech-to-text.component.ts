import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecordAudioModelComponent } from './record-audio-model/record-audio-model.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
})
export class SpeechToTextComponent {
  constructor(public router: Router,public dialog: MatDialog) {}


  recordAudio(){
    const model = this.dialog.open(RecordAudioModelComponent, {
      panelClass: 'popup-model',
      data: {},
      width: '40%'
    });
    model.afterClosed().subscribe(() => {});
  }
}
