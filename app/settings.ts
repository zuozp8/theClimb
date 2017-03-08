import {Injectable} from "@angular/core";

@Injectable()
export class Settings {
    public tickInterval: number = 0.05;
    public autoSaveInterval: number = 50;
}