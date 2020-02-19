import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationAddComponent } from './destination-add.component';

describe('DestinationAddComponent', () => {
  let component: DestinationAddComponent;
  let fixture: ComponentFixture<DestinationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
