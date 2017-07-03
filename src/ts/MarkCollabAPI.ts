import Axios from "axios";
import Document from "./models/Document";
import User from "./models/User";

export default class MarkCollabAPI {

  private _documents: Document[] = [];
  public get Documents(): Document[] {
    return this._documents;
  }

  public constructor() {
    this.UpdateDocuments();
  }

  public SaveContent(id: number, content: string, success: any, fail: any) {
    Axios.patch("docs/" + id + "/content", content)
      .then(response => {
        success.open();
      }).catch(error => {
        console.log(error.response);
        fail.open();
    });
  }

  public UpdateDocuments() {
    let docsRaw;
    let docs: Document[] = [];
    Axios.get("docs").then(response => {
      docsRaw = response.data;
      for (let i in docsRaw) {
        let doc: Document = new Document(
          docsRaw[i].id,
          docsRaw[i].title,
          docsRaw[i].content,
          new User("Anon")
        );
        docs.push(doc);
      }
      this._documents = docs;
    });
  }
}