import {Component} from "@angular/core";
import {ResearchService} from "./research.service";
import {Research, allResearches} from "./research";

@Component({
    templateUrl: '/app/research.component.html'
})
export class ResearchComponent {
    constructor(public researchService: ResearchService) {
    }

    get availableResearch(): Research[] {
        let result = [];
        allResearches.forEach((value: Research): void => {
            if (value.done) {
                return;
            }
            if (value.id === this.researchService.currentResearchId) {
                return;
            }
            for (let dependencyId of value.dependencies) {
                if (!allResearches.get(dependencyId).done) {
                    return;
                }
            }
            result.push(value);
        });
        return result;
    }

    get finishedResearch(): Research[] {
        let result = [];
        allResearches.forEach((value: Research): void => {
            if (value.done) {
                result.push(value);
            }
        });
        return result;
    }
}