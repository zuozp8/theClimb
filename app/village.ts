export class Village {

    freeWorker: number = 0;
    mines: number = 0;
    universities: number = 0;

    get population(): number {
        return this.freeWorker + this.mines + this.universities
    }

    buildMine() {
        this.freeWorker--;
        this.mines++;
    }

    buildUniversity() {
        this.freeWorker--;
        this.universities++;
    }
}