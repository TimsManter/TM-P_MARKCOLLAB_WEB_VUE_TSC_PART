import User from "./User";

export default class Document {
  public id: number;
  public title: string;
  public content: string;
  public author: User;

  public constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }
}