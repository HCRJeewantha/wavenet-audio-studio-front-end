import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAudioModelComponent } from './record-audio-model.component';

describe('RecordAudioModelComponent', () => {
  let component: RecordAudioModelComponent;
  let fixture: ComponentFixture<RecordAudioModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordAudioModelComponent]
    });
    fixture = TestBed.createComponent(RecordAudioModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
