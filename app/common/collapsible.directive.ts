import {Component, Input} from 'angular2/core';

@Component({
    selector: "collapsible",
    
    template: "<div style='border:1px solid #E6E6FA;border-radius: 5px;'><h4 style='margin:4px;'>{{title}}</h4><h5 (click)='toggleVisibility()'  style='background:#E6E6FA;text-align:center;'>click here to collapse / expand the content</h5><div *ngIf='visible'><ng-content></ng-content></div></div>"
})
export class CollapsibleDirective {

    @Input() title: string = "bla";
    visible: boolean = false;

    toggleVisibility(): void {
        this.visible = !this.visible;
    }
}