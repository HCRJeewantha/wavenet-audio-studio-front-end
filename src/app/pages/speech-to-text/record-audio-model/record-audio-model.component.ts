import { Component, OnDestroy } from '@angular/core';
import { AudioService } from 'src/app/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-record-audio-model',
  templateUrl: './record-audio-model.component.html',
  styleUrls: ['./record-audio-model.component.scss'],
})
export class RecordAudioModelComponent implements OnDestroy {
  recordingTime: string;
  private recordingTimeSubscription: Subscription;
  isRecordClicked: boolean = false;
  isPlaying: boolean = false;
  constructor(private audioService: AudioService) {
    this.recordingTimeSubscription = this.audioService
      .getRecordingTime()
      .subscribe((time) => {
        this.recordingTime = time;
      });
  }

  startRecording() {
    this.isRecordClicked = true;
    this.audioService.destroyWavesurfer();
    this.audioService.startRecording();
  }

  stopRecording() {
    this.isRecordClicked = false;
    this.audioService.stopRecording();
   
  }

  playRecord() {
    this.isPlaying = true;
    this.audioService.playAudio();
  }

  pauseRecord() {
    this.isPlaying = false;
    this.audioService.pauseAudio();

  }

  ngOnDestroy() {
    this.recordingTimeSubscription.unsubscribe();
  }

  uploadAudio(){
    this.audioService.uploadAudio()
  }
}
