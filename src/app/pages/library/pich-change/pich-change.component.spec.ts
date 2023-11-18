import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PichChangeComponent } from './pich-change.component';

describe('PichChangeComponent', () => {
  let component: PichChangeComponent;
  let fixture: ComponentFixture<PichChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PichChangeComponent]
    });
    fixture = TestBed.createComponent(PichChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
