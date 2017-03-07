import {Injectable} from "@angular/core";
import {Village} from "./village";

@Injectable()
export class VillageService {
    public villages: Village[];

    set villagesRaw(rawVillages: Object[]) {
        this.villages = rawVillages.map((rawVillage: Object): Village => {
            let village = new Village();
            for (let prop in rawVillage) {
                village[prop] = rawVillage[prop];
            }
            return village;
        });
    };

    constructor() {
        let village = new Village();
        village.freeWorker = 2;
        this.villages = [village];
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
}