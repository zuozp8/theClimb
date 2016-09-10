import {Injectable} from "@angular/core";

@Injectable()
export class TimeTickService {
    interval: number = 0.05;
    active: boolean = true;
    time: number = 0;

    subscribers: Array<(interval: number) => void> = [];

    private intervalId: number;

    constructor() {
        const self = this;
        this.intervalId = setInterval(() => {
            if (!self.active) {
                return;
            }
            self.time += this.interval;

            for (let subscriber of self.subscribers) {
                subscriber(self.interval);
            }
        }, 1000 * self.interval);
    }
}