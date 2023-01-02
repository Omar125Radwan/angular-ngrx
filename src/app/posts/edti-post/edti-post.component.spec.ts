import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtiPostComponent } from './edti-post.component';

describe('EdtiPostComponent', () => {
  let component: EdtiPostComponent;
  let fixture: ComponentFixture<EdtiPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtiPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdtiPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
