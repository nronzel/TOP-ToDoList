import { toDate, isToday } from "date-fns";
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
    return this.tasks.find((task) => task.getTitle() === taskTitle);
  }

  contains(taskTitle) {
    return this.tasks.some((task) => task.getTitle() === taskTitle);
  }

  addTask(newTask) {
    if (this.tasks.find((task) => task.getTitle() === newTask.title)) return;
    this.tasks.push(newTask);
  }

  removeTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
  }

  getTasksToday() {
    return this.tasks.filter((task) => {
      const date = new Date(task.getDate());
      return isToday(toDate(date));
    });
  }
}
