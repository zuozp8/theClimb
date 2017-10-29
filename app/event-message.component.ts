import {Component, HostBinding} from "@angular/core";
import {StoryEventService} from "./story-event.service";

@Component({
    selector: 'event-message',
    templateUrl: '/app/event-message.component.html'
})
export class EventMessageComponent {
    constructor(public storyEventService: StoryEventService) {
    }

    @HostBinding('attr.hidden')
    get isEmpty(): string {
        return this.storyEventService.getCurrentEvent() === null ? '' : null;
    };
}