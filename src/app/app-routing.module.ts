import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TextToSpeechComponent } from './pages/text-to-speech/text-to-speech.component';
import { SpeechToTextComponent } from './pages/speech-to-text/speech-to-text.component';
import { LibraryComponent } from './pages/library/library.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'text-to-speech',
        component: TextToSpeechComponent,
      },
      {
        path: 'speech-to-text',
        component: SpeechToTextComponent,
      },
      {
        path: 'library',
        component: LibraryComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
