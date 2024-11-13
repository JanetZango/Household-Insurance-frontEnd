import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHouseMulitpleImagesPage } from './add-house-mulitple-images.page';

describe('AddHouseMulitpleImagesPage', () => {
  let component: AddHouseMulitpleImagesPage;
  let fixture: ComponentFixture<AddHouseMulitpleImagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseMulitpleImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
