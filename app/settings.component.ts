import {Component, OnDestroy, OnInit} from "@angular/core";
import {Settings} from "./settings";
import {TimeTickService} from "./time-tick.service";
import {SaveService} from "./save.service";

@Component({
    templateUrl: '/app/settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
    constructor(public settings: Settings,
                public saveService: SaveService,
                private timeTickService: TimeTickService) {
    }

    ngOnInit(): void {
        this.timeTickService.unpause();
    }

    ngOnDestroy(): void {
        this.timeTickService.pause();
    }

    get availableTickIntervals(): number[] {
        return Settings.availableTickIntervals;
    }

    get availableSaveIntervals(): number[] {
        return Settings.availableSaveIntervals;
    }

    public copySave(): void {
        let copied = false;
        let handler = (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', this.saveService.getStateString());
            e.preventDefault();
            copied = true;
        };
        document.addEventListener('copy', handler);
        document.execCommand('copy');
        document.removeEventListener('copy', handler);

        alert(copied ? 'Copied' : 'Failed');
    }

    public loadSave(): void {
        let value = prompt('Enter save data');
        value = value.trim();

        this.saveService.replaceSave(value);
    }
}