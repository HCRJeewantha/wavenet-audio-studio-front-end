import { Component, OnDestroy } from '@angular/core';
import { AudioService } from 'src/app/audio.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private audioService: AudioService
  ) {
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

  uploadAudio() {
    // const data = {
    //   file: this.audioService.uploadAudio()
    // };
    this.audioService.uploadAudio()
    // this.apiService
    //   .post(
    //     data,
    //     String(this.storageService.getToken()),
    //     `/audio-manager/convert-audio-to-text`
    //   )
    //   .then((response: any) => {
    //     console.log(response);
    //   })
    //   .catch((error: any) => {});
  }
}
