import {Injectable} from "@angular/core";
import {MessagesService} from "./messages.service";
import {Savable} from "./savable";
import {Settings} from "./settings";
import {Tickable} from "./Tickable";

@Injectable()
export class SaveService implements Tickable {
    private savableServices: Savable<any>[] = [];
    private version = 3;

    constructor(private messageService: MessagesService,
                private settings: Settings) {
    }

    onTick(interval: number, time: number): void {
        if (time % this.settings.autoSaveInterval < interval) {
            this.save();
        }
    }

    public subscribe(service: Savable<any>): void {
        this.savableServices.push(service);
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

    public getStateString(): string {
        let state = {
            0: this.version,
        };
        for (let savable of this.savableServices) {
            state[savable.constructor.name] = savable.getSaveData();
        }
        return JSON.stringify(state);
    }

    public replaceSave(state: string): void {
        localStorage.setItem('saveData', state);
        this.load();
    }

    public resetSave(): void {
        localStorage.removeItem('saveData');
        location.reload(); // TODO back to main page
    }

    private applyStateString(stateString: string): void {
        let state = JSON.parse(stateString);
        if (state[0] != this.version) {
            this.messageService.topMessage.next(['Save from different version, not loaded', null]);
            return;
        }
        for (let savable of this.savableServices) {
            savable.applySaveData(state[savable.constructor.name]);
        }
    }
}