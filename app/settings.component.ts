import {Component, OnDestroy, OnInit} from "@angular/core";
import {Settings} from "./settings";
import {TimeTickService} from "./time-tick.service";

@Component({
    templateUrl: '/app/settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
    constructor(public settings: Settings,
                private timeTickService: TimeTickService) {
    }

    ngOnInit(): void {
        this.timeTickService.active = false;
    }

    ngOnDestroy(): void {
        this.timeTickService.active = true;
    }
}