import {Injector} from "@angular/core";
import {StoryEvent} from "./story-event";
import {VillageService} from "./village.service";

export class StoryEventRepository {
    public static getAll(): StoryEvent[] {
        return [
            new StoryEvent(
                'start',
                '1',
                'Village something something Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                () => true,
            ),
            new StoryEvent(
                'start2',
                '2',
                'No resources sad… <b>make digger</b>',
                () => true,
            ),
            new StoryEvent(
                'start3',
                '2',
                'Now make university',
                (i: Injector) => i.get(VillageService).hasAnyMine,
            ),
            new StoryEvent(
                'start4',
                '2',
                'Start research',
                (i: Injector) => i.get(VillageService).hasAnyUniversity,
            ),
        ];
    }
}