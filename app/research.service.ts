import {Injectable} from "@angular/core";
import {VillageService} from "./village.service";
import {TimeTickService} from "./time-tick.service";
import {Village} from "./village";
import {allResearches, Research, ResearchId} from "./research";

@Injectable()
export class ResearchService {
    currentProgress: number = 0;
    currentResearchId: ResearchId = null;

    constructor(private villageService: VillageService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
    }

    get currentResearch(): Research {
        if (this.currentResearchId === null) {
            return null;
        }
        return allResearches.get(this.currentResearchId);
    }

    startResearch(id: ResearchId): void {
        this.currentResearchId = id;
        this.currentProgress = 0;
    }

    isDone(id: ResearchId): boolean {
        return allResearches.get(id).isDone;
    }

    private onTick = (interval: number): void => {
        if (this.currentResearchId === null) {
            return;
        }
        this.currentProgress += interval * this.getResearchProduction() / this.currentResearch.cost;
        if (this.currentProgress > 1) {
            this.currentResearch.isDone = true;
            this.currentProgress = 0;
            this.currentResearchId = null;
        }
    };

    public getResearchProduction(): number {
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