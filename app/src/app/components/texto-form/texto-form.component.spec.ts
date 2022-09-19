import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoFormComponent } from './texto-form.component';

describe('TextoFormComponent', () => {
  let component: TextoFormComponent;
  let fixture: ComponentFixture<TextoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
