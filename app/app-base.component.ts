import {Component} from "@angular/core";
import {ResourcesService} from "./resources.service";
import {TimeTickService} from "./time-tick.service";
import {ResearchService} from "./research.service";
import {VillageService} from "./village.service";

@Component({
    selector: 'app-base',
    templateUrl: '/app/app-base.component.html'
})
export class AppBaseComponent {
    constructor(public resourcesService: ResourcesService,
                public researchService: ResearchService,
                public villageService: VillageService,
                timeTickService: TimeTickService // Just initialize
    ) {
    }
}