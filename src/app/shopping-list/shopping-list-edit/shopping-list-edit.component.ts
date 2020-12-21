import { Component, OnInit, Output , EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @Output() addedIngredient = new EventEmitter<Ingredient>();
  @ViewChild('nameInput') nameRef: ElementRef;
  @ViewChild('amountInput') amountRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    const newIngredient = new Ingredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value);
    this.addedIngredient.emit(newIngredient);
  }
}
