import {Component, OnInit} from "@angular/core";
import {SaveService} from "./save.service";

@Component({
    selector: 'save-hint',
    template: `
        <span [ngClass]="{'in': saveHintVisible}">saved</span>
    `,
})
export class SaveHintComponent implements OnInit {

    public saveHintVisible: boolean = false;

    constructor(private saveService: SaveService) {
    }

    ngOnInit(): void {
        this.saveService.saved.subscribe(() => {
            this.saveHintVisible = true;
            setTimeout(() => {
                this.saveHintVisible = false;
            }, 2000)
        });
    }
}