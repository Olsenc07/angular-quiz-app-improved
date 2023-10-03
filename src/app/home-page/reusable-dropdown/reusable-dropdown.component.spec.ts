import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableDropdownComponent } from './reusable-dropdown.component';

describe('ReusableDropdownComponent', () => {
  let component: ReusableDropdownComponent;
  let fixture: ComponentFixture<ReusableDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReusableDropdownComponent]
    });
    fixture = TestBed.createComponent(ReusableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
