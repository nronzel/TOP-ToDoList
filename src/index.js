import { Task } from "../src/task.js";
import { openProjModal, closeModal, getProjModalTitle } from "../src/modal.js";
import { Project, ProjectList } from "./crud.js"

// ProjectList is a an object that contains a list to house all projects
//   plus methods to add/remove/get.

// Project is a class that creates new projects 
//   with their own list that contains tasks for each project
//   as well as methods to add/remove/get tasks

//
// Dom manipulation stuff
//

const domCache = {
  newProjectBtn: document.querySelector(".new-project-btn"),
  projectNavList: document.querySelector(".nav-menu-list"),
  navBtn: document.querySelector(".nav-btn"),
  overlay: document.querySelector(".overlay"),
  projModal: document.querySelector(".new-proj-modal"),
  modalSubmit: document.querySelector(".new-project-submit"),
  modalInput: document.querySelector(".new-project-input"),
  modalCloseBtn: document.querySelector(".close"),
};

const makeCardActive = (li) => {
  let removeBtn = document.createElement("button");
  if (li.classList.contains("active")) {
    return;
  } else {
    li.classList.add("active");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    li.append(removeBtn);
  }
};

const drawProjectCards = () => {
  clearProjectListDisplay();
  ProjectList.list.forEach((project) => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.textContent = project.title;
    btn.classList.add("nav-btn");
    li.append(btn);
    domCache.projectNavList.append(li);
    if (ProjectList.list.length < 2) {
      makeCardActive(li);
    } else {
      let li = domCache.projectNavList.firstChild;
      makeCardActive(li);
    }
    btn.onclick = navActive;
  });
};

const getNewProject = () => {
  let title = getProjModalTitle();
  if (title === undefined || title.length < 1) {
    return;
  } else {
    let project = new Project(title);
    ProjectList.add(project);
    drawProjectCards()
    domCache.modalInput.value = "";
    closeModal();
  }
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

const clearProjectListDisplay = () => {
  domCache.projectNavList.innerHTML = "";
};

const navActive = (e) => {
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.classList.add("remove-btn");
  btn.onclick = removeProject;

  if (e.target.parentElement.classList.contains("active")) {
    return;
  } else {
    clearNavClasses();
    e.target.parentElement.append(btn);
    e.target.parentElement.classList.add("active");
  }
};

const removeProject = (e) => {
  let projTitle = e.target.previousSibling.textContent;
  e.target.parentElement.outerHTML = "";
  ProjectList.remove(projTitle);
};

domCache.newProjectBtn.onclick = openProjModal;
domCache.modalSubmit.onclick = getNewProject;
domCache.overlay.onclick = closeModal;
domCache.modalCloseBtn.onclick = closeModal;




// Tasks
const taskCache = {
  newTaskBtn: document.querySelector(".new-task-btn"),
  taskListContainer: document.querySelector(".todo-container"),
  taskList: document.querySelector('.task-list')
}

const drawTaskCards = (project) => {
  clearTaskDisplay() // TODO define this
  console.log(project)
  project.list.forEach((task) => {
    let taskContainer = document.createElement("div")
    let taskIcon = document.createElement("img")
    let taskSubject = document.createElement("p")
    let removeBtn = document.createElement("img")

    taskContainer.classList.add("task")
    taskIcon.src = "../src/circle-in-circle.svg"
    taskIcon.classList.add("task-icon")
    taskIcon.classList.add("complete-btn")
    taskIcon.alt = "task-not-complete"

    taskSubject.classList.add("task-subject")
    taskSubject.textContent = task.title

    removeBtn.classList.add("task-icon")
    removeBtn.src = "../src/trash.svg"
    removeBtn.alt = "trash-can"


    taskIcon.onclick = completeTask
    removeBtn.onclick = removeTaskCard

    taskContainer.append(taskIcon)
    taskContainer.append(taskSubject)
    taskContainer.append(removeBtn)

    taskCache.taskListContainer.append(taskContainer)
  })
}

const removeTaskCard = (e) => {
  e.target.parentElement.outerHTML = ""
}

const completeTask = (e) => {
  let completeBtn = e.target
  if (completeBtn.parentElement.classList.contains("complete")) {
    completeBtn.src = "../src/circle-in-circle.svg"
    completeBtn.classList.remove("complete")
    completeBtn.parentElement.classList.remove("complete")
    completeBtn.nextSibling.style.color = "var(--white)"
  } else {
    completeBtn.src = "../src/circle-check.svg"
    completeBtn.parentElement.classList.add("complete")
    completeBtn.nextSibling.style.color = "#656565"
  }

}

const clearTaskDisplay = () => {
  console.log('cleared')
}

// taskCache.newTaskBtn.onclick =


// test projects
const proj1 = new Project("Project1");
const proj2 = new Project("Project2");
const proj3 = new Project("Project3");
ProjectList.add(proj1);
ProjectList.add(proj2);
ProjectList.add(proj3);
drawProjectCards(proj1);
drawProjectCards(proj2);
drawProjectCards(proj3);

// create task
proj1.add(new Task("test task"));
proj1.add(new Task("hope this works"));

drawTaskCards(proj1)