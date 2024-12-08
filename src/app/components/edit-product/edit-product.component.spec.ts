import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductComponent } from './edit-product.component';

describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditProductComponent]
    });
    fixture = TestBed.createComponent(AddEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
