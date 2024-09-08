export type TypeCategory =  {
  name: string;
  image: string;
}

export type TCategoryProps = {
  category: TypeCategory;
};


export type TCategory =  {
  _id: string;
  name: string;
  image: string;
  isDeleted: boolean;
  __v: number;
}
