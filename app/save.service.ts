import {Injectable} from "@angular/core";
import {ResourcesService} from "./resources.service";
import {ResearchService} from "./research.service";
import {VillageService} from "./village.service";
import {BreedingService} from "./breeding.service";
import {TimeTickService} from "./time-tick.service";
import {allResearches, Research, ResearchId} from "./research";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SaveService {

    public saved = new Subject<void>();

    constructor(private resourcesService: ResourcesService,
                private researchService: ResearchService,
                private villageService: VillageService,
                private breedingService: BreedingService,
                private timeTickService: TimeTickService) {
        timeTickService.subscribers.push((interval: number): void => {
            if (timeTickService.time % 50 < interval) {
                this.save();
            }
        });
    }

    public save() {
        localStorage.setItem('saveData', this.getStateString());
        this.saved.next();
    }

    public load() {
        let state: string = localStorage.getItem('saveData');
        if (state) {
            this.applyStateString(state);
        }
    }

    private version = 1;

    public getStateString(): string {
        return JSON.stringify([
            this.version,
            [this.resourcesService.essence, this.resourcesService.milk,],
            [
                this.researchService.currentResearchId,
                this.researchService.currentProgress,
                this.getFinishedResearchIds()
            ],
            this.villageService.villages,
            this.breedingService.progress,
            this.timeTickService.time,
        ]);
    }

    private applyStateString(state: string) {
        let stateArray = JSON.parse(state);
        let version = stateArray.shift();
        if (version != this.version) {
            throw new Error('Save from different version, not loaded');
        }

        let finishedResearchIds: ResearchId[];
        [
            [this.resourcesService.essence, this.resourcesService.milk,],
            [
                this.researchService.currentResearchId,
                this.researchService.currentProgress,
                finishedResearchIds
            ],
            this.villageService.villagesRaw,
            this.breedingService.progress,
            this.timeTickService.time,

        ] = stateArray;

        allResearches.forEach((research: Research): void => {
            research.isDone = finishedResearchIds.includes(research.id);
        });
        console.log('loaded');
    }

    public replaceSave(state?: string) {
        if (state) {
            localStorage.setItem('saveData', state);
        } else {
            localStorage.removeItem('saveData');
        }
        this.load();
    }

    private getFinishedResearchIds(): ResearchId[] {
        //TODO move
        let result: ResearchId[] = [];
        allResearches.forEach((value: Research, key: ResearchId): void => {
            if (value.isDone) {
                result.push(key);
            }
        });
        return result;
    }
}