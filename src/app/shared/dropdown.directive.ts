import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";
import { Direct } from "protractor/built/driverProviders";
import { from } from "rxjs";

@Directive ({
  selector: '[appDropdown]'
})

export class DropdownDriective{
  @HostBinding('class.open') isOpen = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleOpen(eventData: Event){
    this.isOpen = !this.isOpen;

  }
}
