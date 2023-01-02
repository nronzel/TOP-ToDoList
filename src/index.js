import { Project } from "../src/project.js";
import { Task } from "../src/task.js"

// creates list of projects
const projectList = [];

// creates project
const newProj = new Project('Finish App');

// adds project to project list
projectList.push(newProj);

// adds task to newProj project
let firstTask = new Task('task1')
newProj.addTask(firstTask)

console.log(newProj);

console.log(newProj.getTask('task1'))