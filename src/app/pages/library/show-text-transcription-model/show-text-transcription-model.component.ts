import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-show-text-transcription-model',
  templateUrl: './show-text-transcription-model.component.html',
  styleUrls: ['./show-text-transcription-model.component.scss'],
})
export class ShowTextTranscriptionModelComponent implements OnInit {
  isDataLoaded: boolean = false;
  textData: any;
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getTextTranscription();
  }

  getTextTranscription() {
    this.isDataLoaded = true;
    const formData = new FormData();
    formData.append('file', this.data.audio, this.data.audio.name);
    this.apiService
      .post(
        formData,
        String(this.storageService.getToken()),
        `/audio-manager/convert-audio-to-text`,
        'multipart/form-data'
      )
      .then((response: any) => {
        this.textData = response;
        this.isDataLoaded = false;
      })
      .catch((error: any) => {
        this.isDataLoaded = false;
      });
  }
}
