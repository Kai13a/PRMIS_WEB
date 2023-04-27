import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusSelectComponent } from './campus-select.component';

describe('CampusSelectComponent', () => {
  let component: CampusSelectComponent;
  let fixture: ComponentFixture<CampusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
