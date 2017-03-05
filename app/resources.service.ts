import {Injectable} from "@angular/core";
import {VillageService} from "./village.service";
import {TimeTickService} from "./time-tick.service";
import {Village} from "./village";

@Injectable()
export class ResourcesService {
    essence: number = 100;
    milk: number = 0;

    constructor(private villageService: VillageService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
    }

    private onTick = (interval: number): void => {
        this.essence += interval * (this.getEssenceProduction() - this.getEssenceConsumption());
    };

    private getEssenceProduction(): number {
        let result = 0;
        for (let village of this.villageService.villages) {
            result += this.getLocalEssenceProduction(village);
        }
        return result;
    }

    private getLocalEssenceProduction(village: Village): number {
        return village.mines;
    }

    private getEssenceConsumption(): number {
        let result = 0;
        for (let village of this.villageService.villages) {
            result += this.getLocalEssenceConsumption(village);
        }
        return result;
    }

    private getLocalEssenceConsumption(village: Village): number {
        return village.population / 5;
    }
}