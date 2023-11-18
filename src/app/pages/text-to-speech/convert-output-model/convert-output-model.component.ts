import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import WaveSurfer from 'wavesurfer.js';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-convert-output-model',
  templateUrl: './convert-output-model.component.html',
  styleUrls: ['./convert-output-model.component.scss'],
})
export class ConvertOutputModelComponent implements OnInit {
  isDataLoaded: boolean = false;
  audioUrl: string;
  audioFile: any;
  isPlaying: boolean = false;
  isAddedToPLaylist: boolean = false;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<ConvertOutputModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getTextToAudio();
  }

  close() {
    this.dialogRef.close();
  }

  getTextToAudio() {
    this.isDataLoaded = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.storageService.getToken()),
    });

    this.http
      .get(
        `${environment.baseURL}/audio-manager/convert-text-to-audio/${this.data.inputText}?gender=${this.data.gender}`,
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
          this.audioFile = blob;
          this.audioUrl = url;
          this.isDataLoaded = false;
        },
        (error) => {
          this.isDataLoaded = false;
        }
      );
  }

  downloadBlob(blob: Blob, filename: string): void {
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  }
}
