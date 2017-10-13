import {Component, OnDestroy, OnInit} from "@angular/core";
import {MessagesService} from "./messages.service";
import {SaveService} from "./save.service";
import {Settings} from "./settings";
import {TimeTickService} from "./time-tick.service";

@Component({
    templateUrl: '/app/settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
    constructor(public settings: Settings,
                public saveService: SaveService,
                private messageService: MessagesService,
                private timeTickService: TimeTickService) {
    }

    get availableTickIntervals(): number[] {
        return Settings.availableTickIntervals;
    }

    get availableSaveIntervals(): number[] {
        return Settings.availableSaveIntervals;
    }

    ngOnInit(): void {
        this.timeTickService.unpause();
    }

    ngOnDestroy(): void {
        this.timeTickService.pause();
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

        this.messageService.topMessage.next([copied ? 'Copied to clipboard' : 'Copying failed', null]);
    }

    public loadSave(): void {
        let value = prompt('Enter save data');
        value = value.trim();

        this.saveService.replaceSave(value);
        this.messageService.topMessage.next(['Loaded', null]);
    }
}