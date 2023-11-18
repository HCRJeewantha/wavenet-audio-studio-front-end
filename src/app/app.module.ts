import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TextToSpeechComponent } from './pages/text-to-speech/text-to-speech.component';
import { SpeechToTextComponent } from './pages/speech-to-text/speech-to-text.component';
import { LibraryComponent } from './pages/library/library.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertOutputModelComponent } from './pages/text-to-speech/convert-output-model/convert-output-model.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { MatRippleModule } from '@angular/material/core';
import { RecordAudioModelComponent } from './pages/speech-to-text/record-audio-model/record-audio-model.component';
import { ConvertOutputSttModelComponent } from './pages/speech-to-text/convert-output-stt-model/convert-output-stt-model.component';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { PichChangeComponent } from './pages/library/pich-change/pich-change.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    TextToSpeechComponent,
    SpeechToTextComponent,
    LibraryComponent,
    ConvertOutputModelComponent,
    AudioPlayerComponent,
    RecordAudioModelComponent,
    ConvertOutputSttModelComponent,
    PichChangeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    MatProgressBarModule,
    MatRippleModule,
    MatTableModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
