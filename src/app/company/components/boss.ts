export class Boss {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public company: string,
        public email: string,
        public selected?: boolean
    ) {}
}