import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeniorsComponent } from './seniors.component';

describe('SeniorsComponent', () => {
  let component: SeniorsComponent;
  let fixture: ComponentFixture<SeniorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
