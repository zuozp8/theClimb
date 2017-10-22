export interface Savable<T> {
    getSaveData(): T;

    applySaveData(data: T): void;
}

export function isSavable<T>(service: Object): service is Savable<T> {
    return (<Savable<T>>service).getSaveData !== undefined
        && (<Savable<T>>service).applySaveData !== undefined;
}