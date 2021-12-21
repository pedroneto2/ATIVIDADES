class ProjectsRepository {
  constructor(database) {
    this.database = database;
  }
  getAllByFilter = async (filter) => {
    const findFilters = {};
    Object.keys(filter).forEach(
      (key) => (findFilters[key] = { $regex: new RegExp(filter[key], 'i') })
    );
    const project = await this.database.find(findFilters);
    return project;
  };
  getById = async (id) => {
    const project = await this.database.findById(id);
    return project;
  };
  create = async (newProjectBody) => {
    const newProject = await this.database.create(newProjectBody);
    return newProject;
  };
  getProjectsFromUser = async (userID, filter, projection) => {
    const findFilters = {};
    Object.keys(filter).forEach(
      (key) => (findFilters[key] = { $regex: new RegExp(filter[key], 'i') })
    );
    const project = await this.database.find({ owner: userID, ...findFilters }, projection);
    return project;
  };
  insertTaskToProject = async (projectID, taskID) => {
    await this.database.findByIdAndUpdate(projectID, { $push: { tasks: taskID } });
  };
  removeTaskFromProject = async (projectID, taskID) => {
    await this.database.findByIdAndUpdate(projectID, { $pull: { tasks: taskID } });
  };
  deleteOne = async (projectID) => {
    const deletedProject = await this.database.findOneAndDelete({ _id: projectID });
    return deletedProject;
  };
  deleteProjectsFromUser = async (userID) => {
    await this.database.deleteMany({ owner: userID });
  };
}

export default ProjectsRepository;
