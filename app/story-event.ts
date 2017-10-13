export class StoryEvent {
    constructor(private _id: string,
                private _imagePath: string,
                private _content: string,
                private _shouldTrigger: (Injector) => boolean) {
    }

    get id(): string {
        return this._id;
    }

    get imagePath(): string {
        return this._imagePath;
    }

    get content(): string {
        return this._content;
    }

    get shouldTrigger(): (Injector) => boolean {
        return this._shouldTrigger;
    }
}