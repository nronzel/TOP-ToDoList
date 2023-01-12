export default class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskTitle) {
    return this.tasks.find((task) => task.getTitle() === taskTitle)
  }

  contains(taskTitle) {
    return this.tasks.some((task) => task.getTitle() === taskTitle)
  }

  addTask(newTask) {
    if (this.tasks.find((task) => task.getTitle() === newTask.name)) return
    this.tasks.push(newTask)
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName)
  }

  // getTasksToday() {

  // }

  // getTasksTomorrorw() {

  // }
}