const modalCache = {
  overlay: document.querySelector(".overlay"),
  projModal: document.querySelector(".new-proj-modal"),
  projModalInput: document.querySelector(".new-project-input"),
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
