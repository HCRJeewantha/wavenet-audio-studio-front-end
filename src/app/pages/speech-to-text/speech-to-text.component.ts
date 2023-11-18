import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecordAudioModelComponent } from './record-audio-model/record-audio-model.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConvertOutputSttModelComponent } from './convert-output-stt-model/convert-output-stt-model.component';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
})
export class SpeechToTextComponent {
  isDataLoaded: boolean = false;
  audioFile: File | null = null;
  @ViewChild('fileInput') fileInput: any;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  recordAudio() {
    const model = this.dialog.open(RecordAudioModelComponent, {
      panelClass: 'popup-model',
      data: {},
      width: '40%',
    });
    model.afterClosed().subscribe(() => {});
  }

  onSubmit(): void {}

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.audioFile = fileList[0];

      const formData = new FormData();
      formData.append('file', this.audioFile, this.audioFile.name);
      this.isDataLoaded = true;
      this.apiService
        .post(
          formData,
          String(this.storageService.getToken()),
          `/audio-manager/convert-audio-to-text`,
          'multipart/form-data'
        )
        .then((response: any) => {
          this.isDataLoaded = false;
          const model = this.dialog.open(ConvertOutputSttModelComponent, {
            panelClass: 'popup-model',
            data: {
              response: response,
              audio: this.audioFile
            },
            width: '40%',
          });
          model.afterClosed().subscribe(() => {});
        })
        .catch((error: any) => {
          this.isDataLoaded = false;
        });
    }
  }
}
