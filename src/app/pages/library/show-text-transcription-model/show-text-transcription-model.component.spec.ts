import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTextTranscriptionModelComponent } from './show-text-transcription-model.component';

describe('ShowTextTranscriptionModelComponent', () => {
  let component: ShowTextTranscriptionModelComponent;
  let fixture: ComponentFixture<ShowTextTranscriptionModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTextTranscriptionModelComponent]
    });
    fixture = TestBed.createComponent(ShowTextTranscriptionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
