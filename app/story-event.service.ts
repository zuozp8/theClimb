import {Injectable, Injector} from "@angular/core";
import {StoryEvent} from "./story-event";
import {StoryEventRepository} from "./story-event-repository";
import {TimeTickService} from "./time-tick.service";

@Injectable()
export class StoryEventService {

    private untriggered: Set<StoryEvent>;

    private currentEvent: StoryEvent;
    private onTick = (): void => {
        if (this.currentEvent) {
            console.log(`removing event ${this.currentEvent.id}`);
            this.currentEvent = null;//TODO remove
            return;
        }
        for (let event of this.untriggered) {
            if (event.shouldTrigger(this.injector)) {
                this.untriggered.delete(event);
                this.currentEvent = event;
                return;
            }
        }
    };

    constructor(timeTickService: TimeTickService, private injector: Injector) {
        timeTickService.subscribers.push(this.onTick);
        this.untriggered = new Set(StoryEventRepository.getAll());
    }

    //TODO save
}