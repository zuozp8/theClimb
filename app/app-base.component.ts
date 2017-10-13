import {Component} from "@angular/core";
import {BreedingService} from "./breeding.service";
import {ResearchService} from "./research.service";
import {ResourcesService} from "./resources.service";
import {SaveService} from "./save.service";
import {StoryEventService} from "./story-event.service";
import {TimeTickService} from "./time-tick.service";
import {VillageService} from "./village.service";

@Component({
    selector: 'app-base',
    templateUrl: '/app/app-base.component.html'
})
export class AppBaseComponent {
    constructor(public resourcesService: ResourcesService,
                public researchService: ResearchService,
                public villageService: VillageService,
                saveService: SaveService,
                // Just initialize
                breedingService: BreedingService,
                storyEventService: StoryEventService,
                timeTickService: TimeTickService,) {
        saveService.load();
        timeTickService.unpause();
    }
}