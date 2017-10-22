import {Injectable} from "@angular/core";
import {ResearchId} from "./research";
import {ResearchService} from "./research.service";
import {Savable} from "./savable";
import {Tickable} from "./Tickable";
import {VillageService} from "./village.service";

@Injectable()
export class BreedingService implements Savable<number>, Tickable {
    progress: number = 0;

    constructor(private villageService: VillageService,
                private researchService: ResearchService) {
    }

    onTick(interval: number): void {
        this.progress += interval * this.getProduction();
        if (this.progress > 1) {
            this.villageService.current.freeWorker += 1;
            this.progress -= 1;
        }
    };

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