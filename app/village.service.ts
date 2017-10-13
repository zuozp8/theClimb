import {Injectable} from "@angular/core";
import {SaveService} from "./save.service";
import {Savable} from "./saveable";
import {Village} from "./village";

@Injectable()
export class VillageService implements Savable<Object[]> {
    public villages: Village[];

    constructor(saveService: SaveService) {
        let village = new Village();
        village.freeWorker = 2;
        this.villages = [village];
        saveService.subscribe(this);
    }

    get current(): Village {
        return this.villages[this.villages.length - 1];
    }

    get hasAnyMine(): boolean {
        for (let village of this.villages) {
            if (village.mines) {
                return true;
            }
        }
        return false;
    }

    get hasAnyUniversity(): boolean {
        for (let village of this.villages) {
            if (village.universities) {
                return true;
            }
        }
        return false;
    }

    getSaveData(): Village[] {
        return this.villages;
    }

    applySaveData(rawVillages: Object[]): void {
        this.villages = rawVillages.map((rawVillage: Object): Village => {
            let village = new Village();
            for (let prop in rawVillage) {
                village[prop] = rawVillage[prop];
            }
            return village;
        });
    }
}