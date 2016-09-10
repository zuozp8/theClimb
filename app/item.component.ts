import {Component, Input} from "@angular/core";

@Component({
    selector: 'item',
    templateUrl: '/app/item.component.html',
})
export class ItemComponent {
    @Input() label: string;
    @Input() value: number;
    @Input() description: string;
    //TODO action
    opened: boolean = false;
}