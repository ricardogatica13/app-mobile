import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeerQRPage } from './leer-qr.page';

describe('LeerQRPage', () => {
  let component: LeerQRPage;
  let fixture: ComponentFixture<LeerQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
