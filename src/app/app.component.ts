import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';
  option: string= 'recipes';

  optionDisplayed(option: string){
    this.option = option;
    console.log(this.option);
  }
}
