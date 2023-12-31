import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { Subject, Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private mediaRecorder: MediaRecorder;
  private audioChunks: Blob[] = [];
  private wavesurfer: WaveSurfer;
  private recordingTimeSubject = new Subject<string>();
  public audioFile: File;
  private recordingStartTime: number;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  startRecording() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.recordingTimeSubject.next('00:00');
      this.recordingStartTime = Date.now();

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          this.wavesurfer.loadBlob(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        // Check if there are audio chunks
        if (this.audioChunks.length > 0) {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          console.log('Audio Blob Size:', audioBlob.size);

          this.audioFile = new File([audioBlob], 'recorded_audio.wav', {
            type: 'audio/wav',
          });

          this.recordingTimeSubject.complete();
        }
      };

      this.mediaRecorder.start();

      // Initialize WaveSurfer
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
      });

      // Start recording time interval
      setInterval(() => {
        const elapsedTime = Date.now() - this.recordingStartTime;
        const timeInSeconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(timeInSeconds / 60)
          .toString()
          .padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        this.recordingTimeSubject.next(`${minutes}:${seconds}`);
      }, 1000);
    });
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.wavesurfer.stop();
    }
  }

  playAudio() {
    if (this.wavesurfer) {
      this.wavesurfer.play();
    }
  }

  pauseAudio() {
    if (this.wavesurfer) {
      this.wavesurfer.pause();
    }
  }

  // Destroy the Wavesurfer instance
  destroyWavesurfer() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

  getRecordingTime(): Observable<string> {
    return this.recordingTimeSubject.asObservable();
  }

  uploadAudio() {
    const formData = new FormData();
    formData.append('file', this.audioFile, this.audioFile.name);

    this.apiService
      .post(
        formData,
        String(this.storageService.getToken()),
        `/audio-manager/convert-audio-to-text`,
        'multipart/form-data'
      )
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {});
    return this.audioFile;
  }
}
