class TasksRepository {
  constructor(database) {
    this.database = database;
  }
  getAllByFilter = async (filter) => {
    const findFilters = {};
    Object.keys(filter).forEach(
      (key) => (findFilters[key] = { $regex: new RegExp(filter[key], 'i') })
    );
    const task = await this.database.find(findFilters);
    return task;
  };
  getById = async (id) => {
    const task = await this.database.findById(id);
    return task;
  };
  create = async (newTaskBody) => {
    const newTask = this.database.create(newTaskBody);
    return newTask;
  };
  getTasksFromProject = async (projectID, filter) => {
    const findFilters = {};
    Object.keys(filter).forEach(
      (key) => (findFilters[key] = { $regex: new RegExp(filter[key], 'i') })
    );
    const tasks = this.database.find({ project: projectID, ...findFilters });
    return tasks;
  };
  deleteProjectTasks = async (projectID) => {
    await this.database.deleteMany({ project: projectID });
  };
  deleteOne = async (taskID) => {
    const deletedTask = await this.database.findOneAndDelete({ _id: taskID });
    return deletedTask;
  };
}

export default TasksRepository;
