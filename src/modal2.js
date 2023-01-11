class Modal {
  constructor(title) {
    this.title = title;
    this.container = document.createElement('div')
    this.header = document.createElement("div")
    this.subject = document.createElement("p")
    this.closeBtn = document.createElement("button")
    this.input = document.createElement("input")
    this.submitBtn = document.createElement("input")
  }

  initialize() {
    const body = document.body

    this.container.classList.add("modal")
    this.header.classList.add("modal-header")
    this.subject.classList.add("large")
    this.closeBtn.classList.add("close")
    this.input.classList.add("modal-submit")

    this.subject.textContent = this.title
    this.closeBtn.textContent = "X"
    this.submitBtn.textContent = "Add"

    this.input.type = "text"
    this.input.placeholder = "Enter text here.."

    this.submitBtn.type = "submit"

    this.header.append(this.subject)
    this.header.append(this.closeBtn)
    this.container.append(this.header)
    this.container.append(this.input)
    this.container.append(this.submitBtn)

    this.closeBtn.onclick = this.close
    this.submitBtn.onclick = this.getInput

    body.append(this.container)
  }

  open() {
    const overlay = document.querySelector(".overlay")
    if (this.container.classList.contains("active")) {
      return
    } else {
      this.container.classList.add("active")
      overlay.classList.add("active")
    }
  }

  close() {
    const closeBtn = document.querySelector(".close-btn")
    const overlay = document.querySelector(".overlay")
    if (!this.container.classList.contains("active")) {
      return
    } else {
      this.container.classList.remove("active")
      overlay.classList.remove("active")
      this.input.value = ""
    }
  }

  getInput() {
    return this.input.value
  }
}

export { Modal }