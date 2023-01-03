import { Project } from "../src/project.js";
import { Task } from "../src/task.js";

const projectList = [];

const domCache = {
  newProjectBtn: document.querySelector(".new-project-btn"),
  projects: document.querySelector(".nav-menu-list"),
};

const newProject = () => {
  let title = prompt("Enter Project Title: ");
  projectList.push(new Project(title));
  drawProjectList();
};

const clearProjectListDisplay = () => {
  domCache.projects.innerHTML = "";
};

const drawProjectList = () => {
  clearProjectListDisplay();
  projectList.forEach((project) => {
    const li = document.createElement("li");
    const navBtn = document.createElement("button");
    navBtn.textContent = project.title;
    navBtn.classList.add("nav-btn");
    li.append(navBtn);
    domCache.projects.append(li);
    navBtn.onclick = navActive;
  });
};

const clearNavClasses = () => {
  const allNavBtns = document.querySelectorAll(".nav-btn");
  const allNavRemoveBtns = document.querySelectorAll(".remove-btn");

  allNavBtns.forEach((btn) => {
    btn.parentElement.classList.remove("active");
  });
  allNavRemoveBtns.forEach((btn) => {
    btn.outerHTML = "";
  });
};

const navActive = (e) => {
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.classList.add("remove-btn");
  if (e.target.parentElement.classList.contains("active")) {
    return;
  } else {
    clearNavClasses();
    e.target.parentElement.append(btn);
    e.target.parentElement.classList.add("active");
  }
};

// add dummy projects for testing
const proj1 = new Project("test1");
const proj2 = new Project("test2");
projectList.push(proj1);
projectList.push(proj2);
drawProjectList();

domCache.newProjectBtn.onclick = newProject;
