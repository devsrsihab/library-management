// format category name
export const nameShorter = (name: string):string => {
  if (name.length > 20) {
    return name.slice(0, 20) + "...";
  }
  return name;
};
