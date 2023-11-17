import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertOutputModelComponent } from './convert-output-model.component';

describe('ConvertOutputModelComponent', () => {
  let component: ConvertOutputModelComponent;
  let fixture: ComponentFixture<ConvertOutputModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertOutputModelComponent]
    });
    fixture = TestBed.createComponent(ConvertOutputModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
