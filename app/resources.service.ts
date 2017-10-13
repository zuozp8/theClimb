import {Injectable} from "@angular/core";
import {SaveService} from "./save.service";
import {Savable} from "./saveable";
import {TimeTickService} from "./time-tick.service";
import {Village} from "./village";
import {VillageService} from "./village.service";

@Injectable()
export class ResourcesService implements Savable<[number, number]> {
    essence: number = 100;
    milk: number = 0;
    private onTick = (interval: number): void => {
        this.essence += interval * (this.getEssenceProduction() - this.getEssenceConsumption());
    };

    constructor(private villageService: VillageService,
                saveService: SaveService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
        saveService.subscribe(this);

    }

    getSaveData(): [number, number] {
        return [this.essence, this.milk];
    }

    applySaveData(data: [number, number]): void {
        [this.essence, this.milk] = data;
    }

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