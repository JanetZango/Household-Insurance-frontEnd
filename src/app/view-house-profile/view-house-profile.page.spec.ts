import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHouseProfilePage } from './view-house-profile.page';

describe('ViewHouseProfilePage', () => {
  let component: ViewHouseProfilePage;
  let fixture: ComponentFixture<ViewHouseProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHouseProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
