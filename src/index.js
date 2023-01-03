import { Project } from "../src/project.js";
import { Task } from "../src/task.js";
import { ProjectList } from "../src/projectList.js"

const domCache = {
  newProjectBtn: document.querySelector(".new-project-btn"),
  projectNavList: document.querySelector(".nav-menu-list"),
};

// creates master list of projects; each project has its own list of tasks
const list = new ProjectList()

// dummy projects
const proj1 = new Project("Project1")
const proj2 = new Project("Project2")

// add to master list
list.addProject(proj1)
list.addProject(proj2)

// test removal
list.removeProject("Project2")

// create task
proj1.addTask(new Task('test task'))
proj1.addTask(new Task('hope this works'))

console.log(list.projects)
console.log(proj1.tasks)

// test remove task
// proj1.removeTask('test task')
// console.log(proj1.tasks)

console.log(proj1.getTask('test task'))