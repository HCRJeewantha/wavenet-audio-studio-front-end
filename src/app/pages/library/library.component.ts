import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { MatDialog } from '@angular/material/dialog';
import { PichChangeComponent } from './pich-change/pich-change.component';
import { ShowTextTranscriptionModelComponent } from './show-text-transcription-model/show-text-transcription-model.component';

export interface PeriodicElement {
  name: string;
  type: string;
  favorite: number;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'type', 'favorite'];
  dataSource: any;
  isDataLoaded: boolean = false;
  isAudioLoaded: boolean = false;
  library: any[] = [];
  audioUrl: string;
  audio: any;
  @ViewChild(AudioPlayerComponent) audioPlayerComponent!: AudioPlayerComponent;
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLibrary();
  }

  getAudioFrom(id: number): any {
    if (id == 1) {
      return 'Uploads';
    }
    if (id == 2) {
      return 'Text to Speech';
    }
    if (id == 3) {
      return 'Audio Modifier';
    }
  }

  getLibrary() {
    this.apiService
      .get(
        String(this.storageService.getToken()),
        `/audio-manager/get-audio-list`
      )
      .then((response: any) => {
        this.getAudio(response.result[0].path);

        this.dataSource = new MatTableDataSource<PeriodicElement>(
          response.result
        );
      })
      .catch((error: any) => {});
  }

  changePitch() {
    const model = this.dialog.open(PichChangeComponent, {
      panelClass: 'popup-model',
      width: '50%',
      data: {
        audioUrl: this.audioUrl,
        audio: this.audio,
      },
    });
    model.afterClosed().subscribe(() => {
      this.getLibrary();
    });
  }

  getAudio(path: string) {
    this.isAudioLoaded = true;
    this.isDataLoaded = true;
    const data = {
      path: path,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.storageService.getToken()),
    });

    this.http
      .post(`${environment.baseURL}/audio-manager/get-audio`, data, {
        headers,
        responseType: 'blob',
        observe: 'response',
      })
      .subscribe(
        (data: any) => {
          const blob = new Blob([data.body], { type: 'audio/wav' });
          this.audio = blob;
          const url = window.URL.createObjectURL(blob);
          this.audioUrl = url;
          this.isDataLoaded = false;
          this.isAudioLoaded = false;
          this.audioPlayerComponent.initWaveSurfer();
        },
        (error) => {
          this.isDataLoaded = false;
          this.isAudioLoaded = false;
        }
      );
  }

  showText() {
    const model = this.dialog.open(ShowTextTranscriptionModelComponent, {
      panelClass: 'popup-model',
      width: '50%',
      data: {
        audioUrl: this.audioUrl,
        audio: this.audio,
      },
    });
    model.afterClosed().subscribe(() => {
      this.getLibrary();
    });
  }
}
