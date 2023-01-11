const modalCache = {
  overlay: document.querySelector(".overlay"),
  projModal: document.getElementById("project"),
  taskModal: document.getElementById("task"),
  taskModalInput: document.querySelector(".modal-input.task-input"),
  projModalInput: document.querySelector(".modal-input.project-input"),
};

const openProjModal = () => {
  modalCache.projModal.classList.add("active");
  modalCache.overlay.classList.add("active");
};

const closeModal = () => {
modalCache.projModal.classList.remove("active");
  modalCache.overlay.classList.remove("active");
  modalCache.projModalInput.value = "";
};

const getProjModalTitle = () => {
  return modalCache.projModalInput.value;
};

export { openProjModal, closeModal, getProjModalTitle };


const open = (modal) => {
  modal.classList.add("active")
  modalCache.overlay.classList.add("active")
}


// open(modal) {
//   modal.classList.add("active")
//   overlay.classList.add("active")
// }

// close(modal) {
//   modal.classList.remove("active")
//   overlay.classList.remove("active")
//   modal.value = ""
// }


// const createModal = (title) => {
//   const modal = {
//     title,
//   }

//   return {
//     ...modal,
//     ...open(),
//     ...close()
//   }
// } 


