import {Injectable, Injector} from "@angular/core";
import {SaveService} from "./save.service";
import {Savable} from "./saveable";
import {StoryEvent} from "./story-event";
import {StoryEventRepository} from "./story-event-repository";
import {TimeTickService} from "./time-tick.service";

@Injectable()
export class StoryEventService implements Savable<string[]> {

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

    constructor(timeTickService: TimeTickService,
                saveService: SaveService,
                private injector: Injector) {
        timeTickService.subscribers.push(this.onTick);
        this.untriggered = new Set(StoryEventRepository.getAll());
        saveService.subscribe(this);
    }

    getSaveData(): string[] {
        return [...this.untriggered].map((event: StoryEvent) => event.id);
    }

    applySaveData(untriggeredEventIds: string[]): void {
        let eventIdsSet = new Set(untriggeredEventIds);
        let untriggeredEvents = StoryEventRepository.getAll().filter((e: StoryEvent) => eventIdsSet.has(e.id));
        this.untriggered = new Set(untriggeredEvents);
    }
}