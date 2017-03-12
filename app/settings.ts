import {Injectable} from "@angular/core";

@Injectable()
export class Settings {
    public static availableTickIntervals: number[] = [0.05, 0.2, 1];
    public tickInterval: number = 0.05;

    public static availableSaveIntervals: number[] = [20, 50, 200];
    public autoSaveInterval: number = 50;
}