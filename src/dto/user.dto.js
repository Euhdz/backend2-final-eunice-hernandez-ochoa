class UserDTO {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.role = user.role;
  }
}

export default UserDTO;
