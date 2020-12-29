import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() id: number;
  constructor(
     private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onSelect(){
    this.router.navigate([this.id], {relativeTo: this.route});
  }
}
