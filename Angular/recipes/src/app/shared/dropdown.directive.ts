import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  private isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
    const dropdownMenu = this.elRef.nativeElement.nextElementSibling;

    if (this.isOpen && dropdownMenu) {
      dropdownMenu.classList.add('show');
    } else if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }
  }
  constructor(private elRef: ElementRef) {}
}
