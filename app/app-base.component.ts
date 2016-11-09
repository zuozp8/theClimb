import {Component} from "@angular/core";
import {ResourcesService} from "./resources.service";
import {TimeTickService} from "./time-tick.service";
import {ResearchService} from "./research.service";

@Component({
    selector: 'app-base',
    templateUrl: '/app/app-base.component.html'
})
export class AppBaseComponent {
    constructor(public resourcesService: ResourcesService,
                public researchService: ResearchService,
                timeTickService: TimeTickService // Just initialize
    ) {
    }
}