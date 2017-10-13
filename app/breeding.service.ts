import {Injectable} from "@angular/core";
import {ResearchId} from "./research";
import {ResearchService} from "./research.service";
import {SaveService} from "./save.service";
import {Savable} from "./saveable";
import {TimeTickService} from "./time-tick.service";
import {VillageService} from "./village.service";

@Injectable()
export class BreedingService implements Savable<number> {
    progress: number = 0;
    private onTick = (interval: number): void => {
        this.progress += interval * this.getProduction();
        if (this.progress > 1) {
            this.villageService.current.freeWorker += 1;
            this.progress -= 1;
        }
    };

    constructor(private villageService: VillageService,
                private researchService: ResearchService,
                saveService: SaveService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
        saveService.subscribe(this);
    }

    getSaveData(): number {
        return this.progress;
    }

    applySaveData(data: number): void {
        this.progress = data;
    }

    public getProduction(): number {
        if (!this.researchService.isDone(ResearchId.Sex)) {
            return 0;
        }
        return 0.05;
    }
}