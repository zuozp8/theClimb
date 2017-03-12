import {Injectable} from "@angular/core";
import {BreedingService} from "./breeding.service";
import {MessagesService} from "./messages.service";
import {allResearches, Research, ResearchId} from "./research";
import {ResearchService} from "./research.service";
import {ResourcesService} from "./resources.service";
import {Settings} from "./settings";
import {TimeTickService} from "./time-tick.service";
import {VillageService} from "./village.service";

@Injectable()
export class SaveService {

    constructor(private resourcesService: ResourcesService,
                private researchService: ResearchService,
                private villageService: VillageService,
                private breedingService: BreedingService,
                private timeTickService: TimeTickService,
                private messageService: MessagesService,
                private settings: Settings) {
        timeTickService.subscribers.push((interval: number): void => {
            if (timeTickService.time % this.settings.autoSaveInterval < interval) {
                this.save();
            }
        });
    }

    public save(): void {
        localStorage.setItem('saveData', this.getStateString());
        this.messageService.topMessage.next(['Saved', null]);
    }

    public load(): void {
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

    private applyStateString(state: string): void {
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

    public replaceSave(state: string): void {
        localStorage.setItem('saveData', state);
        this.load();
    }

    public resetSave(): void {
        localStorage.removeItem('saveData');
        location.reload();
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