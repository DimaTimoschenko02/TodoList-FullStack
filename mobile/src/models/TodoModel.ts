import { ITodo } from "../types/todoTypes";

class TodoModel {
  id: string;
  title: string;
  body: string;
  year: string;
  public: boolean;
  completed: boolean;
  constructor(todo: ITodo) {
    this.id = todo._id;
    this.title = todo.title;
    this.body = todo.body;
    this.year = todo.year;
    this.public = todo.public;
    this.completed = todo.completed;

  }
}

export default TodoModel;
