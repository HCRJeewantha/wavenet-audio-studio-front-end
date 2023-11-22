import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
  Component,
  Input,
  Inject,
  OnInit,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import WaveSurfer from 'wavesurfer.js';
import { environment } from 'src/environments/environment.prod';
import { ApplicationUtils } from 'src/app/services/application-utils.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded: boolean = false;
  @Input() type: number;

  @Input() audioUrl: string;
  private wavesurfer: WaveSurfer | null;

  @Input() audioFile: File;

  isPlaying: boolean = false;
  isAddedToPLaylist: boolean = false;
  playlistId: number | null;

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient,
    private applicationUtilService: ApplicationUtils
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initWaveSurfer();
  }

  ngOnDestroy() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

  public initWaveSurfer() {
    this.destroyWaveSurfer();
    const element = this.elementRef.nativeElement.querySelector('#waveform');
    this.wavesurfer = WaveSurfer.create({
      container: element,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    // Load audio file
    this.wavesurfer.load(this.audioUrl);
  }
  private destroyWaveSurfer() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
      this.wavesurfer = null;
    }
  }

  playAudio() {
    this.isPlaying = true;
    if (this.wavesurfer) {
      this.wavesurfer.play();
    }
  }

  pauseAudio() {
    this.isPlaying = false;
    if (this.wavesurfer) {
      this.wavesurfer.pause();
    }
  }

  restartAudio() {
    this.isPlaying = true;
    if (this.wavesurfer) {
      this.wavesurfer.seekTo(0);
      this.wavesurfer.play();
    }
  }

  stopAudio() {
    this.isPlaying = false;
    if (this.wavesurfer) {
      this.wavesurfer.stop();
    }
  }

  addToPlaylist() {
    const formData = new FormData();
    formData.append('file', this.audioFile, this.audioFile.name);

    this.isDataLoaded = true;
    this.apiService
      .post(
        formData,
        String(this.storageService.getToken()),
        `/audio-manager/save-audio/${this.type}`,
        'multipart/form-data'
      )
      .then((response: any) => {
        this.isAddedToPLaylist = true;

        this.isDataLoaded = false;
        this.playlistId = response.result.id;
        this.applicationUtilService.openSnackBar(
          'Audio added to library',
          'app-notification-success'
        );
      })
      .catch((error: any) => {
        this.isDataLoaded = false;
      });
  }

  removeFromPlayList() {
    this.apiService
      .delete(
        String(this.storageService.getToken()),
        `/audio-manager/remove-audio/${this.playlistId}`
      )
      .then((response: any) => {
        this.isAddedToPLaylist = false;
        this.applicationUtilService.openSnackBar(
          'Audio removed from library',
          'app-notification-success'
        );

        this.playlistId = null;
      })
      .catch((error: any) => {});
  }
}
