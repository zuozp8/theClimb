export interface Savable<T> {
    getSaveData(): T;

    applySaveData(data: T): void;
}