const modalCache = {
  overlay: document.querySelector(".overlay"),
  projModal: document.querySelector(".new-proj-modal"),
  modalInput: document.querySelector(".new-project-input"),
};

const openModal = () => {
  modalCache.projModal.classList.add("active");
  modalCache.overlay.classList.add("active");
};

const closeModal = () => {
  modalCache.projModal.classList.remove("active");
  modalCache.overlay.classList.remove("active");
  modalCache.modalInput.value = "";
};

const getModalTitle = () => {
  return modalCache.modalInput.value;
};

export { openModal, closeModal, getModalTitle };
