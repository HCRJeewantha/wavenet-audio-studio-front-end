import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';

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
  library: any;
  audioUrl: string;
  @ViewChild(AudioPlayerComponent) audioPlayerComponent!: AudioPlayerComponent;
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient
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

  getAudio(path: string) {
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
          const url = window.URL.createObjectURL(blob);
          this.audioUrl = url;
          this.isDataLoaded = false;
          this.audioPlayerComponent.initWaveSurfer();
        },
        (error) => {
          this.isDataLoaded = false;
        }
      );
  }
}
