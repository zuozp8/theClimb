import {Component} from "@angular/core";
import {ResearchService} from "./research.service";

@Component({
    template: '{{researchService.currentProgress}}',
})
export class ResearchComponent {
    constructor(public researchService: ResearchService) {
    }
}