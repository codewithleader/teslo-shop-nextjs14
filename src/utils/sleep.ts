export const sleep = async (seconds: number = 1): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};
