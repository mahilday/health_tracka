import { databaseTypes } from "../services/ipLocation";

export const getNextId = (arr: databaseTypes[]): number => {
  const lastObj = arr[arr.length - 1];
  const lastId = lastObj ? lastObj.id : 0;
  return lastId + 1;
};

export const getActiveData = (arr: databaseTypes[]): any => {
  const data = arr.filter((item: any) => {
    return item.isActive === true;
  });

  return data;
};
