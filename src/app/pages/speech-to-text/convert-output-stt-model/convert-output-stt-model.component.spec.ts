import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertOutputSttModelComponent } from './convert-output-stt-model.component';

describe('ConvertOutputSttModelComponent', () => {
  let component: ConvertOutputSttModelComponent;
  let fixture: ComponentFixture<ConvertOutputSttModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertOutputSttModelComponent]
    });
    fixture = TestBed.createComponent(ConvertOutputSttModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
