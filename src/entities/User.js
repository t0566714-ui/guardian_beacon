// Mock User entity
export class User {
  static async me() {
    return {
      id: 1,
      full_name: "John Doe",
      email: "john.doe@example.com"
    };
  }
}