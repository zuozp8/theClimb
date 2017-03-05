import {Component} from "@angular/core";
import {Village} from "./village";
import {ResourcesService} from "./resources.service";
import {VillageService} from "./village.service";
import {ResearchService} from "./research.service";
import {ResearchId} from "./research";
import {BreedingService} from "./breeding.service";

@Component({
    templateUrl: '/app/village.component.html'
})
export class VillageComponent {
    constructor(private resourcesService: ResourcesService,
                private researchService: ResearchService,
                private villageService: VillageService,
                public breedingService: BreedingService) {
    }

    minePrice: number = 50;
    universityPrice: number = 50;

    get buildingMineConstraint(): string | void {
        if (!this.village.freeWorker) {
            return 'You dont have any unemployed villagers to work in new mine.';
        }
        if (this.resourcesService.essence < this.minePrice) {
            let missingEssence = Math.ceil(this.minePrice - this.resourcesService.essence);
            return `You need ${missingEssence} more essence.`;
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
        if (this.resourcesService.essence < this.universityPrice) {
            let missingEssence = Math.ceil(this.universityPrice - this.resourcesService.essence);
            return `You need ${missingEssence} more essence.`;
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
        this.resourcesService.essence -= this.minePrice;
    }

    buyUniversity() {
        this.village.buildUniversity();
        this.resourcesService.essence -= this.universityPrice;
    }
}