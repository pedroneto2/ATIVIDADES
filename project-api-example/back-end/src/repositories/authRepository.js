class AuthRepository {
  constructor(database) {
    this.database = database;
  }
  getOneById = async (id) => {
    const user = await this.database.findById(id);
    return user;
  };
  getAllByFilter = async (filter) => {
    const user = await this.database.find(filter);
    return user;
  };
  getOneByFilter = async (filter) => {
    const user = await this.database.findOne(filter);
    return user;
  };
  register = async (newUser) => {
    const createdUser = await this.database.create(newUser);
    return createdUser;
  };
  deleteOne = async (id) => {
    const deletedUser = await this.database.findOneAndDelete({ _id: id });
    return deletedUser;
  };
}

export default AuthRepository;
