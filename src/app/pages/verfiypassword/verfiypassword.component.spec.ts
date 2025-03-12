import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiypasswordComponent } from './verfiypassword.component';

describe('VerfiypasswordComponent', () => {
  let component: VerfiypasswordComponent;
  let fixture: ComponentFixture<VerfiypasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerfiypasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiypasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
