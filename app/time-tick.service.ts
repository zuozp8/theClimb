import {Injectable} from "@angular/core";
import {Settings} from "./settings";

@Injectable()
export class TimeTickService {
    pauseDepth: number = 1; // Game is unpaused after load
    time: number = 0;

    subscribers: Array<(interval: number) => void> = [];

    private intervalId: number;

    constructor(private settings: Settings) {
        const self = this;
        this.intervalId = window.setInterval(() => {
            if (!self.active) {
                return;
            }
            self.time += this.settings.tickInterval;

            for (let subscriber of self.subscribers) {
                subscriber(self.settings.tickInterval);
            }
        }, 1000 * self.settings.tickInterval);
    }

    public get active(): boolean {
        return this.pauseDepth == 0;
    }

    public pause(): void {
        this.pauseDepth++;
    }

    public unpause(): void {
        this.pauseDepth--;
    }
}