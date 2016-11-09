import {Injectable} from "@angular/core";
import {VillageService} from "./village.service";
import {TimeTickService} from "./time-tick.service";
import {ResearchService} from "./research.service";
import {ResearchId} from "./research";

@Injectable()
export class BreedingService {
    progress: number = 0;

    constructor(private villageService: VillageService,
                private researchService: ResearchService,
                timeTickService: TimeTickService) {
        timeTickService.subscribers.push(this.onTick);
    }

    private onTick = (interval: number): void => {
        this.progress += interval * this.getProduction();
        if (this.progress > 1) {
            this.villageService.current.freeWorker += 1;
            this.progress -= 1;
        }
    };

    public getProduction(): number {
        if (!this.researchService.isDone(ResearchId.Sex)) {
            return 0;
        }
        return 0.05;
    }
}