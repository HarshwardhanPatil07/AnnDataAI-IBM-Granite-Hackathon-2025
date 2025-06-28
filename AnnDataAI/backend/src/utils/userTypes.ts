export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: "farmer" | "admin";
}
export interface UpdateUserRequestBody {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}
