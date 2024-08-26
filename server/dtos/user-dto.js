export default class UserDto {
  email;
  name;
  id;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.id = model._id;
  }
}
