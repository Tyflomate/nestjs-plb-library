export class Task {
  constructor(
    public id: string,
    public title: string,
    public year: number,
    public createdAt: Date,
    public status?: string,
  ) {}
}
