import {Injectable} from "@angular/core";
import {Settings} from "./settings";

@Injectable()
export class TimeTickService {
    active: boolean = false;
    time: number = 0;

    subscribers: Array<(interval: number) => void> = [];

    private intervalId: number;

    constructor(private settings: Settings) {
        const self = this;
        this.intervalId = setInterval(() => {
            if (!self.active) {
                return;
            }
            self.time += this.settings.tickInterval;

            for (let subscriber of self.subscribers) {
                subscriber(self.settings.tickInterval);
            }
        }, 1000 * self.settings.tickInterval);
    }
}