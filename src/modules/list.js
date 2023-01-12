import Project from './project.js'
import Task from './task.js'

export default class List {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('Tomorrow'));
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
    return this.projects.some((project) => project.getTitle() === title)
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.name === newProject.name)){
      alert("Project already exists")
        return
    }
    this.projects.push(newProject);
    }

  removeProject(title) {
    const toDelete = this.projects.find((project) => project.getName() === title);
    this.projects.splice(this.projects.indexOf(toDelete), 1);
  }

  // updateTodayProject() {

  // }

  // updateTomorrowProject() {

  // }
}