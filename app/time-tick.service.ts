import {Injectable} from "@angular/core";
import {Savable} from "./savable";
import {Settings} from "./settings";
import {Tickable} from "./Tickable";

@Injectable()
export class TimeTickService implements Savable<number> {
    pauseDepth: number = 1; // Game is unpaused after load
                            // TODO saving during pause
    time: number = 0;
    private tickableServices: Array<Tickable> = [];
    private intervalId: number;

    constructor(private settings: Settings) {
        const self = this;
        this.intervalId = window.setInterval(() => {
            if (!self.active) {
                return;
            }
            self.time += this.settings.tickInterval;

            for (let tickable of self.tickableServices) {
                tickable.onTick(self.settings.tickInterval, this.time);
            }
        }, 1000 * self.settings.tickInterval);
    }

    public get active(): boolean {
        return this.pauseDepth == 0;
    }

    getSaveData(): number {
        return this.time;
    }

    applySaveData(data: number): void {
        this.time = data;
    }

    public subscribe(service: Tickable): void {
        this.tickableServices.push(service);
    }

    public pause(): void {
        this.pauseDepth++;
    }

    public unpause(): void {
        this.pauseDepth--;
    }
}