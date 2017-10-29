import {Injectable, Injector} from "@angular/core";
import {Savable} from "./savable";
import {StoryEvent} from "./story-event";
import {StoryEventRepository} from "./story-event-repository";
import {Tickable} from "./Tickable";
import {TimeTickService} from "./time-tick.service";

@Injectable()
export class StoryEventService implements Savable<string[]>, Tickable {
    private untriggered: Set<StoryEvent>;
    private currentEvent: StoryEvent = null;

    constructor(private injector: Injector,
                private timeTickService: TimeTickService,) {
        this.untriggered = new Set(StoryEventRepository.getAll());
    }

    public getCurrentEvent(): StoryEvent {
        return this.currentEvent;
    }

    public currentEventAcknowledged() {
        this.currentEvent = null;
        this.timeTickService.unpause();
    }

    onTick(): void {
        if (this.currentEvent) {
            return;
        }
        for (let event of this.untriggered) {
            if (event.shouldTrigger(this.injector)) {
                this.untriggered.delete(event);
                this.currentEvent = event;
                this.timeTickService.pause();
                return;
            }
        }
    };

    getSaveData(): string[] {
        return [...this.untriggered].map((event: StoryEvent) => event.id);
    }

    applySaveData(untriggeredEventIds: string[]): void {
        let eventIdsSet = new Set(untriggeredEventIds);
        let untriggeredEvents = StoryEventRepository.getAll().filter((e: StoryEvent) => eventIdsSet.has(e.id));
        this.untriggered = new Set(untriggeredEvents);
    }
}