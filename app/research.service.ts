import {Injectable} from "@angular/core";
import {VillageService} from "./village.service";
import {TimeTickService} from "./time-tick.service";
import {Village} from "./village";

@Injectable()
export class ResearchService {
    currentProgress: number = 0;

    constructor(private villageService: VillageService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
    }

    private onTick = (interval: number): void => {
        this.currentProgress += interval * this.getResearchProduction();
    };

    private getResearchProduction() {
        let result = 0;
        for (let village of this.villageService.villages) {
            result += this.getLocalResearchProduction(village);
        }
        return result;
    }

    private getLocalResearchProduction(village: Village): number {
        return village.universities;
    }
}