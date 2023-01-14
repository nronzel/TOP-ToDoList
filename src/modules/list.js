import Project from "./project.js";
import Task from "./task.js";

export default class List {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Today"));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(title) {
    return this.projects.find((project) => project.getTitle() === title);
  }

  contains(title) {
    return this.projects.some((project) => project.getTitle() === title);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.title === newProject.title)) {
      return;
    }
    this.projects.push(newProject);
  }

  removeProject(title) {
    const toDelete = this.projects.find(
      (project) => project.getTitle() === title
    );
    this.projects.splice(this.projects.indexOf(toDelete), 1);
  }

  updateToday() {
    this.getProject("Today").tasks = [];

    this.projects.forEach((project) => {
      if (project.getTitle() === "Today") {
        return;
      }

      const todaysTasks = project.getTasksToday();
      todaysTasks.forEach((task) => {
        const taskTitle = `${task.getTitle()} (${project.getTitle()})`;
        this.getProject("Today").addTask(new Task(taskTitle, task.getDate()));
      });
    });
  }

}
