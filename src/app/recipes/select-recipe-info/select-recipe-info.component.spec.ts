import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRecipeInfoComponent } from './select-recipe-info.component';

describe('SelectRecipeInfoComponent', () => {
  let component: SelectRecipeInfoComponent;
  let fixture: ComponentFixture<SelectRecipeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRecipeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRecipeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
