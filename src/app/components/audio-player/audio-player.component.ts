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

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded: boolean = false;

  @Input() audioUrl: string;
  private wavesurfer: WaveSurfer;

  isPlaying: boolean = false;
  isAddedToPLaylist: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private storageService: StorageService,
    private http: HttpClient
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

  private initWaveSurfer() {
    const element = this.elementRef.nativeElement.querySelector('#waveform');
    this.wavesurfer = WaveSurfer.create({
      container: element,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    // Load audio file
    this.wavesurfer.load(this.audioUrl);
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
    this.isAddedToPLaylist = true;
  }

  removeFromPlayList() {
    this.isAddedToPLaylist = false;
  }
}
