import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  //@ViewChild('nameInput') nameRef: ElementRef;
  //@ViewChild('amountInput') amountRef: ElementRef;
  idEditedItem: number;
  subsribtionToIdItem: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f') fRef: NgForm;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.subsribtionToIdItem = this.shoppingListService.idItemEdited
    .subscribe((idEdited) => {
      this.idEditedItem = idEdited;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(idEdited);
      this.fRef.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount});
    })
  }

  ngOnDestroy() {
    this.subsribtionToIdItem.unsubscribe();
  }

  /*
  onAdd(){
    const newIngredient = new Ingredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
  }
  */

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.updateIngredient(this.idEditedItem, newIngredient);
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.shoppingListService.updateIngredient(index, newIngredient);
  }

  onClear() {
    this.fRef.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.idEditedItem);
    this.onClear();
  }

}
