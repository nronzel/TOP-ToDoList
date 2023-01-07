class Crud {
  constructor() {
    this.list = [];
  }

  add(obj) {
    return this.list.push(obj)
  }

  remove(title) {
    return (this.list = this.list.filter((item) => item.title !== title));
  }

  get(title) {
    return this.list.find((item) => item.title === title);
  }
}

class Project extends Crud {
  constructor(title) {
    super()
    this.title = title;
  }
}

const ProjectList = new Crud();

export { Crud, Project, ProjectList }