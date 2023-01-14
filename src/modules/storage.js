import Project from "./project";
import Task from "./task";
import List from "./list";

export default class Storage {
  static saveList(data) {
    localStorage.setItem("projList", JSON.stringify(data));
  }

  static getList() {
    // create the list
    const projList = Object.assign(
      new List(),
      JSON.parse(localStorage.getItem("projList"))
    );
    // add projects
    projList.setProjects(
      projList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );
    // add tasks
    projList
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new Task(), task))
        )
      );
    return projList;
  }

  static addProject(project) {
    const projList = Storage.getList();
    projList.addProject(project);
    Storage.saveList(projList);
  }

  static removeProject(title) {
    const projList = Storage.getList();
    projList.removeProject(title);
    Storage.saveList(projList);
  }

  static addTask(projName, task) {
    const projList = Storage.getList();
    projList.getProject(projName).addTask(task);
    Storage.saveList(projList);
  }

  static removeTask(projName, task) {
    const projList = Storage.getList();
    projList.getProject(projName).removeTask(task);
    Storage.saveList(projList);
  }

  static setDueDate(projName, taskTitle, dueDate) {
    const projList = Storage.getList();
    projList.getProject(projName).getTask(taskTitle).setDate(dueDate);
    Storage.saveList(projList);
  }

  static updateToday() {
    const projList = Storage.getList();
    projList.updateToday();
    Storage.saveList(projList);
  }
}
