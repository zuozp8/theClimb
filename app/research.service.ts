import {Injectable} from "@angular/core";
import {allResearches, Research, ResearchId} from "./research";
import {Savable} from "./savable";
import {Village} from "./village";
import {VillageService} from "./village.service";

type ResarchServiceSaveState = [ResearchId, number, ResearchId[]];

@Injectable()
export class ResearchService implements Savable<ResarchServiceSaveState> {
    currentProgress: number = 0;
    currentResearchId: ResearchId = null;

    constructor(private villageService: VillageService) {
    }

    get finishedResearchIds(): ResearchId[] { //TODO move maybe
        let result: ResearchId[] = [];
        allResearches.forEach((value: Research, key: ResearchId): void => {
            if (value.isDone) {
                result.push(key);
            }
        });
        return result;
    }

    set finishedResearchIds(finishedResearchIds: ResearchId[]) {
        allResearches.forEach((research: Research): void => {
            research.isDone = finishedResearchIds.includes(research.id);
        });
    }

    get currentResearch(): Research {
        if (this.currentResearchId === null) {
            return null;
        }
        return allResearches.get(this.currentResearchId);
    }

    onTick(interval: number): void {
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

    getSaveData(): ResarchServiceSaveState {
        return [this.currentResearchId, this.currentProgress, this.finishedResearchIds];
    }

    applySaveData(data: ResarchServiceSaveState): void {
        [this.currentResearchId, this.currentProgress, this.finishedResearchIds] = data;
    }

    startResearch(id: ResearchId): void {
        this.currentResearchId = id;
        this.currentProgress = 0;
    }

    isDone(id: ResearchId): boolean {
        return allResearches.get(id).isDone;
    }

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