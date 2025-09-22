import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifisbrandComponent } from './specifisbrand.component';

describe('SpecifisbrandComponent', () => {
  let component: SpecifisbrandComponent;
  let fixture: ComponentFixture<SpecifisbrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpecifisbrandComponent]
    });
    fixture = TestBed.createComponent(SpecifisbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
