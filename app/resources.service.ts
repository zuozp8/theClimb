import {Injectable} from "@angular/core";
import {VillageService} from "./village.service";
import {TimeTickService} from "./time-tick.service";
import {Village} from "./village";

@Injectable()
export class ResourcesService {
    fat: number = 200;
    milk: number = 0;

    constructor(private villageService: VillageService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
    }

    private onTick = (interval: number): void => {
        this.fat += interval * (this.getFatProduction() - this.getFatConsumption());
    };

    private getFatProduction(): number {
        let result = 0;
        for (let village of this.villageService.villages) {
            result += this.getLocalFatProduction(village);
        }
        return result;
    }

    private getLocalFatProduction(village: Village): number {
        return village.mines;
    }

    private getFatConsumption(): number {
        let result = 0;
        for (let village of this.villageService.villages) {
            result += this.getLocalFatConsumption(village);
        }
        return result;
    }

    private getLocalFatConsumption(village: Village): number {
        return village.population / 5;
    }
}