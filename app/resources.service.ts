import {Injectable} from "@angular/core";
import {Savable} from "./savable";
import {Tickable} from "./Tickable";
import {Village} from "./village";
import {VillageService} from "./village.service";

@Injectable()
export class ResourcesService implements Savable<[number, number]>, Tickable {
    essence: number = 100;
    milk: number = 0;

    constructor(private villageService: VillageService) {
    }

    onTick(interval: number): void {
        this.essence += interval * (this.getEssenceProduction() - this.getEssenceConsumption());
    };

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