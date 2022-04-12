class User {
    constructor(id,email,firstName,lastName,gender) {
      this.id=id??""
      this.email=email??""
      this.firstName = firstName??""
      this.lastName=lastName??""
      this.gender = gender??""
      return {
        id:this.id,
        email: this.email,
        firstName: this.firstName,
        lastName:this.lastName,
        gender:this.gender,
      };
    }
}

export default User;