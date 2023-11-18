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
  selector: 'app-convert-output-stt-model',
  templateUrl: './convert-output-stt-model.component.html',
  styleUrls: ['./convert-output-stt-model.component.scss'],
})
export class ConvertOutputSttModelComponent {
  isDataLoaded: boolean = false;
  audioUrl: string;
  convertedText: string;
  isPlaying: boolean = false;
  isAddedToPLaylist: boolean = false;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<ConvertOutputSttModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.convertedText = this.data.response.result;
  }

  ngOnInit(): void {
    this.audioUrl = URL.createObjectURL(this.data.audio);

  }

  getTextToAudio() {
    this.isDataLoaded = true;
  }
}
