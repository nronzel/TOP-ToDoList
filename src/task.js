class Task {
  constructor(title, completed = false) {
    (this.title = title), (this.completed = completed);
    // this.dueDate = dueDate
  }

  markComplete() {
    return (this.completed = true);
  }
}

export { Task };
