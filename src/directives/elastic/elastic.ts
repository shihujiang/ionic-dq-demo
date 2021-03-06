import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the ElasticDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[elastic]' // Attribute selector
})
export class ElasticDirective {

  constructor(public element:ElementRef) {
    console.log('Hello ElasticDirective Directive');
    this.element = element;
  }

  ngAfterViewInit(){
    console.log('Hello ElasticDirective Directive ngAfterViewInit');
    this.element.nativeElement.querySelector("textarea").style.height = "100%";
  }

}
