class Project {
  constructor(title) {
    this.title = title,
    this.tasks = []
  }

  getNumberOfTasks() {
    return this.tasks.length();
  }

  getTask(title) {
    return this.tasks.find((task) => task.title === title);
  }

  addTask(task) {
    return this.tasks.push(task);
  }

  removeTask(title) {
    return (this.tasks = this.tasks.filter((task) => task.title !== title));
  }

  markComplete() {
    // change DOM to visually appear as completed. 
    // Change icon to green check, strikethrough text and make it grey
  }
}

export { Project };