import {Component} from "@angular/core";
import {Village} from "./village";
import {ResourcesService} from "./resources.service";
import {VillageService} from "./village.service";

@Component({
    templateUrl: '/app/village.component.html'
})
export class VillageComponent {
    constructor(private resourcesService: ResourcesService,
                private villageService: VillageService) {
    }

    minePrice: number = 50;
    universityPrice: number = 50;

    get buildingMineConstraint(): string | void {
        if (!this.village.freeWorker) {
            return 'You dont have any unemployed people to work in new mine.';
        }
        if (this.resourcesService.fat < this.minePrice) {
            return 'You need ${this.minePrice} - ${this.resourcesService.fat} more fat.';
        }
        if (this.village.mines && !this.village.universities) {
            return 'Don\'t assign everyone to mining.';
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
}