class ProjectList {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project)
  }

  removeProject(title) {
    return (this.projects = this.projects.filter((project) => project.title !== title));
  }

  getProject(title) {
    return this.projects.find((project) => project.title === title);
  }
}

export { ProjectList }