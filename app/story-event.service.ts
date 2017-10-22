import {Injectable, Injector} from "@angular/core";
import {Savable} from "./savable";
import {StoryEvent} from "./story-event";
import {StoryEventRepository} from "./story-event-repository";
import {Tickable} from "./Tickable";

@Injectable()
export class StoryEventService implements Savable<string[]>, Tickable {

    private untriggered: Set<StoryEvent>;

    private currentEvent: StoryEvent;

    constructor(private injector: Injector) {
        this.untriggered = new Set(StoryEventRepository.getAll());
    }

    onTick(): void {
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

    getSaveData(): string[] {
        return [...this.untriggered].map((event: StoryEvent) => event.id);
    }

    applySaveData(untriggeredEventIds: string[]): void {
        let eventIdsSet = new Set(untriggeredEventIds);
        let untriggeredEvents = StoryEventRepository.getAll().filter((e: StoryEvent) => eventIdsSet.has(e.id));
        this.untriggered = new Set(untriggeredEvents);
    }
}