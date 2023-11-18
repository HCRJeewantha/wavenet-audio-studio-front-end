import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pich-change',
  templateUrl: './pich-change.component.html',
  styleUrls: ['./pich-change.component.scss'],
})
export class PichChangeComponent {
  isDataLoaded: boolean = false;
  audioUrl: string;
  audioFile: any;
  pitch: number = 0;
  convertedAudioUrl: string;
  convertedAudioFile: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient
  ) {
    this.audioUrl = data.audioUrl;
    this.audioFile = data.audio;
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  convertAudio() {
    this.isDataLoaded = true;
    const formData = new FormData();
    formData.append('file', this.audioFile, this.audioFile.name);

    const headers = new HttpHeaders({
      Accept: 'application/json',
      contentType: 'multipart/form-data',
      Authorization: 'Bearer ' + String(this.storageService.getToken()),
    });

    this.http
      .post(
        `${environment.baseURL}/audio-manager/audio-shift-pitch?semitones=${this.pitch}`,
        formData,
        {
          headers,
          responseType: 'blob',
          observe: 'response',
        }
      )
      .subscribe(
        (data: any) => {
          const blob = new Blob([data.body], { type: 'audio/wav' });
          const url = window.URL.createObjectURL(blob);
          this.convertedAudioUrl = url;
          this.convertedAudioFile = blob;
          this.isDataLoaded = false;
        },
        (error) => {
          this.isDataLoaded = false;
        }
      );
  }
}
