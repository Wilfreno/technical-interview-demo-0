export type ToDoType = {
  id: number;
  content: string;
};

const todo_list: string[] = [];

export class Todo {
  id: number;
  content: string;
  static list = todo_list;

  constructor(content: string) {
    this.id = todo_list.length;
    this.content = content;
  }

  save() {
    todo_list.push(this.content);
    return this.content;
  }

  static find(id: number) {
    return todo_list[id];
  }

  static update(id: number, content: string) {
    if (!todo_list[id]) throw new Error("id does not exist on todo list");

    todo_list[id] = content;

    return content;
  }

  static delete(id: number) {
    if (!todo_list[id]) throw new Error("id does not exist on todo list");

    return todo_list.splice(id, 1);
  }
}
