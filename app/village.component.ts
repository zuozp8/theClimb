import {Component} from "@angular/core";
import {Village} from "./village";
import {ResourcesService} from "./resources.service";
import {VillageService} from "./village.service";
import {ResearchService} from "./research.service";
import {ResearchId} from "./research";

@Component({
    templateUrl: '/app/village.component.html'
})
export class VillageComponent {
    constructor(private resourcesService: ResourcesService,
                private researchService: ResearchService,
                private villageService: VillageService) {
    }

    minePrice: number = 50;
    universityPrice: number = 50;

    get buildingMineConstraint(): string | void {
        if (!this.village.freeWorker) {
            return 'You dont have any unemployed villagers to work in new mine.';
        }
        if (this.resourcesService.fat < this.minePrice) {
            let missingFat = Math.ceil(this.minePrice - this.resourcesService.fat);
            return `You need ${missingFat} more fat.`;
        }
        if (!this.villageService.hasAnyUniversity
            && this.villageService.hasAnyMine
            && !this.researchService.isDone(ResearchId.Sex)) {
            return 'Don\'t assign everyone to mining.';
        }
        return null;
    }

    get buildingUniversityConstraint(): string | void {
        if (!this.village.freeWorker) {
            return 'You dont have any unemployed villagers to work in new university.';
        }
        if (this.resourcesService.fat < this.universityPrice) {
            let missingFat = Math.ceil(this.universityPrice - this.resourcesService.fat);
            return `You need ${missingFat} more fat.`;
        }
        if (!this.villageService.hasAnyMine) {
            return 'First food, then science.';
        }
        return null;
    }

    get village(): Village {
        return this.villageService.current;
    }

    buyMine() {
        this.village.buildMine();
        this.resourcesService.fat -= this.minePrice;
    }

    buyUniversity() {
        this.village.buildUniversity();
        this.resourcesService.fat -= this.universityPrice;
    }
}