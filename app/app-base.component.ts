import {Component} from "@angular/core";
import {ResourcesService} from "./resources.service";

@Component({
    selector: 'app-base',
    templateUrl: '/app/app-base.component.html'
})
export class AppBaseComponent {
    public population: number = 1;

    constructor(public resourcesService: ResourcesService) {
    }
}