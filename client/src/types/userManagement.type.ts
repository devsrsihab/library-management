export type TUser = {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: "admin" | "viewer" | "author";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}
