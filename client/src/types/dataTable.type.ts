export type TTableData = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "admin" | "viewer" | "author";
};
